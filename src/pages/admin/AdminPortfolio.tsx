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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ExternalLink, Star, GripVertical } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  client_name: string | null;
  category: string;
  image_url: string | null;
  website_url: string | null;
  technologies: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

const emptyItem: Omit<PortfolioItem, "id"> = {
  title: "", description: "", client_name: "", category: "Web Design",
  image_url: "", website_url: "", technologies: [], is_featured: false, is_active: true, sort_order: 0,
};

const AdminPortfolio = () => {
  const queryClient = useQueryClient();
  const [editItem, setEditItem] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [techInput, setTechInput] = useState("");

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: async () => {
      const { data, error } = await backend.from("portfolio_items").select("*").order("sort_order");
      if (error) throw error;
      return data as PortfolioItem[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: any) => {
      const { id, ...rest } = item;
      if (id) {
        const { error } = await backend.from("portfolio_items").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await backend.from("portfolio_items").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      setDialogOpen(false);
      setEditItem(null);
      toast.success("Portfolio item saved!");
    },
    onError: () => toast.error("Failed to save"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await backend.from("portfolio_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast.success("Item deleted");
    },
  });

  const openNew = () => { setEditItem({ ...emptyItem }); setTechInput(""); setDialogOpen(true); };
  const openEdit = (item: PortfolioItem) => { setEditItem({ ...item }); setTechInput(item.technologies.join(", ")); setDialogOpen(true); };

  const handleSave = () => {
    if (!editItem?.title) { toast.error("Title is required"); return; }
    saveMutation.mutate({ ...editItem, technologies: techInput.split(",").map(t => t.trim()).filter(Boolean) });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio Manager</h1>
          <p className="text-muted-foreground">{items.length} projects</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Add Project</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <Card key={item.id} className={`overflow-hidden ${!item.is_active ? "opacity-50" : ""}`}>
              {item.image_url && (
                <div className="h-40 bg-muted overflow-hidden">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    {item.client_name && <p className="text-sm text-muted-foreground">{item.client_name}</p>}
                  </div>
                  {item.is_featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary">{item.category}</Badge>
                  {item.technologies.slice(0, 3).map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(item)}><Pencil className="w-3 h-3 mr-1" />Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => { if (confirm("Delete this project?")) deleteMutation.mutate(item.id); }}><Trash2 className="w-3 h-3" /></Button>
                  {item.website_url && (
                    <a href={item.website_url} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost"><ExternalLink className="w-3 h-3" /></Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem?.id ? "Edit" : "Add"} Portfolio Item</DialogTitle></DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div><Label>Title *</Label><Input value={editItem.title} onChange={e => setEditItem({ ...editItem, title: e.target.value })} /></div>
              <div><Label>Client Name</Label><Input value={editItem.client_name || ""} onChange={e => setEditItem({ ...editItem, client_name: e.target.value })} /></div>
              <div><Label>Category</Label><Input value={editItem.category} onChange={e => setEditItem({ ...editItem, category: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea value={editItem.description || ""} onChange={e => setEditItem({ ...editItem, description: e.target.value })} rows={3} /></div>
              <div><Label>Image URL</Label><Input value={editItem.image_url || ""} onChange={e => setEditItem({ ...editItem, image_url: e.target.value })} /></div>
              <div><Label>Website URL</Label><Input value={editItem.website_url || ""} onChange={e => setEditItem({ ...editItem, website_url: e.target.value })} /></div>
              <div><Label>Technologies (comma-separated)</Label><Input value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="React, Tailwind, Node.js" /></div>
              <div><Label>Sort Order</Label><Input type="number" value={editItem.sort_order} onChange={e => setEditItem({ ...editItem, sort_order: parseInt(e.target.value) || 0 })} /></div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><Switch checked={editItem.is_featured} onCheckedChange={v => setEditItem({ ...editItem, is_featured: v })} /><Label>Featured</Label></div>
                <div className="flex items-center gap-2"><Switch checked={editItem.is_active} onCheckedChange={v => setEditItem({ ...editItem, is_active: v })} /><Label>Active</Label></div>
              </div>
              <Button onClick={handleSave} className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save Project"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPortfolio;
