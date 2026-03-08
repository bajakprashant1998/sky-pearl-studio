import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Users, Mail, Phone, Building2, Globe, DollarSign, MessageSquare, Clock, CheckCircle2, XCircle, Search, Download, Trash2, AlertTriangle, Flame, Thermometer, Snowflake } from "lucide-react";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string | null;
  website_type: string | null;
  budget: string | null;
  message: string | null;
  status: string;
  source: string;
  score: number;
  temperature: string;
  created_at: string;
};

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Clock },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Phone },
  qualified: { label: "Qualified", color: "bg-purple-100 text-purple-700 border-purple-200", icon: CheckCircle2 },
  converted: { label: "Converted", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
  lost: { label: "Lost", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
};

const tempConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  hot: { label: "🔥 Hot", color: "bg-red-100 text-red-700", icon: Flame },
  warm: { label: "🌡️ Warm", color: "bg-amber-100 text-amber-700", icon: Thermometer },
  cold: { label: "❄️ Cold", color: "bg-blue-100 text-blue-700", icon: Snowflake },
};

// Auto-score a lead based on available data
const calculateScore = (lead: Lead): number => {
  let score = 0;
  if (lead.phone) score += 20;
  if (lead.business_name) score += 15;
  if (lead.budget) {
    const budgetVal = lead.budget.toLowerCase();
    if (budgetVal.includes("50k") || budgetVal.includes("1l") || budgetVal.includes("lakh")) score += 30;
    else if (budgetVal.includes("25k") || budgetVal.includes("30k")) score += 20;
    else score += 10;
  }
  if (lead.message && lead.message.length > 50) score += 15;
  if (lead.website_type) score += 10;
  if (lead.source === "quote-calculator") score += 10;
  return Math.min(100, score);
};

const getTemperature = (score: number): string => {
  if (score >= 60) return "hot";
  if (score >= 30) return "warm";
  return "cold";
};

const AdminLeads = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tempFilter, setTempFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      // Auto-score leads
      return (data as Lead[]).map((lead) => {
        const score = calculateScore(lead);
        const temperature = getTemperature(score);
        return { ...lead, score, temperature };
      });
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      toast({ title: "Status updated successfully" });
    },
  });

  const deleteLead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      toast({ title: "Lead deleted successfully" });
      setSelectedLead(null);
      setDeleteConfirmId(null);
    },
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.business_name?.toLowerCase() || "").includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesTemp = tempFilter === "all" || lead.temperature === tempFilter;
    return matchesSearch && matchesStatus && matchesTemp;
  });

  const stats = {
    total: leads.length,
    hot: leads.filter((l) => l.temperature === "hot").length,
    warm: leads.filter((l) => l.temperature === "warm").length,
    cold: leads.filter((l) => l.temperature === "cold").length,
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Business", "Score", "Temperature", "Status", "Date"];
    const rows = filteredLeads.map((l) => [
      l.name, l.email, l.phone || "", l.business_name || "", l.score.toString(), l.temperature, l.status,
      new Date(l.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leads</h1>
            <p className="text-muted-foreground mt-1">Auto-scored leads with temperature tracking</p>
          </div>
          <Button onClick={exportCSV} variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground mt-1">Total</div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className="text-3xl font-bold text-red-600">{stats.hot}</div>
            <div className="text-sm text-muted-foreground mt-1">🔥 Hot</div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className="text-3xl font-bold text-amber-600">{stats.warm}</div>
            <div className="text-sm text-muted-foreground mt-1">🌡️ Warm</div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.cold}</div>
            <div className="text-sm text-muted-foreground mt-1">❄️ Cold</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "hot", "warm", "cold"].map((t) => (
              <button
                key={t}
                onClick={() => setTempFilter(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all border ${
                  tempFilter === t ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {t === "hot" ? "🔥 Hot" : t === "warm" ? "🌡️ Warm" : t === "cold" ? "❄️ Cold" : "All"}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "new", "contacted", "qualified", "converted", "lost"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all border ${
                  statusFilter === s ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading leads...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Contact</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Score</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Temp</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Date</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredLeads.map((lead) => {
                    const cfg = statusConfig[lead.status] || statusConfig.new;
                    const temp = tempConfig[lead.temperature] || tempConfig.cold;
                    return (
                      <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-foreground text-sm">{lead.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" /> {lead.email}
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${lead.score >= 60 ? "bg-red-500" : lead.score >= 30 ? "bg-amber-500" : "bg-blue-500"}`}
                                style={{ width: `${lead.score}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-foreground">{lead.score}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${temp.color}`}>
                            {temp.label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="text-xs text-muted-foreground">
                            {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2 items-center">
                            <button onClick={() => setSelectedLead(lead)} className="text-xs text-primary hover:underline font-medium">View</button>
                            <select
                              value={lead.status}
                              onChange={(e) => updateStatus.mutate({ id: lead.id, status: e.target.value })}
                              className="text-xs border border-border rounded-md px-2 py-1 bg-background text-foreground"
                            >
                              {Object.entries(statusConfig).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                              ))}
                            </select>
                            <button onClick={() => setDeleteConfirmId(lead.id)} className="text-xs text-destructive p-1">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
            <div className="bg-card rounded-2xl border border-border p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedLead.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedLead.email}</p>
                </div>
                <button onClick={() => setSelectedLead(null)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>
              <div className="flex gap-2 mb-4">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${(tempConfig[selectedLead.temperature] || tempConfig.cold).color}`}>
                  Score: {selectedLead.score} • {(tempConfig[selectedLead.temperature] || tempConfig.cold).label}
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Phone, label: "Phone", value: selectedLead.phone },
                  { icon: Building2, label: "Business", value: selectedLead.business_name },
                  { icon: Globe, label: "Website Type", value: selectedLead.website_type },
                  { icon: DollarSign, label: "Budget", value: selectedLead.budget },
                  { icon: MessageSquare, label: "Message", value: selectedLead.message },
                ].map(({ icon: Icon, label, value }) => value ? (
                  <div key={label} className="flex gap-3 p-3 bg-muted/40 rounded-xl">
                    <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase">{label}</div>
                      <div className="text-sm text-foreground mt-0.5">{value}</div>
                    </div>
                  </div>
                ) : null)}
              </div>
              <div className="mt-4 flex gap-3">
                <a href={`mailto:${selectedLead.email}`} className="flex-1">
                  <Button className="w-full" size="sm"><Mail className="w-4 h-4 mr-2" /> Email</Button>
                </a>
                {selectedLead.phone && (
                  <a href={`tel:${selectedLead.phone}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm"><Phone className="w-4 h-4 mr-2" /> Call</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setDeleteConfirmId(null)}>
            <div className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Delete Lead</h3>
                  <p className="text-xs text-muted-foreground">This cannot be undone</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
                <Button variant="destructive" size="sm" className="flex-1" disabled={deleteLead.isPending} onClick={() => deleteLead.mutate(deleteConfirmId)}>
                  {deleteLead.isPending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminLeads;
