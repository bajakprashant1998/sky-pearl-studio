import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backendClient";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Upload, Trash2, Copy, Check, Image, FileText, Film, Search, FolderOpen } from "lucide-react";

interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number | null;
  alt_text: string | null;
  folder: string | null;
  created_at: string;
}

const AdminMediaLibrary = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: media = [], isLoading } = useQuery({
    queryKey: ["admin-media"],
    queryFn: async () => {
      const { data, error } = await backend.from("media_library").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as MediaItem[];
    },
  });

  const filtered = media.filter(m => {
    const matchSearch = !search || m.file_name.toLowerCase().includes(search.toLowerCase()) || m.alt_text?.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || m.file_type === filterType;
    return matchSearch && matchType;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await backend.storage.from("media").upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = backend.storage.from("media").getPublicUrl(fileName);
        
        const fileType = file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "document";
        
        await backend.from("media_library").insert({
          file_name: file.name,
          file_url: publicUrl,
          file_type: fileType,
          file_size: file.size,
          folder: "general",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
      toast.success("Files uploaded!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (item: MediaItem) => {
      // Extract file path from URL for storage deletion
      const urlParts = item.file_url.split("/media/");
      if (urlParts[1]) {
        await backend.storage.from("media").remove([urlParts[1]]);
      }
      const { error } = await backend.from("media_library").delete().eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
      toast.success("File deleted");
    },
  });

  const copyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.file_url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("URL copied!");
  };

  const getIcon = (type: string) => {
    if (type === "image") return Image;
    if (type === "video") return Film;
    return FileText;
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><FolderOpen className="w-6 h-6" />Media Library</h1>
          <p className="text-muted-foreground">{media.length} files</p>
        </div>
        <div>
          <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx" onChange={handleUpload} className="hidden" />
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            <Upload className="w-4 h-4 mr-2" />{uploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..." className="pl-10" />
        </div>
        <div className="flex gap-1">
          {["all", "image", "video", "document"].map(type => (
            <Badge key={type} variant={filterType === type ? "default" : "outline"} className="cursor-pointer capitalize" onClick={() => setFilterType(type)}>
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(item => {
            const Icon = getIcon(item.file_type);
            return (
              <Card key={item.id} className="overflow-hidden group">
                <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                  {item.file_type === "image" ? (
                    <img src={item.file_url} alt={item.alt_text || item.file_name} className="w-full h-full object-cover" />
                  ) : (
                    <Icon className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                <CardContent className="p-3 space-y-2">
                  <p className="text-xs font-medium text-foreground truncate">{item.file_name}</p>
                  <p className="text-xs text-muted-foreground">{formatSize(item.file_size)}</p>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => copyUrl(item)}>
                      {copiedId === item.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-destructive" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(item); }}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {filtered.length === 0 && <p className="col-span-full text-center text-muted-foreground py-12">No media files found</p>}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMediaLibrary;
