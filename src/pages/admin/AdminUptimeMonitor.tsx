import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Activity, Plus, Trash2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

const AdminUptimeMonitor = () => {
  const queryClient = useQueryClient();
  const [newUrl, setNewUrl] = useState("");
  const [checking, setChecking] = useState(false);

  const { data: checks = [], isLoading } = useQuery({
    queryKey: ["admin-uptime"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("uptime_checks")
        .select("*")
        .order("checked_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data;
    },
  });

  // Group by URL for display
  const urlGroups = checks.reduce((acc: Record<string, any[]>, check: any) => {
    if (!acc[check.url]) acc[check.url] = [];
    acc[check.url].push(check);
    return acc;
  }, {});

  const runCheck = async (url: string) => {
    setChecking(true);
    try {
      const start = Date.now();
      const response = await fetch(url, { mode: "no-cors" });
      const responseTime = Date.now() - start;
      await supabase.from("uptime_checks").insert({
        url,
        is_up: true,
        status_code: 200,
        response_time: responseTime,
      });
      toast.success(`${url} is up (${responseTime}ms)`);
    } catch {
      await supabase.from("uptime_checks").insert({
        url,
        is_up: false,
        status_code: 0,
        response_time: null,
      });
      toast.error(`${url} appears down`);
    }
    queryClient.invalidateQueries({ queryKey: ["admin-uptime"] });
    setChecking(false);
  };

  const addUrl = async () => {
    if (!newUrl) return;
    await runCheck(newUrl);
    setNewUrl("");
  };

  const deleteUrl = async (url: string) => {
    const urlChecks = checks.filter((c: any) => c.url === url);
    for (const check of urlChecks) {
      await supabase.from("uptime_checks").delete().eq("id", check.id);
    }
    queryClient.invalidateQueries({ queryKey: ["admin-uptime"] });
    toast.success("URL removed");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Uptime Monitor</h1>
          <p className="text-muted-foreground mt-1">Track website uptime and response times</p>
        </div>

        <div className="flex gap-3">
          <Input placeholder="https://example.com" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="max-w-md" />
          <Button onClick={addUrl} disabled={checking || !newUrl}>
            <Plus className="w-4 h-4 mr-2" /> Add & Check
          </Button>
        </div>

        <div className="space-y-4">
          {Object.entries(urlGroups).map(([url, urlChecks]) => {
            const latest = urlChecks[0];
            const upCount = urlChecks.filter((c: any) => c.is_up).length;
            const uptime = urlChecks.length > 0 ? ((upCount / urlChecks.length) * 100).toFixed(1) : "N/A";
            const avgResponse = urlChecks.filter((c: any) => c.response_time).reduce((a: number, c: any) => a + c.response_time, 0) / (urlChecks.filter((c: any) => c.response_time).length || 1);

            return (
              <div key={url} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {latest.is_up ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{url}</h3>
                      <p className="text-xs text-muted-foreground">Last checked: {new Date(latest.checked_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => runCheck(url)} disabled={checking}>
                      <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteUrl(url)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/40 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-foreground">{uptime}%</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div className="bg-muted/40 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-foreground">{Math.round(avgResponse)}ms</div>
                    <div className="text-xs text-muted-foreground">Avg Response</div>
                  </div>
                  <div className="bg-muted/40 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-foreground">{urlChecks.length}</div>
                    <div className="text-xs text-muted-foreground">Total Checks</div>
                  </div>
                </div>
              </div>
            );
          })}
          {Object.keys(urlGroups).length === 0 && !isLoading && (
            <div className="bg-card rounded-2xl border border-border p-12 text-center">
              <Activity className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No URLs being monitored</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUptimeMonitor;
