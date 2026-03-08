import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { Mail, Send, Users } from "lucide-react";

const AdminBulkEmail = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const { data: subscribers = [] } = useQuery({
    queryKey: ["admin-subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleSend = async () => {
    if (!subject || !body) {
      toast.error("Please fill in subject and body");
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("bulk-email", {
        body: { subject, body, subscribers: subscribers.map((s: any) => s.email) },
      });
      if (error) throw error;
      toast.success(`Campaign sent to ${subscribers.length} subscribers!`);
      setSubject("");
      setBody("");
    } catch (err: any) {
      toast.error(err.message || "Failed to send campaign");
    }
    setSending(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bulk Email Campaigns</h1>
          <p className="text-muted-foreground mt-1">{subscribers.length} active subscribers</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-bold text-foreground">Compose Campaign</h2>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
              <Input placeholder="Newsletter subject line..." value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Body (HTML supported)</label>
              <Textarea placeholder="Write your email content..." value={body} onChange={(e) => setBody(e.target.value)} rows={12} />
            </div>
            <Button onClick={handleSend} disabled={sending || !subject || !body}>
              <Send className="w-4 h-4 mr-2" />
              {sending ? "Sending..." : `Send to ${subscribers.length} subscribers`}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-foreground">Subscribers</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{subscribers.length}</div>
              <p className="text-xs text-muted-foreground">Active subscribers</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Recent Subscribers</h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {subscribers.slice(0, 10).map((s: any) => (
                  <div key={s.id} className="flex items-center gap-2 text-xs">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span className="text-foreground truncate">{s.email}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBulkEmail;
