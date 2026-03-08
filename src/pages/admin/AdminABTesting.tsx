import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { FlaskConical, Plus, Play, Pause, Trash2, BarChart3 } from "lucide-react";

const AdminABTesting = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState("");
  const [variantA, setVariantA] = useState('{"headline": "Grow Your Business"}');
  const [variantB, setVariantB] = useState('{"headline": "Scale Your Revenue"}');

  const { data: experiments = [], isLoading } = useQuery({
    queryKey: ["admin-experiments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ab_experiments").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: impressions = [] } = useQuery({
    queryKey: ["admin-impressions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ab_impressions").select("*");
      if (error) throw error;
      return data;
    },
  });

  const createExperiment = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("ab_experiments").insert({
        name, page,
        variant_a: JSON.parse(variantA),
        variant_b: JSON.parse(variantB),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-experiments"] });
      toast.success("Experiment created");
      setShowForm(false);
      setName(""); setPage("");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const toggleStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const newStatus = status === "active" ? "paused" : "active";
      const { error } = await supabase.from("ab_experiments").update({ status: newStatus }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-experiments"] });
      toast.success("Status updated");
    },
  });

  const deleteExperiment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ab_experiments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-experiments"] });
      toast.success("Experiment deleted");
    },
  });

  const getStats = (expId: string) => {
    const expImpressions = impressions.filter((i: any) => i.experiment_id === expId);
    const aImpressions = expImpressions.filter((i: any) => i.variant === "A");
    const bImpressions = expImpressions.filter((i: any) => i.variant === "B");
    return {
      aViews: aImpressions.length,
      aConversions: aImpressions.filter((i: any) => i.converted).length,
      bViews: bImpressions.length,
      bConversions: bImpressions.filter((i: any) => i.converted).length,
    };
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">A/B Testing</h1>
            <p className="text-muted-foreground mt-1">Test different variations and track conversions</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" /> New Experiment
          </Button>
        </div>

        {showForm && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <Input placeholder="Experiment Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Page (e.g. /)" value={page} onChange={(e) => setPage(e.target.value)} />
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Variant A (JSON)</label>
                <Textarea value={variantA} onChange={(e) => setVariantA(e.target.value)} rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Variant B (JSON)</label>
                <Textarea value={variantB} onChange={(e) => setVariantB(e.target.value)} rows={3} />
              </div>
            </div>
            <Button onClick={() => createExperiment.mutate()} disabled={!name || !page}>Create</Button>
          </div>
        )}

        <div className="space-y-4">
          {experiments.map((exp: any) => {
            const stats = getStats(exp.id);
            const aRate = stats.aViews > 0 ? ((stats.aConversions / stats.aViews) * 100).toFixed(1) : "0";
            const bRate = stats.bViews > 0 ? ((stats.bConversions / stats.bViews) * 100).toFixed(1) : "0";
            return (
              <div key={exp.id} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-foreground">{exp.name}</h3>
                    <p className="text-sm text-muted-foreground">Page: {exp.page}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      exp.status === "active" ? "bg-green-100 text-green-700" : exp.status === "paused" ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"
                    }`}>{exp.status}</span>
                    <Button variant="ghost" size="sm" onClick={() => toggleStatus.mutate({ id: exp.id, status: exp.status })}>
                      {exp.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteExperiment.mutate(exp.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/40 rounded-xl p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Variant A</div>
                    <div className="text-2xl font-bold text-foreground">{aRate}%</div>
                    <div className="text-xs text-muted-foreground">{stats.aConversions}/{stats.aViews} conversions</div>
                  </div>
                  <div className="bg-muted/40 rounded-xl p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Variant B</div>
                    <div className="text-2xl font-bold text-foreground">{bRate}%</div>
                    <div className="text-xs text-muted-foreground">{stats.bConversions}/{stats.bViews} conversions</div>
                  </div>
                </div>
              </div>
            );
          })}
          {experiments.length === 0 && !isLoading && (
            <div className="bg-card rounded-2xl border border-border p-12 text-center">
              <FlaskConical className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No experiments yet</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminABTesting;
