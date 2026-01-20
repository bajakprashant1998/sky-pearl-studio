import { useQuery } from "@tanstack/react-query";
import { backend } from "@/lib/backendClient";
import { blogPosts as staticBlogPosts } from "@/data/blogData";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readTime: string;
  author: string;
  publishDate: string;
}

// Map database post to our BlogPost interface
function mapDbPost(dbPost: any): BlogPost {
  // Generate a placeholder image based on category
  const categoryImages: Record<string, string> = {
    "SEO": "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop",
    "AI Marketing": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    "Web Design": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop",
    "Social Media": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
    "Content Marketing": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
    "E-commerce": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    "Email Marketing": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format&fit=crop",
    "PPC Advertising": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    "Analytics": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
  };

  const defaultImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop";

  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    metaDescription: dbPost.meta_description,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
    category: dbPost.category,
    tags: dbPost.tags || [],
    featuredImage: dbPost.image_url || categoryImages[dbPost.category] || defaultImage,
    readTime: dbPost.read_time,
    author: dbPost.author,
    publishDate: dbPost.published_at || dbPost.created_at,
  };
}

export function useBlogPosts(category?: string) {
  return useQuery({
    queryKey: ["blog-posts", category],
    queryFn: async () => {
      let query = backend
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (category && category !== "All") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching blog posts:", error);
        // Return static posts as fallback
        return staticBlogPosts;
      }

      if (!data || data.length === 0) {
        // Return static posts if no database posts
        return staticBlogPosts;
      }

      // Combine database posts with static posts, prioritizing database posts
      const dbPosts = data.map(mapDbPost);
      
      // Filter out static posts that have matching slugs in database
      const dbSlugs = new Set(dbPosts.map(p => p.slug));
      const uniqueStaticPosts = staticBlogPosts.filter(p => !dbSlugs.has(p.slug));
      
      return [...dbPosts, ...uniqueStaticPosts];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      // First check database
      const { data, error } = await backend
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (data) {
        return mapDbPost(data);
      }

      // Fallback to static posts
      const staticPost = staticBlogPosts.find(p => p.slug === slug);
      if (staticPost) {
        return staticPost;
      }

      return null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data, error } = await backend
        .from("blog_posts")
        .select("category")
        .eq("is_published", true);

      if (error || !data) {
        return ["All", "SEO", "AI Marketing", "Web Design", "Social Media", "Content Marketing", "E-commerce"];
      }

      const categories = new Set(data.map(p => p.category));
      return ["All", ...Array.from(categories)];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
