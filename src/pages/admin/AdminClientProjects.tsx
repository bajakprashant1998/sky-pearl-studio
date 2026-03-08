import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Briefcase, Plus, Trash2 } from "lucide-react";

const AdminClientProjects = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client_name: "", client_email: "", project_name: "" });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin-client-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("client_projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["admin-client-invoices"],
    queryFn: async () => {
      const { data, error } = await supabase.from("client_invoices").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createProject = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("client_projects").insert(form);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-client-projects"] });
      toast.success("Project created");
      setShowForm(false);
      setForm({ client_name: "", client_email: "", project_name: "" });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const updateProgress = useMutation({
    mutationFn: async ({ id, progress }: { id: string; progress: number }) => {
      const { error } = await supabase.from("client_projects").update({ progress }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-client-projects"] });
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("client_projects").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-client-projects"] });
      toast.success("Status updated");
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Client Projects</h1>
            <p className="text-muted-foreground mt-1">Manage client projects and invoices</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        </div>

        {showForm && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <Input placeholder="Client Name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
            <Input placeholder="Client Email" value={form.client_email} onChange={(e) => setForm({ ...form, client_email: e.target.value })} />
            <Input placeholder="Project Name" value={form.project_name} onChange={(e) => setForm({ ...form, project_name: e.target.value })} />
            <Button onClick={() => createProject.mutate()} disabled={!form.client_name || !form.client_email || !form.project_name}>Create</Button>
          </div>
        )}

        <div className="space-y-4">
          {projects.map((project: any) => {
            const projectInvoices = invoices.filter((i: any) => i.project_id === project.id);
            return (
              <div key={project.id} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-foreground">{project.project_name}</h3>
                    <p className="text-sm text-muted-foreground">{project.client_name} ({project.client_email})</p>
                  </div>
                  <select
                    value={project.status}
                    onChange={(e) => updateStatus.mutate({ id: project.id, status: e.target.value })}
                    className="text-xs border border-border rounded-md px-2 py-1 bg-background text-foreground"
                  >
                    {["in_progress", "review", "completed", "on_hold"].map((s) => (
                      <option key={s} value={s}>{s.replace("_", " ")}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-bold text-foreground">{project.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={project.progress}
                    onChange={(e) => updateProgress.mutate({ id: project.id, progress: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>
                {projectInvoices.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    {projectInvoices.length} invoice(s) • Total: ₹{projectInvoices.reduce((a: number, i: any) => a + Number(i.amount), 0).toLocaleString()}
                  </div>
                )}
              </div>
            );
          })}
          {projects.length === 0 && !isLoading && (
            <div className="bg-card rounded-2xl border border-border p-12 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No projects yet</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminClientProjects;
