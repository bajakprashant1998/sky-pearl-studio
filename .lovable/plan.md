
# Create Main Services Page (`/services`)

## Overview
Build a dedicated services listing page at `/services` that showcases all 20 digital marketing services in a visually appealing, SEO-optimized layout.

## What Will Be Built

A full-page services directory featuring:
- Hero section with title, subtitle, and search/filter capability
- Grid layout displaying all 20 service cards with icons, descriptions, subcategory previews, and stats
- Category-based filtering (optional quick filters)
- Strong SEO metadata and structured data (JSON-LD)
- CTA section at the bottom
- Navbar and Footer included

## All 20 Services Included

1. SEO
2. PPC Advertising
3. Web Design
4. Social Media
5. Content Marketing
6. Email Marketing
7. Conversion Optimization
8. E-commerce Marketing
9. Amazon Marketing
10. Video Marketing
11. Programmatic Advertising
12. Analytics & AI Technology
13. Custom Development
14. AI Marketing
15. Training Programs
16. SaaS Products
17. Branding & Design
18. Marketing Automation & CRM
19. Conversion UI/UX
20. Growth Hacking

## Technical Details

### Files to Create
- **`src/pages/services/ServicesPage.tsx`** -- Main page component with:
  - Helmet SEO tags (title, meta, OG, JSON-LD)
  - Hero section with animated heading
  - Full grid of all 20 services using data from `src/data/services.ts`
  - Each card links to its respective `/services/{slug}` route
  - Bottom CTA linking to `/contact`

### Files to Modify
- **`src/App.tsx`** -- Add route: `<Route path="/services" element={<ServicesPage />} />`
- **`src/components/ServicesSection.tsx`** -- Update "View All Services" link to point to `/services` page
- **`src/components/Navbar.tsx`** -- Add "Services" link to `/services` in the navigation (if not already present)

### Design Approach
- Reuse the existing card design pattern from `ServicesSection.tsx` (gradient icons, hover effects, subcategory tags, animated bottom border)
- Display all 20 services in a responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)
- Each card shows: icon, short title, subtitle, subcategory count, stats preview, and "Explore" CTA
- Include `AnimatedSection` wrappers for scroll-reveal effects
