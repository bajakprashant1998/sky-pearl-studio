import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Trash2, Search, Pencil } from "lucide-react";

const AdminBlog = () => {
  const [search, setSearch] = useState("");
  const [editPost, setEditPost] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          is_published: !is_published,
          published_at: !is_published ? new Date().toISOString() : null,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success("Post updated");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const schedulePublish = useMutation({
    mutationFn: async ({ id, date }: { id: string; date: string }) => {
      const { error } = await supabase
        .from("blog_posts")
        .update({ published_at: date, is_published: false })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success("Post scheduled");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const updatePost = useMutation({
    mutationFn: async (post: any) => {
      const { id, created_at, updated_at, ...rest } = post;
      const { error } = await supabase
        .from("blog_posts")
        .update({ ...rest, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      setDialogOpen(false);
      toast.success("Post saved successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success("Post deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const filtered = posts?.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const isScheduled = (post: any) => {
    return !post.is_published && post.published_at && new Date(post.published_at) > new Date();
  };

  const getStatus = (post: any) => {
    if (post.is_published) return { label: "Published", color: "bg-green-500/10 text-green-600" };
    if (isScheduled(post)) return { label: `Scheduled: ${new Date(post.published_at).toLocaleDateString()}`, color: "bg-blue-500/10 text-blue-600" };
    return { label: "Draft", color: "bg-amber-500/10 text-amber-600" };
  };

  const openEdit = (post: any) => {
    setEditPost({ ...post, tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags });
    setDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Manage your blog content with scheduled publishing</p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Schedule</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered?.map((post) => {
                  const status = getStatus(post);
                  return (
                    <tr key={post.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground max-w-[200px] truncate">{post.title}</td>
                      <td className="p-4 text-muted-foreground">{post.category}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <input
                          type="datetime-local"
                          className="text-xs border border-border rounded-md px-2 py-1 bg-background text-foreground"
                          onChange={(e) => {
                            if (e.target.value) {
                              schedulePublish.mutate({ id: post.id, date: new Date(e.target.value).toISOString() });
                            }
                          }}
                        />
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(post)} title="Edit post">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => togglePublish.mutate({ id: post.id, is_published: post.is_published })}>
                          {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => { if (confirm("Delete this post?")) deletePost.mutate(post.id); }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {filtered?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">No posts found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Post Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          {editPost && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={editPost.title} onChange={(e) => setEditPost({ ...editPost, title: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Slug</Label>
                  <Input value={editPost.slug} onChange={(e) => setEditPost({ ...editPost, slug: e.target.value })} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input value={editPost.category} onChange={(e) => setEditPost({ ...editPost, category: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea value={editPost.meta_description} onChange={(e) => setEditPost({ ...editPost, meta_description: e.target.value })} rows={2} />
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea value={editPost.excerpt} onChange={(e) => setEditPost({ ...editPost, excerpt: e.target.value })} rows={3} />
              </div>
              <div>
                <Label>Content (HTML)</Label>
                <Textarea value={editPost.content} onChange={(e) => setEditPost({ ...editPost, content: e.target.value })} rows={12} className="font-mono text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Image URL</Label>
                  <Input value={editPost.image_url || ""} onChange={(e) => setEditPost({ ...editPost, image_url: e.target.value })} />
                </div>
                <div>
                  <Label>Author</Label>
                  <Input value={editPost.author} onChange={(e) => setEditPost({ ...editPost, author: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tags (comma separated)</Label>
                  <Input value={editPost.tags} onChange={(e) => setEditPost({ ...editPost, tags: e.target.value })} />
                </div>
                <div>
                  <Label>Read Time</Label>
                  <Input value={editPost.read_time} onChange={(e) => setEditPost({ ...editPost, read_time: e.target.value })} />
                </div>
              </div>
              <Button
                onClick={() => {
                  const tagsArray = typeof editPost.tags === "string"
                    ? editPost.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
                    : editPost.tags;
                  updatePost.mutate({ ...editPost, tags: tagsArray });
                }}
                className="w-full"
                disabled={updatePost.isPending}
              >
                {updatePost.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminBlog;
