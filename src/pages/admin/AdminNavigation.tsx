import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backendClient";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Navigation, ArrowUpDown } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  url: string;
  parent_id: string | null;
  position: string;
  is_active: boolean;
  sort_order: number;
  icon: string | null;
  open_in_new_tab: boolean;
}

const AdminNavigation = () => {
  const queryClient = useQueryClient();
  const [editItem, setEditItem] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterPos, setFilterPos] = useState("header");

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-navigation"],
    queryFn: async () => {
      const { data, error } = await backend.from("navigation_items").select("*").order("sort_order");
      if (error) throw error;
      return data as NavItem[];
    },
  });

  const filtered = items.filter(i => i.position === filterPos);
  const parentItems = items.filter(i => !i.parent_id && i.position === filterPos);

  const saveMutation = useMutation({
    mutationFn: async (item: any) => {
      const { id, ...rest } = item;
      if (rest.parent_id === "none") rest.parent_id = null;
      if (id) {
        const { error } = await backend.from("navigation_items").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await backend.from("navigation_items").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-navigation"] });
      setDialogOpen(false);
      toast.success("Navigation item saved!");
    },
    onError: () => toast.error("Failed to save"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await backend.from("navigation_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-navigation"] });
      toast.success("Item deleted");
    },
  });

  const openNew = () => { setEditItem({ label: "", url: "/", parent_id: "none", position: filterPos, is_active: true, sort_order: 0, icon: "", open_in_new_tab: false }); setDialogOpen(true); };

  const renderItem = (item: NavItem, isChild = false) => {
    const children = items.filter(i => i.parent_id === item.id);
    return (
      <div key={item.id} className={isChild ? "ml-8" : ""}>
        <Card className={`mb-2 ${!item.is_active ? "opacity-50" : ""}`}>
          <CardContent className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <div>
                <span className="font-medium text-foreground">{item.label}</span>
                <span className="text-sm text-muted-foreground ml-2">{item.url}</span>
              </div>
              {!item.is_active && <Badge variant="secondary">Hidden</Badge>}
              {item.open_in_new_tab && <Badge variant="outline" className="text-xs">↗ New Tab</Badge>}
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => { setEditItem({ ...item, parent_id: item.parent_id || "none" }); setDialogOpen(true); }}><Pencil className="w-3 h-3" /></Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { if (confirm("Delete? Children will also be removed.")) deleteMutation.mutate(item.id); }}><Trash2 className="w-3 h-3" /></Button>
            </div>
          </CardContent>
        </Card>
        {children.map(child => renderItem(child, true))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Navigation className="w-6 h-6" />Navigation Editor</h1>
          <p className="text-muted-foreground">Manage header & footer menu links</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Add Link</Button>
      </div>

      <div className="flex gap-2 mb-6">
        {["header", "footer", "sidebar"].map(pos => (
          <Badge key={pos} variant={filterPos === pos ? "default" : "outline"} className="cursor-pointer capitalize" onClick={() => setFilterPos(pos)}>
            {pos} ({items.filter(i => i.position === pos).length})
          </Badge>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div>
          {filtered.filter(i => !i.parent_id).map(item => renderItem(item))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No navigation items. Add your first link!</p>}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editItem?.id ? "Edit" : "Add"} Navigation Item</DialogTitle></DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div><Label>Label *</Label><Input value={editItem.label} onChange={e => setEditItem({ ...editItem, label: e.target.value })} /></div>
              <div><Label>URL *</Label><Input value={editItem.url} onChange={e => setEditItem({ ...editItem, url: e.target.value })} placeholder="/about-us" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Position</Label>
                  <Select value={editItem.position} onValueChange={v => setEditItem({ ...editItem, position: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="header">Header</SelectItem>
                      <SelectItem value="footer">Footer</SelectItem>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Parent</Label>
                  <Select value={editItem.parent_id || "none"} onValueChange={v => setEditItem({ ...editItem, parent_id: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (Top Level)</SelectItem>
                      {parentItems.filter(p => p.id !== editItem.id).map(p => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Icon (optional)</Label><Input value={editItem.icon || ""} onChange={e => setEditItem({ ...editItem, icon: e.target.value })} placeholder="lucide icon name" /></div>
              <div><Label>Sort Order</Label><Input type="number" value={editItem.sort_order} onChange={e => setEditItem({ ...editItem, sort_order: parseInt(e.target.value) || 0 })} /></div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><Switch checked={editItem.is_active} onCheckedChange={v => setEditItem({ ...editItem, is_active: v })} /><Label>Active</Label></div>
                <div className="flex items-center gap-2"><Switch checked={editItem.open_in_new_tab} onCheckedChange={v => setEditItem({ ...editItem, open_in_new_tab: v })} /><Label>New Tab</Label></div>
              </div>
              <Button onClick={() => { if (!editItem.label || !editItem.url) { toast.error("Label and URL required"); return; } saveMutation.mutate(editItem); }} className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminNavigation;
