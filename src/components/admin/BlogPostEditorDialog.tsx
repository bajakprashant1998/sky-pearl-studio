import { type ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { toast } from "sonner";
import { Loader2, Trash2, Upload } from "lucide-react";

interface BlogPostEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: any | null;
  isLoadingContent: boolean;
  isSaving: boolean;
  onSave: (post: any) => void;
  isCreateMode?: boolean;
}

const normalizeDraftPost = (post: any) => ({
  ...post,
  content: post?.content || "",
  image_url: post?.image_url || "",
  tags: Array.isArray(post?.tags) ? post.tags.join(", ") : post?.tags || "",
});

const BlogPostEditorDialog = ({
  open,
  onOpenChange,
  post,
  isLoadingContent,
  isSaving,
  onSave,
}: BlogPostEditorDialogProps) => {
  const [draftPost, setDraftPost] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!post) {
      setDraftPost(null);
      return;
    }

    setDraftPost((current: any) => {
      const normalized = normalizeDraftPost(post);

      if (!current || current.id !== normalized.id) {
        return normalized;
      }

      return {
        ...current,
        content: normalized.content || current.content,
      };
    });
  }, [post]);

  const updateDraftField = useCallback((key: string, value: string) => {
    setDraftPost((current: any) => (current ? { ...current, [key]: value } : current));
  }, []);

  const handleContentChange = useCallback((value: string) => {
    setDraftPost((current: any) => (current ? { ...current, content: value } : current));
  }, []);

  const compressImage = async (file: File, maxWidth = 800, quality = 0.7): Promise<Blob> => {
    if (file.type === "image/webp" && file.size <= 400 * 1024) {
      return file;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not supported"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Compression failed"))),
          "image/webp",
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Failed to load image"));
      };

      img.src = objectUrl;
    });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !draftPost) return;

    setUploading(true);
    try {
      const compressed = await compressImage(file);
      const safeSlug = (draftPost.slug || "blog-post").replace(/[^a-z0-9-]/gi, "-").toLowerCase();
      const fileName = `${safeSlug}-${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, compressed, { upsert: true, contentType: "image/webp" });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(fileName);
      updateDraftField("image_url", urlData.publicUrl);
      toast.success("Image uploaded successfully");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (!draftPost) {
      console.error("handleSave: draftPost is null");
      toast.error("No post data to save");
      return;
    }

    const tagsArray = typeof draftPost.tags === "string"
      ? draftPost.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean)
      : draftPost.tags;

    console.log("Saving post with tags:", tagsArray);
    onSave({ ...draftPost, tags: tagsArray });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
        </DialogHeader>

        {draftPost && (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={draftPost.title} onChange={(e) => updateDraftField("title", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Slug</Label>
                <Input value={draftPost.slug} onChange={(e) => updateDraftField("slug", e.target.value)} />
              </div>
              <div>
                <Label>Category</Label>
                <Input value={draftPost.category} onChange={(e) => updateDraftField("category", e.target.value)} />
              </div>
            </div>

            <div>
              <Label>Meta Description</Label>
              <Textarea value={draftPost.meta_description} onChange={(e) => updateDraftField("meta_description", e.target.value)} rows={2} />
            </div>

            <div>
              <Label>Excerpt</Label>
              <Textarea value={draftPost.excerpt} onChange={(e) => updateDraftField("excerpt", e.target.value)} rows={3} />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <Label>Content</Label>
                {isLoadingContent && (
                  <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Loading full article...
                  </span>
                )}
              </div>

              {isLoadingContent && !draftPost.content ? (
                <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-border bg-muted/20 text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing editor...
                </div>
              ) : (
                <RichTextEditor value={draftPost.content} onChange={handleContentChange} />
              )}
            </div>

            <div>
              <Label>Featured Image</Label>
              <div className="mt-2 space-y-3">
                {draftPost.image_url && (
                  <div className="relative rounded-lg overflow-hidden border border-border bg-muted">
                    <img
                      src={draftPost.image_url}
                      alt="Featured"
                      className="w-full h-40 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => updateDraftField("image_url", "")}
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Remove
                    </Button>
                  </div>
                )}

                <div className="flex gap-2 items-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                  <span className="text-xs text-muted-foreground">optimized automatically before upload</span>
                </div>

                <Input
                  placeholder="https://example.com/image.jpg"
                  value={draftPost.image_url || ""}
                  onChange={(e) => updateDraftField("image_url", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Author</Label>
                <Input value={draftPost.author} onChange={(e) => updateDraftField("author", e.target.value)} />
              </div>
              <div>
                <Label>Read Time</Label>
                <Input value={draftPost.read_time} onChange={(e) => updateDraftField("read_time", e.target.value)} />
              </div>
            </div>

            <div>
              <Label>Tags (comma separated)</Label>
              <Input value={draftPost.tags} onChange={(e) => updateDraftField("tags", e.target.value)} />
            </div>

            <Button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSave();
              }} 
              className="w-full" 
              disabled={isSaving || uploading || isLoadingContent}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostEditorDialog;