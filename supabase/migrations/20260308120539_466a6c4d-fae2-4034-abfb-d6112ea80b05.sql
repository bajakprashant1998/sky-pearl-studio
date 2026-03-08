
-- Academy modules table for dynamic course management
CREATE TABLE public.academy_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  short_title text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Globe',
  color text NOT NULL DEFAULT 'from-blue-500 to-blue-600',
  gradient text NOT NULL DEFAULT 'bg-gradient-to-r from-blue-500 to-blue-600',
  description text NOT NULL,
  overview text NOT NULL,
  duration text NOT NULL DEFAULT '2 Weeks',
  topics jsonb NOT NULL DEFAULT '[]'::jsonb,
  skills text[] NOT NULL DEFAULT '{}'::text[],
  tools text[] NOT NULL DEFAULT '{}'::text[],
  future_scope jsonb NOT NULL DEFAULT '{}'::jsonb,
  project_work text[] NOT NULL DEFAULT '{}'::text[],
  certification text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_modules ENABLE ROW LEVEL SECURITY;

-- Anyone can view active modules
CREATE POLICY "Anyone can view active academy modules"
  ON public.academy_modules FOR SELECT
  USING (is_active = true);

-- Admins can manage all modules
CREATE POLICY "Admins can manage academy modules"
  ON public.academy_modules FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
