

# SEO Upgrade Plan — Achieve Top Google Rankings

## Current State Assessment

The site already has solid SEO foundations: JSON-LD structured data, Open Graph tags, canonical URLs, sitemap, robots.txt, and Helmet-based meta tags on most pages. However, several critical gaps exist that prevent reaching #1 rankings.

## Identified SEO Gaps & Fixes

### 1. Core Web Vitals & Performance
- **Lazy-load all route components** using `React.lazy()` + `Suspense` in `App.tsx` — currently all 40+ pages are eagerly imported, bloating the initial JS bundle
- **Add image lazy loading** with `loading="lazy"` and explicit `width`/`height` attributes across all image tags to prevent CLS (Cumulative Layout Shift)
- **Preload critical fonts** (Inter, Outfit) in `index.html` with `<link rel="preload">`
- **Add `fetchpriority="high"`** to hero/LCP images

### 2. Missing Meta Tags on Key Pages
Several pages lack complete SEO meta tags:
- `Careers`, `OurVerticals`, `CaseStudies`, `FreeToolsPage`, `DigitalMarketingAcademy`, `GrowthStrategyPage` — need `canonical`, `keywords`, `robots`, `og:locale`, `twitter:card` tags
- Add `hreflang="en-IN"` to all pages for regional targeting
- Add `meta name="geo.region"` and `geo.placename` to all pages (currently only on Index)

### 3. Enhanced Structured Data (JSON-LD)
- **Add `BreadcrumbList` schema** to every page (currently only on Index)
- **Add `ItemList` schema** to services listing page (`/services`)
- **Add `Course` schema** to academy pages
- **Add `SoftwareApplication` schema** to free tools pages
- **Add `VideoObject` schema** where video content exists
- **Enhance existing `Service` schema** with `areaServed`, `serviceType`, `offers`, and `aggregateRating`
- **Add `ProfessionalService` schema** alongside existing `LocalBusiness`

### 4. Internal Linking & Navigation SEO
- **Create a reusable `SeoHead` component** that standardizes meta output across all pages — canonical, OG, Twitter, geo, robots, hreflang — reducing inconsistencies
- **Add semantic HTML5 elements**: ensure `<article>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<section>` are used correctly (some pages use generic `<div>`)
- **Add `aria-label` attributes** to navigation landmarks

### 5. Sitemap & Crawl Optimization
- **Add `<lastmod>` with actual dates** (currently uses today's date for all URLs)
- **Add image sitemap entries** for portfolio images
- **Ensure blog posts are included** in main sitemap dynamically (currently only static routes)

### 6. Page-Level SEO Enhancements
- **Add `rel="noopener noreferrer"` to all external links** (security + SEO signal)
- **Add descriptive `alt` text** to all images (portfolio, blog thumbnails)
- **Ensure all `<h1>` tags are unique** per page and contain target keywords
- **Add `title` attributes to internal links** for better anchor context

### 7. Technical SEO
- **Add `dns-prefetch` and `preconnect`** for Google Analytics, Supabase, and font domains in `index.html`
- **Add `Content-Security-Policy` headers** in `vercel.json`
- **Implement proper 404 handling** with SEO-friendly meta tags (`noindex`) on NotFound page

## Implementation Details

### New Component: `SeoHead.tsx`
A reusable component accepting `title`, `description`, `keywords`, `canonical`, `ogImage`, `jsonLd[]`, `breadcrumbs[]`, and `noindex` — replacing manual Helmet blocks across 30+ pages.

### Files to Modify
- `index.html` — preload fonts, preconnect, dns-prefetch
- `src/App.tsx` — lazy-load all route components
- `src/components/SeoHead.tsx` — new reusable SEO component
- `src/components/ServicePageLayout.tsx` — enhanced Service schema, breadcrumbs
- `src/components/SubcategoryPageLayout.tsx` — add breadcrumbs, enhanced meta
- `src/pages/NotFound.tsx` — add `noindex` meta
- `src/pages/Index.tsx` — preconnect, ProfessionalService schema
- `src/pages/company/AboutUs.tsx` — add full SEO meta
- `src/pages/company/Careers.tsx` — add `JobPosting` schema, full meta
- `src/pages/tools/FreeToolsPage.tsx` — add `SoftwareApplication` schema
- `src/pages/blog/BlogDetailPage.tsx` — verify `NewsArticle` schema completeness
- `vercel.json` — security headers, cache headers for static assets
- All 19 service pages — switch to `SeoHead` component
- All academy/company/legal pages — standardize meta tags

### Estimated Scope
~20 files modified, 1 new component created. Primary focus on technical SEO signals that Google's crawler directly evaluates.

