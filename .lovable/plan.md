
# Fix Plan for Digital Marketing Academy Page

## Issues Summary

| # | Issue | Root Cause |
|---|-------|------------|
| 1 | Module links not working | Links use `/digital-marketing-academy/${slug}` but route expects `/digital-marketing-academy/module/${slug}` |
| 2 | Wrong price "35,000" | Hero button shows "₹35,000" instead of "₹25,000/Month" |
| 3 | Tab alignment needs improvement | Course details cards need better text alignment and visual enhancement |
| 4 | Color/visibility issues | Card backgrounds need better contrast with page background |
| 5 | Enroll Now button broken | Button navigates to `/contact-us` which doesn't exist (should be `/contact`) |

---

## Phase 1: Fix Module Navigation Links

**File: `src/pages/DigitalMarketingAcademy.tsx`**

### 1.1 Fix Digital Marketing Curriculum Links (line 564)

Change from:
```tsx
<Link to={`/digital-marketing-academy/${module.slug}`}>
```

Change to:
```tsx
<Link to={`/digital-marketing-academy/module/${module.slug}`}>
```

### 1.2 Fix AI Skills Curriculum Links (line 638)

The AI skills modules have dedicated pages with different routes:
- `ai-website-designing` -> `/digital-marketing-academy/ai-website-designing`
- `ai-graphic-designing` -> `/digital-marketing-academy/ai-graphic-designing`
- `ai-video-editing` -> `/digital-marketing-academy/ai-video-editing`

These routes are already correctly defined in App.tsx (lines 98-100), so the current links are correct for AI modules. Only the digital marketing curriculum links need the `/module/` prefix.

---

## Phase 2: Fix Pricing and Button Navigation

**File: `src/pages/DigitalMarketingAcademy.tsx`**

### 2.1 Fix Hero "Enroll Now" Button (lines 391-398)

Change from:
```tsx
<Button 
  size="lg" 
  className="bg-gradient-to-r from-primary to-blue-600 ..."
  onClick={() => window.location.href = '/contact-us'}
>
  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
  Enroll Now - ₹35,000
</Button>
```

Change to:
```tsx
<Button 
  size="lg" 
  className="bg-gradient-to-r from-primary to-blue-600 ..."
  asChild
>
  <Link to="/contact?interest=academy">
    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
    Enroll Now - ₹25,000/Month
  </Link>
</Button>
```

---

## Phase 3: Enhance Course Details Tabs/Cards

**File: `src/pages/DigitalMarketingAcademy.tsx`**

### 3.1 Redesign Course Details Grid (lines 411-429)

Current layout issues:
- Text alignment inconsistent
- Cards lack visual hierarchy
- Label and value spacing needs improvement

Enhanced design:

```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
  {courseDetails.map((detail, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${detail.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
      
      <div className="relative p-4 sm:p-5 flex flex-col items-center text-center">
        {/* Icon with gradient background */}
        <div className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${detail.gradient} mb-3 shadow-lg`}>
          <detail.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        
        {/* Label */}
        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium mb-1">
          {detail.label}
        </p>
        
        {/* Value */}
        <p className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight">
          {detail.value}
        </p>
      </div>
    </motion.div>
  ))}
</div>
```

Key improvements:
- Centered text alignment for consistency
- Larger, more prominent icons with gradient backgrounds
- Clear visual hierarchy (label above value)
- Hover effects with gradient overlay
- Better spacing and padding
- Improved contrast with backdrop blur

---

## Phase 4: Fix Color Contrast Issues

### 4.1 Update Card Styling

The current cards use `bg-white/5` which has poor visibility. Update to `bg-white/10` with `backdrop-blur-md` and stronger border colors.

Changes:
- `bg-white/5` -> `bg-white/10`
- `border-white/10` -> `border-white/20`
- Add `backdrop-blur-md` for depth
- Add hover states for `border-white/40`

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/DigitalMarketingAcademy.tsx` | Fix module links, fix price, enhance course detail cards, improve colors |

---

## Technical Details

### Complete Changes Summary

1. **Line 391-398**: Replace onClick with Link component, fix price to "₹25,000/Month"

2. **Line 411-429**: Completely redesign the course details grid with:
   - Centered layout
   - Improved icon presentation
   - Better typography hierarchy
   - Enhanced hover effects
   - Stronger color contrast

3. **Line 564**: Add `/module/` prefix to digital marketing curriculum links

4. **AI Skills links (line 638)**: These are already correct as they use dedicated page routes

---

## Expected Results

After implementation:
- All 9 Digital Marketing module cards will navigate correctly to their detail pages
- All 3 AI Skills cards will continue to work (already correct)
- "Enroll Now" button will show correct price (₹25,000/Month) and navigate to contact page
- Course details tabs will be visually enhanced with better alignment and colors
- Cards will have proper contrast against the dark hero background
