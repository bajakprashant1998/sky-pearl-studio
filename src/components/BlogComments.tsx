import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageCircle, Send, User } from "lucide-react";

const BlogComments = ({ blogPostId }: { blogPostId: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery({
    queryKey: ["blog-comments", blogPostId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_comments")
        .select("*")
        .eq("blog_post_id", blogPostId)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const submitComment = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("blog_comments").insert({
        blog_post_id: blogPostId,
        name,
        email,
        content,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Comment submitted! It will appear after moderation.");
      setName("");
      setEmail("");
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["blog-comments", blogPostId] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-primary" />
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h4 className="font-semibold text-foreground mb-4">Leave a Comment</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitComment.mutate();
          }}
          className="space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Textarea placeholder="Write your comment..." value={content} onChange={(e) => setContent(e.target.value)} required rows={4} />
          <Button type="submit" disabled={submitComment.isPending}>
            <Send className="w-4 h-4 mr-2" />
            {submitComment.isPending ? "Submitting..." : "Submit Comment"}
          </Button>
        </form>
      </div>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{comment.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      {comments.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No comments yet. Be the first!</p>
      )}
    </div>
  );
};

export default BlogComments;
