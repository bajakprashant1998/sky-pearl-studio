import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle, Download, Search, Clock, User, Bot, ChevronRight,
  FileText, RefreshCw, Users, TrendingUp, Timer, Star, Trash2,
  Calendar, Filter, ArrowUpDown, Phone, Mail, MapPin, Building2, AlertTriangle,
} from "lucide-react";
import { format, formatDistanceStrict, isToday, isYesterday, isThisWeek, subDays } from "date-fns";

type ChatMsg = {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
};

type LeadInfo = {
  name: string;
  email?: string;
  whatsapp?: string;
  city?: string;
  businessType?: string;
};

type SessionSummary = {
  session_id: string;
  message_count: number;
  first_message: string;
  last_message: string;
  preview: string;
  duration: string;
  leadInfo: LeadInfo | null;
  hasCompleted: boolean;
  language: string | null;
  rating: number | null;
};

// Extract lead info from the "📋 Lead Form Submitted" message
const extractLeadInfo = (messages: ChatMsg[]): LeadInfo | null => {
  const formMsg = messages.find(m => m.content.includes("📋 Lead Form Submitted"));
  if (!formMsg) return null;
  const lines = formMsg.content.split("\n");
  const info: LeadInfo = { name: "" };
  for (const line of lines) {
    const l = line.trim();
    if (l.startsWith("Name:")) info.name = l.replace("Name:", "").trim();
    if (l.startsWith("Email:")) info.email = l.replace("Email:", "").trim();
    if (l.startsWith("WhatsApp:")) info.whatsapp = l.replace("WhatsApp:", "").trim();
    if (l.startsWith("City:")) info.city = l.replace("City:", "").trim();
    if (l.startsWith("Business Type:")) info.businessType = l.replace("Business Type:", "").trim();
  }
  return info.name ? info : null;
};

const extractLanguage = (messages: ChatMsg[]): string | null => {
  const langMsg = messages.find(m => m.role === "user" && /^🇮🇳|^🇬🇧/.test(m.content));
  if (langMsg) {
    const match = langMsg.content.match(/(?:🇬🇧|🇮🇳)\s*(.+)/);
    return match ? match[1].trim() : null;
  }
  return null;
};

const extractRating = (messages: ChatMsg[]): number | null => {
  const ratingMsg = messages.find(m => m.content.includes("⭐ Rated:"));
  if (ratingMsg) {
    const match = ratingMsg.content.match(/(\d)\s*\/\s*5/);
    return match ? parseInt(match[1]) : null;
  }
  return null;
};

const DATE_FILTERS = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "week" },
  { label: "Last 30 Days", value: "30days" },
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Most Messages", value: "messages" },
];

