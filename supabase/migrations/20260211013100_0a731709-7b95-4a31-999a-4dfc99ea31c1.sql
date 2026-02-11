
-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create page_seo_settings table
CREATE TABLE public.page_seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text UNIQUE NOT NULL,
  meta_title text,
  meta_description text,
  meta_keywords text,
  og_title text,
  og_description text,
  og_image text,
  og_type text DEFAULT 'website',
  canonical_url text,
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.page_seo_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read SEO settings (needed for public pages and crawlers)
CREATE POLICY "Anyone can read SEO settings"
  ON public.page_seo_settings FOR SELECT
  USING (true);

-- Only admins can modify SEO settings
CREATE POLICY "Admins can manage SEO settings"
  ON public.page_seo_settings FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create page_content table
CREATE TABLE public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  section_key text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page_path, section_key)
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read page content
CREATE POLICY "Anyone can read page content"
  ON public.page_content FOR SELECT
  USING (true);

-- Only admins can modify page content
CREATE POLICY "Admins can manage page content"
  ON public.page_content FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add updated_at triggers
CREATE TRIGGER update_page_seo_settings_updated_at
  BEFORE UPDATE ON public.page_seo_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
