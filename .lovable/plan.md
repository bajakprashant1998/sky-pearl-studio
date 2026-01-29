

# Broken Links & Cross-Navigation Fix Plan

## Summary of Issues Found

After thorough investigation of the codebase, I found **5 critical broken link patterns** across the website that need to be fixed:

| # | Location | Issue | Current Link | Should Be |
|---|----------|-------|--------------|-----------|
| 1 | `AcademyBenefitDetailPage.tsx` (Line 212) | "Explore Other Benefits" cards link missing `/benefit/` prefix | `/digital-marketing-academy/${slug}` | `/digital-marketing-academy/benefit/${slug}` |
| 2 | `AcademyModuleDetailPage.tsx` (Lines 371, 386) | Prev/Next module navigation missing `/module/` prefix | `/digital-marketing-academy/${slug}` | `/digital-marketing-academy/module/${slug}` |
| 3 | `CertificatePreview.tsx` (Line 359) | "Start Your Journey" button links to non-existent page | `/contact-us` | `/contact` |
| 4 | `Footer.tsx` (Line 27) | "Digital Marketing Classes" links to non-existent page | `/digital-marketing-classes` | `/digital-marketing-academy` |
| 5 | `AcademyBenefitDetailPage.tsx` (Line 53) | Canonical URL missing `/benefit/` prefix | `dibull.com/digital-marketing-academy/${slug}` | `dibull.com/digital-marketing-academy/benefit/${slug}` |

---

## Route Structure Reference

From `App.tsx`, the correct routes are:
- `/digital-marketing-academy` - Main academy page
- `/digital-marketing-academy/benefit/:benefitSlug` - Benefit detail pages
- `/digital-marketing-academy/module/:moduleSlug` - Module detail pages
- `/digital-marketing-academy/ai-website-designing` - AI Website page
- `/digital-marketing-academy/ai-graphic-designing` - AI Graphic page
- `/digital-marketing-academy/ai-video-editing` - AI Video page
- `/contact` - Contact page (NOT `/contact-us`)

---

## Phase 1: Fix Academy Benefit Detail Page

**File: `src/pages/academy/AcademyBenefitDetailPage.tsx`**

### 1.1 Fix "Explore Other Benefits" Links (Line 212)

**Current Code:**
```tsx
<Link to={`/digital-marketing-academy/${otherBenefit.slug}`}>
```

**Fixed Code:**
```tsx
<Link to={`/digital-marketing-academy/benefit/${otherBenefit.slug}`}>
```

### 1.2 Fix Canonical URL (Line 53)

**Current Code:**
```tsx
<link rel="canonical" href={`https://dibull.com/digital-marketing-academy/${benefit.slug}`} />
```

**Fixed Code:**
```tsx
<link rel="canonical" href={`https://dibull.com/digital-marketing-academy/benefit/${benefit.slug}`} />
```

---

## Phase 2: Fix Academy Module Detail Page

**File: `src/pages/academy/AcademyModuleDetailPage.tsx`**

### 2.1 Fix Previous Module Navigation (Line 371)

**Current Code:**
```tsx
<Link to={`/digital-marketing-academy/${prevModule.slug}`}>
```

**Fixed Code:**
```tsx
<Link to={`/digital-marketing-academy/module/${prevModule.slug}`}>
```

### 2.2 Fix Next Module Navigation (Line 386)

**Current Code:**
```tsx
<Link to={`/digital-marketing-academy/${nextModule.slug}`}>
```

**Fixed Code:**
```tsx
<Link to={`/digital-marketing-academy/module/${nextModule.slug}`}>
```

---

## Phase 3: Fix Certificate Preview Component

**File: `src/components/academy/CertificatePreview.tsx`**

### 3.1 Fix "Start Your Journey" Button (Line 359)

**Current Code:**
```tsx
onClick={() => window.location.href = '/contact-us'}
```

**Fixed Code:**
```tsx
// Replace with proper Link component and correct path
asChild
>
  <Link to="/contact?interest=academy">
```

Note: This also requires importing `Link` from `react-router-dom` at the top of the file if not already imported.

---

## Phase 4: Fix Footer Link

**File: `src/components/Footer.tsx`**

### 4.1 Fix Digital Marketing Classes Link (Line 27)

**Current Code:**
```tsx
{ name: "Digital Marketing Classes", href: "/digital-marketing-classes" },
```

**Fixed Code:**
```tsx
{ name: "Digital Marketing Academy", href: "/digital-marketing-academy" },
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/academy/AcademyBenefitDetailPage.tsx` | Fix "Explore Other Benefits" links and canonical URL |
| `src/pages/academy/AcademyModuleDetailPage.tsx` | Fix prev/next module navigation links |
| `src/components/academy/CertificatePreview.tsx` | Fix "Start Your Journey" button to use `/contact` with Link component |
| `src/components/Footer.tsx` | Fix "Digital Marketing Classes" link to point to Academy page |

---

## Technical Details

### AcademyBenefitDetailPage.tsx Changes

```tsx
// Line 53: Fix canonical URL
<link rel="canonical" href={`https://dibull.com/digital-marketing-academy/benefit/${benefit.slug}`} />

// Line 212: Fix benefit card links
<Link to={`/digital-marketing-academy/benefit/${otherBenefit.slug}`}>
```

### AcademyModuleDetailPage.tsx Changes

```tsx
// Line 371: Fix previous module link
<Link to={`/digital-marketing-academy/module/${prevModule.slug}`}>

// Line 386: Fix next module link  
<Link to={`/digital-marketing-academy/module/${nextModule.slug}`}>
```

### CertificatePreview.tsx Changes

```tsx
// Import Link at top if not present
import { Link } from "react-router-dom";

// Line 357-362: Replace button with Link
<Button
  size="lg"
  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg shadow-primary/25 w-full sm:w-auto"
  asChild
>
  <Link to="/contact?interest=academy">
    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
    Start Your Journey
    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
  </Link>
</Button>
```

### Footer.tsx Changes

```tsx
// Line 27: Update link name and path
{ name: "Digital Marketing Academy", href: "/digital-marketing-academy" },
```

---

## Validation

After implementation, all these routes should work correctly:

1. `/digital-marketing-academy/benefit/in-depth-training` -> "Explore Other Benefits" cards should navigate to other benefit pages
2. `/digital-marketing-academy/module/digital-marketing-fundamentals` -> Prev/Next buttons should navigate between modules
3. Certificate "Start Your Journey" button should go to `/contact?interest=academy`
4. Footer "Digital Marketing Academy" link should go to `/digital-marketing-academy`

---

## Impact

- All cross-navigation on academy pages will work correctly
- Users can seamlessly browse between benefits, modules, and related content
- SEO canonical URLs will be correct for proper indexing
- No more 404 errors from broken internal links
- Better user experience with consistent navigation

