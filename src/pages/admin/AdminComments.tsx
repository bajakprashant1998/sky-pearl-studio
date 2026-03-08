import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle2, XCircle, MessageCircle, Trash2 } from "lucide-react";

const AdminComments = () => {
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["admin-comments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_comments")
        .select("*, blog_posts(title, slug)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const toggleApproval = useMutation({
    mutationFn: async ({ id, is_approved }: { id: string; is_approved: boolean }) => {
      const { error } = await supabase.from("blog_comments").update({ is_approved: !is_approved }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
      toast.success("Comment updated");
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_comments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
      toast.success("Comment deleted");
    },
  });

  const pending = comments.filter((c: any) => !c.is_approved).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Comments</h1>
          <p className="text-muted-foreground mt-1">{pending} pending moderation</p>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading...</div>
          ) : comments.length === 0 ? (
            <div className="p-12 text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No comments yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {comments.map((c: any) => (
                <div key={c.id} className="p-5 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">{c.name}</span>
                        <span className="text-xs text-muted-foreground">{c.email}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.is_approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                          {c.is_approved ? "Approved" : "Pending"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{c.content}</p>
                      <div className="text-xs text-muted-foreground">
                        On: <span className="text-primary">{(c as any).blog_posts?.title || "Unknown"}</span> • {new Date(c.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => toggleApproval.mutate({ id: c.id, is_approved: c.is_approved })}>
                        {c.is_approved ? <XCircle className="w-4 h-4 text-amber-500" /> : <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteComment.mutate(c.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminComments;