const AdminChatConversations = () => {
  const [allMessages, setAllMessages] = useState<ChatMsg[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true });
    setAllMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  // Grouped sessions with enriched data
  const sessions = useMemo(() => {
    const grouped: Record<string, ChatMsg[]> = {};
    for (const msg of allMessages) {
      if (!grouped[msg.session_id]) grouped[msg.session_id] = [];
      grouped[msg.session_id].push(msg);
    }

    return Object.entries(grouped).map(([sid, msgs]) => {
      const userMsgs = msgs.filter(m => m.role === "user");
      const first = new Date(msgs[0].created_at);
      const last = new Date(msgs[msgs.length - 1].created_at);
      const leadInfo = extractLeadInfo(msgs);
      const language = extractLanguage(msgs);
      const rating = extractRating(msgs);
      const hasCompleted = msgs.some(m => m.content.includes("Thank you") || m.content.includes("🙏"));

      // Get first meaningful user message (skip system-like ones)
      const preview = userMsgs.find(m =>
        !m.content.includes("📋 Lead Form") &&
        !m.content.includes("⭐ Rated") &&
        m.content.length > 2
      )?.content || leadInfo?.name || "New conversation";

      return {
        session_id: sid,
        message_count: msgs.length,
        first_message: msgs[0].created_at,
        last_message: msgs[msgs.length - 1].created_at,
        preview,
        duration: formatDistanceStrict(first, last),
        leadInfo,
        hasCompleted,
        language,
        rating,
      } as SessionSummary;
    });
  }, [allMessages]);

  // Filtered + sorted
  const filteredSessions = useMemo(() => {
    let filtered = sessions.filter(s => {
      const matchesSearch =
        s.session_id.toLowerCase().includes(search.toLowerCase()) ||
        s.preview.toLowerCase().includes(search.toLowerCase()) ||
        (s.leadInfo?.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (s.leadInfo?.email?.toLowerCase() || "").includes(search.toLowerCase());
      if (!matchesSearch) return false;

      const d = new Date(s.last_message);
      if (dateFilter === "today") return isToday(d);
      if (dateFilter === "yesterday") return isYesterday(d);
      if (dateFilter === "week") return isThisWeek(d);
      if (dateFilter === "30days") return d >= subDays(new Date(), 30);
      return true;
    });

    filtered.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.last_message).getTime() - new Date(a.last_message).getTime();
      if (sortBy === "oldest") return new Date(a.last_message).getTime() - new Date(b.last_message).getTime();
      return b.message_count - a.message_count;
    });

    return filtered;
  }, [sessions, search, dateFilter, sortBy]);

  const sessionMessages = useMemo(() => {
    if (!selectedSession) return [];
    return allMessages.filter(m => m.session_id === selectedSession);
  }, [allMessages, selectedSession]);

  const selectedSessionData = useMemo(() => {
    return sessions.find(s => s.session_id === selectedSession);
  }, [sessions, selectedSession]);

  // Stats
  const stats = useMemo(() => {
    const total = sessions.length;
    const totalMsgs = allMessages.length;
    const withLead = sessions.filter(s => s.leadInfo).length;
    const completed = sessions.filter(s => s.hasCompleted).length;
    const avgMsgs = total ? Math.round(totalMsgs / total) : 0;
    const todayCount = sessions.filter(s => isToday(new Date(s.last_message))).length;
    return { total, totalMsgs, withLead, completed, avgMsgs, todayCount };
  }, [sessions, allMessages]);

  const deleteSession = async (sid: string) => {
    setDeleting(true);
    await supabase.from("chat_messages").delete().eq("session_id", sid);
    setDeleteConfirmId(null);
    setDeleting(false);
    if (selectedSession === sid) setSelectedSession(null);
    fetchAll();
  };

  const downloadAsDoc = (sid: string) => {
    const msgs = sessionMessages;
    if (!msgs.length) return;

    let docContent = `<html><head><meta charset="utf-8"><title>Chat - ${sid}</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #333; }
      h1 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px; font-size: 22px; }
      .meta { color: #666; font-size: 13px; margin-bottom: 30px; }
      .msg { margin: 16px 0; padding: 12px 16px; border-radius: 12px; }
      .user { background: #eff6ff; border-left: 4px solid #3b82f6; }
      .assistant { background: #f0fdf4; border-left: 4px solid #22c55e; }
      .role { font-weight: bold; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
      .role.user-role { color: #1d4ed8; }
      .role.bot-role { color: #15803d; }
      .time { color: #999; font-size: 11px; float: right; }
      .content { font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #999; font-size: 12px; text-align: center; }
    </style></head><body>`;

    const lead = selectedSessionData?.leadInfo;
    docContent += `<h1>💬 DiBull Chat Conversation</h1>`;
    docContent += `<div class="meta">`;
    if (lead) {
      docContent += `<strong>Name:</strong> ${lead.name}<br>`;
      if (lead.email) docContent += `<strong>Email:</strong> ${lead.email}<br>`;
      if (lead.whatsapp) docContent += `<strong>WhatsApp:</strong> ${lead.whatsapp}<br>`;
      if (lead.city) docContent += `<strong>City:</strong> ${lead.city}<br>`;
    }
    docContent += `<strong>Date:</strong> ${format(new Date(msgs[0].created_at), "PPpp")}<br>`;
    docContent += `<strong>Total Messages:</strong> ${msgs.length}</div>`;

    for (const msg of msgs) {
      const roleClass = msg.role === "user" ? "user" : "assistant";
      const roleLabel = msg.role === "user" ? "👤 Visitor" : "🤖 DiBull Assistant";
      const roleLabelClass = msg.role === "user" ? "user-role" : "bot-role";
      docContent += `<div class="msg ${roleClass}">
        <span class="role ${roleLabelClass}">${roleLabel}</span>
        <span class="time">${format(new Date(msg.created_at), "hh:mm a")}</span>
        <div class="content">${msg.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
      </div>`;
    }

    docContent += `<div class="footer">Generated by DiBull Technology Admin Panel • ${format(new Date(), "PPpp")}</div></body></html>`;

    const blob = new Blob([docContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DiBull-Chat-${lead?.name?.replace(/\s+/g, "-") || sid.slice(0, 12)}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getDateLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isToday(d)) return "Today";
    if (isYesterday(d)) return "Yesterday";
    return format(d, "MMM d");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 text-foreground">
              <MessageCircle className="w-7 h-7 text-primary" />
              Chat Conversations
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Monitor AI Assistant conversations, track leads & download transcripts
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchAll} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total Sessions", value: stats.total, icon: MessageCircle, color: "text-primary" },
            { label: "Today", value: stats.todayCount, icon: Calendar, color: "text-emerald-500" },
            { label: "Total Messages", value: stats.totalMsgs, icon: TrendingUp, color: "text-blue-500" },
            { label: "Avg per Chat", value: stats.avgMsgs, icon: Timer, color: "text-amber-500" },
            { label: "With Lead Info", value: stats.withLead, icon: Users, color: "text-purple-500" },
            { label: "Completed", value: stats.completed, icon: Star, color: "text-green-500" },
          ].map(stat => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-4 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-1.5 ${stat.color}`} />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or message..."
              className="pl-9 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {DATE_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setDateFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  dateFilter === f.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="text-xs border border-border rounded-lg px-3 py-1.5 bg-card text-foreground"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ minHeight: "70vh" }}>
          {/* Sessions List */}
          <Card className="lg:col-span-1 overflow-hidden">
            <CardHeader className="pb-2 px-4 pt-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Sessions</CardTitle>
                <Badge variant="secondary" className="text-xs">{filteredSessions.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[65vh]">
                {loading ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">Loading conversations...</div>
                ) : filteredSessions.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageCircle className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No conversations found</p>
                  </div>
                ) : (
                  filteredSessions.map(s => (
                    <button
                      key={s.session_id}
                      onClick={() => setSelectedSession(s.session_id)}
                      className={`w-full text-left px-4 py-3.5 border-b border-border hover:bg-muted/50 transition-colors group ${
                        selectedSession === s.session_id ? "bg-primary/5 border-l-3 border-l-primary" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          {s.leadInfo ? (
                            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-primary">
                                {s.leadInfo.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                              <User className="w-3.5 h-3.5 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold truncate text-foreground">
                              {s.leadInfo?.name || "Anonymous"}
                            </p>
                            {s.leadInfo?.city && (
                              <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                <MapPin className="w-2.5 h-2.5" /> {s.leadInfo.city}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="text-[10px] text-muted-foreground">
                            {getDateLabel(s.last_message)}
                          </span>
                          {s.hasCompleted ? (
                            <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-green-500/10 text-green-600 border-0">
                              Completed
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-amber-500/10 text-amber-600 border-0">
                              Partial
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground truncate ml-9">
                        {s.preview.length > 60 ? s.preview.slice(0, 60) + "..." : s.preview}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 ml-9 text-[10px] text-muted-foreground">
                        <span>{s.message_count} msgs</span>
                        <span>•</span>
                        <span>{s.duration}</span>
                        {s.language && <><span>•</span><span>{s.language}</span></>}
                        {s.rating && <><span>•</span><span>{"⭐".repeat(s.rating)}</span></>}
                      </div>
                    </button>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Conversation Detail */}
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {/* Detail Header */}
            <CardHeader className="pb-3 border-b border-border">
              {selectedSession && selectedSessionData ? (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {selectedSessionData.leadInfo ? (
                        <span className="text-sm font-bold text-primary">
                          {selectedSessionData.leadInfo.name.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <User className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-foreground truncate">
                        {selectedSessionData.leadInfo?.name || "Anonymous Visitor"}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(selectedSessionData.first_message), "MMM d, hh:mm a")}
                        </span>
                        <span>{selectedSessionData.message_count} messages</span>
                        <span>{selectedSessionData.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => setDeleteConfirmId(selectedSession)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => downloadAsDoc(selectedSession)}>
                      <Download className="w-4 h-4 mr-1.5" /> Export
                    </Button>
                  </div>
                </div>
              ) : (
                <CardTitle className="text-base text-muted-foreground">Select a conversation</CardTitle>
              )}
            </CardHeader>

            {/* Lead Info Bar */}
            {selectedSessionData?.leadInfo && (
              <div className="px-5 py-3 bg-muted/30 border-b border-border flex flex-wrap gap-4 text-xs">
                {selectedSessionData.leadInfo.email && (
                  <a href={`mailto:${selectedSessionData.leadInfo.email}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-3.5 h-3.5" /> {selectedSessionData.leadInfo.email}
                  </a>
                )}
                {selectedSessionData.leadInfo.whatsapp && (
                  <a href={`https://wa.me/91${selectedSessionData.leadInfo.whatsapp}`} target="_blank" className="flex items-center gap-1.5 text-muted-foreground hover:text-green-500 transition-colors">
                    <Phone className="w-3.5 h-3.5" /> {selectedSessionData.leadInfo.whatsapp}
                  </a>
                )}
                {selectedSessionData.leadInfo.city && (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" /> {selectedSessionData.leadInfo.city}
                  </span>
                )}
                {selectedSessionData.leadInfo.businessType && (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Building2 className="w-3.5 h-3.5" /> {selectedSessionData.leadInfo.businessType}
                  </span>
                )}
              </div>
            )}

            {/* Messages */}
            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-[58vh]">
                {!selectedSession ? (
                  <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
                    <FileText className="w-14 h-14 mb-3 opacity-20" />
                    <p className="text-sm">Select a session to view the conversation</p>
                    <p className="text-xs mt-1 opacity-60">{sessions.length} conversations available</p>
                  </div>
                ) : sessionMessages.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-sm">Loading messages...</div>
                ) : (
                  <div className="p-4 space-y-3">
                    {sessionMessages.map((msg, idx) => {
                      // Skip system-like messages from display
                      if (msg.content.includes("📋 Lead Form Submitted") || msg.content.includes("⭐ Rated:")) {
                        return (
                          <div key={msg.id} className="flex justify-center">
                            <span className="text-[10px] text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                              {msg.content.includes("📋") ? "📋 Lead form submitted" : `${msg.content}`}
                            </span>
                          </div>
                        );
                      }

                      const isUser = msg.role === "user";
                      return (
                        <div key={msg.id} className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                            isUser ? "bg-blue-500/10" : "bg-green-500/10"
                          }`}>
                            {isUser
                              ? <User className="w-3.5 h-3.5 text-blue-600" />
                              : <Bot className="w-3.5 h-3.5 text-green-600" />
                            }
                          </div>
                          <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            isUser
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-muted text-foreground rounded-bl-md"
                          }`}>
                            <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                            <p className={`text-[10px] mt-1 ${isUser ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                              {format(new Date(msg.created_at), "hh:mm a")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setDeleteConfirmId(null)}>
          <div className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Delete Conversation</h3>
                <p className="text-xs text-muted-foreground">This will remove all messages in this session</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
              <Button variant="destructive" size="sm" className="flex-1" disabled={deleting} onClick={() => deleteSession(deleteConfirmId)}>
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminChatConversations;
