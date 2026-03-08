import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backendClient";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, HelpCircle } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  page_path: string;
  category: string | null;
  is_active: boolean;
  sort_order: number;
}

const pageOptions = [
  { value: "/", label: "Homepage" },
  { value: "/services", label: "Services" },
  { value: "/about-us", label: "About Us" },
  { value: "/contact", label: "Contact" },
  { value: "/digital-marketing-academy", label: "Academy" },
  { value: "/blog", label: "Blog" },
  { value: "global", label: "Global (All Pages)" },
];

const AdminFAQs = () => {
  const queryClient = useQueryClient();
  const [editItem, setEditItem] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterPage, setFilterPage] = useState("all");

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ["admin-faqs"],
    queryFn: async () => {
      const { data, error } = await backend.from("dynamic_faqs").select("*").order("sort_order");
      if (error) throw error;
      return data as FAQ[];
    },
  });

  const filtered = filterPage === "all" ? faqs : faqs.filter(f => f.page_path === filterPage);

  const saveMutation = useMutation({
    mutationFn: async (item: any) => {
      const { id, ...rest } = item;
      if (id) {
        const { error } = await backend.from("dynamic_faqs").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await backend.from("dynamic_faqs").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      setDialogOpen(false);
      toast.success("FAQ saved!");
    },
    onError: () => toast.error("Failed to save"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await backend.from("dynamic_faqs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      toast.success("FAQ deleted");
    },
  });

  const openNew = () => { setEditItem({ question: "", answer: "", page_path: "/", category: "General", is_active: true, sort_order: 0 }); setDialogOpen(true); };
  const openEdit = (item: FAQ) => { setEditItem({ ...item }); setDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><HelpCircle className="w-6 h-6" />FAQ Manager</h1>
          <p className="text-muted-foreground">{faqs.length} FAQs across all pages</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Add FAQ</Button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <Badge variant={filterPage === "all" ? "default" : "outline"} className="cursor-pointer" onClick={() => setFilterPage("all")}>All ({faqs.length})</Badge>
        {pageOptions.map(p => {
          const count = faqs.filter(f => f.page_path === p.value).length;
          return (
            <Badge key={p.value} variant={filterPage === p.value ? "default" : "outline"} className="cursor-pointer" onClick={() => setFilterPage(p.value)}>
              {p.label} ({count})
            </Badge>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.map(faq => (
            <Card key={faq.id} className={`${!faq.is_active ? "opacity-50" : ""}`}>
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{faq.answer}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{pageOptions.find(p => p.value === faq.page_path)?.label || faq.page_path}</Badge>
                    {faq.category && <Badge variant="outline">{faq.category}</Badge>}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => openEdit(faq)}><Pencil className="w-3 h-3" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(faq.id); }}><Trash2 className="w-3 h-3" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No FAQs found</p>}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editItem?.id ? "Edit" : "Add"} FAQ</DialogTitle></DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div><Label>Question *</Label><Input value={editItem.question} onChange={e => setEditItem({ ...editItem, question: e.target.value })} /></div>
              <div><Label>Answer *</Label><Textarea value={editItem.answer} onChange={e => setEditItem({ ...editItem, answer: e.target.value })} rows={4} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Page</Label>
                  <Select value={editItem.page_path} onValueChange={v => setEditItem({ ...editItem, page_path: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{pageOptions.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Category</Label><Input value={editItem.category || ""} onChange={e => setEditItem({ ...editItem, category: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Sort Order</Label><Input type="number" value={editItem.sort_order} onChange={e => setEditItem({ ...editItem, sort_order: parseInt(e.target.value) || 0 })} /></div>
                <div className="flex items-center gap-2 pt-6"><Switch checked={editItem.is_active} onCheckedChange={v => setEditItem({ ...editItem, is_active: v })} /><Label>Active</Label></div>
              </div>
              <Button onClick={() => { if (!editItem.question || !editItem.answer) { toast.error("Question and answer required"); return; } saveMutation.mutate(editItem); }} className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save FAQ"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminFAQs;
