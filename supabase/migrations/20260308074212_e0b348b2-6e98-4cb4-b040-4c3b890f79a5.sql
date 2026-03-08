
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  result text NOT NULL,
  color text NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active testimonials" ON public.testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed with existing hardcoded data
INSERT INTO public.testimonials (name, role, content, rating, result, color, sort_order) VALUES
  ('Vikram Mehta', 'CEO, HireForJob.com', 'Digital Bull Technology transformed our entire digital presence. Their programmatic SEO approach alone generated more qualified traffic than all our previous marketing efforts combined.', 5, '+450% Traffic', 'from-blue-500 to-cyan-500', 1),
  ('Rahul Patel', 'Founder, Cadbull.com', 'Their technical SEO expertise helped us fix issues we didn''t even know existed, and the international expansion strategy opened up entirely new markets for us.', 5, 'Top 3 Global', 'from-purple-500 to-pink-500', 2),
  ('Ankit Sharma', 'Product Manager, CastingScreen', 'The team at Digital Bull Technology took our app from obscurity to the top charts. Their data-driven approach to ASO and user acquisition helped us compete with apps backed by much larger budgets.', 5, '1M+ Installs', 'from-orange-500 to-red-500', 3);
