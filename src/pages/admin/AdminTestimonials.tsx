import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Star, GripVertical } from "lucide-react";

const COLOR_OPTIONS = [
  { value: "from-blue-500 to-cyan-500", label: "Blue → Cyan" },
  { value: "from-purple-500 to-pink-500", label: "Purple → Pink" },
  { value: "from-orange-500 to-red-500", label: "Orange → Red" },
  { value: "from-green-500 to-emerald-500", label: "Green → Emerald" },
  { value: "from-indigo-500 to-violet-500", label: "Indigo → Violet" },
  { value: "from-rose-500 to-pink-500", label: "Rose → Pink" },
];

interface TestimonialForm {
  name: string;
  role: string;
  content: string;
  rating: number;
  result: string;
  color: string;
  is_active: boolean;
  sort_order: number;
}

const emptyForm: TestimonialForm = {
  name: "",
  role: "",
  content: "",
  rating: 5,
  result: "",
  color: "from-blue-500 to-cyan-500",
  is_active: true,
  sort_order: 0,
};

const AdminTestimonials = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TestimonialForm>(emptyForm);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (formData: TestimonialForm & { id?: string }) => {
      const { id, ...rest } = formData;
      if (id) {
        const { error } = await supabase.from("testimonials").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success(editingId ? "Testimonial updated!" : "Testimonial added!");
      setDialogOpen(false);
      setEditingId(null);
      setForm(emptyForm);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted!");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openEdit = (t: any) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      role: t.role,
      content: t.content,
      rating: t.rating,
      result: t.result,
      color: t.color,
      is_active: t.is_active,
      sort_order: t.sort_order,
    });
    setDialogOpen(true);
  };

  const openNew = () => {
    setEditingId(null);
    setForm({ ...emptyForm, sort_order: (testimonials?.length ?? 0) + 1 });
    setDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
            <p className="text-muted-foreground">Manage client reviews displayed on homepage</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditingId(null); setForm(emptyForm); } }}>
            <DialogTrigger asChild>
              <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Add Testimonial</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit" : "Add"} Testimonial</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate({ ...form, id: editingId ?? undefined }); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Role / Company</Label>
                    <Input value={form.role} onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Review Content</Label>
                  <Textarea value={form.content} onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))} required rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Result Badge (e.g. +450% Traffic)</Label>
                    <Input value={form.result} onChange={(e) => setForm(f => ({ ...f, result: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Rating (1-5)</Label>
                    <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm(f => ({ ...f, rating: parseInt(e.target.value) || 5 }))} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <Select value={form.color} onValueChange={(v) => setForm(f => ({ ...f, color: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {COLOR_OPTIONS.map(c => (
                          <SelectItem key={c.value} value={c.value}>
                            <span className="flex items-center gap-2">
                              <span className={`w-4 h-4 rounded-full bg-gradient-to-r ${c.value}`} />
                              {c.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input type="number" value={form.sort_order} onChange={(e) => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.is_active} onCheckedChange={(v) => setForm(f => ({ ...f, is_active: v }))} />
                  <Label>Active (visible on website)</Label>
                </div>
                <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Saving..." : editingId ? "Update" : "Add"} Testimonial
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials?.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="text-muted-foreground">{t.sort_order}</TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r ${t.color} text-white rounded-full text-xs font-semibold`}>
                        <Star className="w-3 h-3 fill-white" />{t.result}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-0.5">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.is_active ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
                        {t.is_active ? "Active" : "Hidden"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(t)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete this testimonial?")) deleteMutation.mutate(t.id); }}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!testimonials?.length && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No testimonials yet</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;
