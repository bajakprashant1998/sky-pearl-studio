-- Add topic_hash column for duplicate prevention
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS topic_hash text;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_topic_hash ON public.blog_posts(topic_hash);

-- Create index for category-based queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);

-- Create index for recent posts queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);