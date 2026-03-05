

# Website Audit & Pending Tasks Report

## Current Status: Everything Working

The website is running without errors — no console errors, no failed network requests, all routes load correctly with lazy loading, and the SEO infrastructure is in place.

## Completed Tasks (Recent)
- Route-level code splitting with `React.lazy()` across 40+ pages
- Centralized `SeoHead` component for standardized meta tags
- Enhanced structured data (JSON-LD) across all pages
- Dynamic XML sitemap edge function with blog posts
- Font preloading and `preconnect` in `index.html`
- Security headers in `vercel.json`
- Service page upgrades with extra sections (all 19 services)
- Auto blog generation with round-robin across 20 categories and 120+ subcategories

## Pending / Incomplete Items

### 1. Index page still uses raw Helmet instead of SeoHead
The homepage (`Index.tsx`) has 30+ lines of manual `<Helmet>` meta tags instead of using the new `SeoHead` component. Should be migrated for consistency.

### 2. Blog page uses raw Helmet
`BlogPage.tsx` likely still uses manual Helmet blocks rather than the standardized `SeoHead`.

### 3. No cron job for daily auto-blog
The `generate-blog` edge function exists but there is no scheduled trigger — blogs only generate when manually invoked.

### 4. News sitemap is static
`public/news-sitemap.xml` is a static file. Should be a dynamic edge function like the main sitemap.

### 5. No blog subcategory filtering
Blog page has category filtering but no subcategory-level filtering, despite blogs now being generated per subcategory.

## Suggested New Features

Here are high-impact features to consider:

### A. Set Up Daily Cron for Auto Blog Publishing
Create a scheduled cron trigger (via pg_cron or external scheduler) to automatically invoke the `generate-blog` function daily at a set time, ensuring 5 posts publish without manual intervention.

### B. Add Blog Subcategory Filters
Add subcategory-level filtering on the `/blog` page so visitors can browse by specific topics like "On-Page SEO", "Google Ads", "Landing Pages", etc.

### C. Add Client Testimonials/Reviews from Database
Move testimonials from hardcoded data to a database table, allowing admin to add/edit/delete client reviews from the admin panel.

### D. Add Newsletter Signup & Email Collection
Add a newsletter subscription form (footer + blog sidebar) that stores emails in the database, enabling email marketing campaigns.

### E. Add Portfolio/Case Studies Gallery with Filtering
Create a visual portfolio gallery with category filters, project details modals, and before/after metrics — pulled from the database and manageable via admin panel.

### F. Add Google Analytics & Search Console Integration Dashboard
Build an admin dashboard widget that shows key metrics (traffic, top pages, search queries) by connecting to Google APIs.

