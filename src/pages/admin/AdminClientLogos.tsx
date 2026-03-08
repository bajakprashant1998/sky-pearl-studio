import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backendClient";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Image } from "lucide-react";

interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  is_active: boolean;
  sort_order: number;
}

const AdminClientLogos = () => {
  const queryClient = useQueryClient();
  const [editItem, setEditItem] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: logos = [], isLoading } = useQuery({
    queryKey: ["admin-client-logos"],
    queryFn: async () => {
      const { data, error } = await backend.from("client_logos").select("*").order("sort_order");
      if (error) throw error;
      return data as ClientLogo[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: any) => {
      const { id, ...rest } = item;
      if (id) {
        const { error } = await backend.from("client_logos").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await backend.from("client_logos").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-client-logos"] });
      setDialogOpen(false);
      toast.success("Logo saved!");
    },
    onError: () => toast.error("Failed to save"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await backend.from("client_logos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-client-logos"] });
      toast.success("Logo deleted");
    },
  });

  const openNew = () => { setEditItem({ name: "", logo_url: "", website_url: "", is_active: true, sort_order: 0 }); setDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Image className="w-6 h-6" />Client Logos</h1>
          <p className="text-muted-foreground">{logos.length} logos in marquee</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Add Logo</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {logos.map(logo => (
            <Card key={logo.id} className={`text-center ${!logo.is_active ? "opacity-40" : ""}`}>
              <CardContent className="p-4 space-y-3">
                <div className="w-20 h-20 mx-auto bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  {logo.logo_url ? <img src={logo.logo_url} alt={logo.name} className="w-full h-full object-contain p-2" /> : <Image className="w-8 h-8 text-muted-foreground" />}
                </div>
                <p className="text-sm font-medium text-foreground truncate">{logo.name}</p>
                <div className="flex gap-1 justify-center">
                  <Button size="sm" variant="ghost" onClick={() => { setEditItem({ ...logo }); setDialogOpen(true); }}><Pencil className="w-3 h-3" /></Button>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(logo.id); }}><Trash2 className="w-3 h-3" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editItem?.id ? "Edit" : "Add"} Client Logo</DialogTitle></DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div><Label>Client Name *</Label><Input value={editItem.name} onChange={e => setEditItem({ ...editItem, name: e.target.value })} /></div>
              <div><Label>Logo URL *</Label><Input value={editItem.logo_url} onChange={e => setEditItem({ ...editItem, logo_url: e.target.value })} placeholder="https://..." /></div>
              <div><Label>Website URL</Label><Input value={editItem.website_url || ""} onChange={e => setEditItem({ ...editItem, website_url: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Sort Order</Label><Input type="number" value={editItem.sort_order} onChange={e => setEditItem({ ...editItem, sort_order: parseInt(e.target.value) || 0 })} /></div>
                <div className="flex items-center gap-2 pt-6"><Switch checked={editItem.is_active} onCheckedChange={v => setEditItem({ ...editItem, is_active: v })} /><Label>Active</Label></div>
              </div>
              <Button onClick={() => { if (!editItem.name || !editItem.logo_url) { toast.error("Name and logo URL required"); return; } saveMutation.mutate(editItem); }} className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save Logo"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminClientLogos;
