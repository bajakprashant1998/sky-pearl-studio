

# Premium Growth Strategy Page

## Overview
Create a new standalone page at `/strategy` (or `/growth-strategy`) that serves as a high-conversion strategic blueprint. It positions the agency as a growth architect by presenting a 5-stage business transformation roadmap — not a service list, but a narrative journey showing how all 20 services work together.

## Page Structure (8 Sections)

### 1. Hero Section
- Bold headline: "Build. Automate. Scale. Your Business Growth Blueprint."
- Subheadline explaining the step-by-step growth system
- Emotional triggers: opportunity, authority, predictable revenue
- Two CTAs: "Start Your Growth Journey" (primary) + "See Our Services" (secondary)
- Animated background orbs + floating metrics cards (e.g., "3x Revenue", "80% Automation")

### 2. Vision & Authority Section
- 3-column layout with icons: Systems Thinking, Automation, Data-Driven Growth
- Positions the agency as a long-term growth partner, not a vendor
- Trust indicators: years of experience, clients served, industries

### 3. Growth Strategy Roadmap (Core Section)
Five visually connected stages with a vertical progress line:

**Stage 1 -- Digital Foundation**
- Services: Website Design, Conversion UI/UX, Branding & Design, Custom Development
- Outcome: Professional, conversion-ready digital presence

**Stage 2 -- Automation & Intelligence**
- Services: Marketing Automation, Email Marketing, Analytics & AI, AI Marketing, SaaS Products
- Outcome: Automated workflows, intelligent decision-making

**Stage 3 -- Traffic & Audience Growth**
- Services: SEO Services, PPC Advertising, Social Media, Content Marketing, Video Marketing, Programmatic Ads
- Outcome: Predictable traffic and qualified leads

**Stage 4 -- Conversion & Revenue Optimization**
- Services: CRO Services, E-commerce Marketing, Amazon Marketing
- Outcome: Higher conversion rates, maximized revenue per visitor

**Stage 5 -- Scale & Authority Expansion**
- Services: Training Programs + all services combined
- Outcome: Market authority, scalable infrastructure, brand dominance

Each stage card includes: stage number, name, objective, persuasive description, service tags, expected outcomes, and an emotional impact line.

### 4. Transformation Section
- Before/After visual comparison (scattered marketing vs. scalable system)
- Animated transition between states
- Key transformation metrics

### 5. Why This Strategy Works
- Philosophy: Build -> Automate -> Attract -> Convert -> Scale
- 5 pillars with icons explaining predictability, systems thinking, measurable ROI
- Visual flow diagram

### 6. Future Vision Section
- Paint a picture of the client's business 12-24 months from now
- 3 vision cards: Market Authority, Stable Revenue, Scalable Infrastructure
- Aspirational tone with data backing

### 7. Strong Conversion Closing (CTA Section)
- Bold headline emphasizing partnership and opportunity
- Urgency without being pushy
- Primary CTA to `/contact`
- Trust badges/guarantees

## Technical Details

### Files to Create
- **`src/pages/GrowthStrategyPage.tsx`** -- Main page component with all 8 sections, Helmet SEO (title, meta, OG, JSON-LD), Navbar, and Footer

### Files to Modify
- **`src/App.tsx`** -- Add route: `/growth-strategy`
- **`src/components/Navbar.tsx`** -- Add "Strategy" or "Growth Blueprint" link in the navigation

### Design Approach
- Reuse existing design tokens (primary blue gradients, card styles, AnimatedSection, motion)
- Premium dark gradient sections alternating with light sections for visual rhythm
- Vertical timeline/roadmap connector for the 5 stages
- Service names rendered as small tags/badges within each stage (linking to their `/services/{slug}` pages)
- Responsive: single column on mobile, side-by-side layouts on desktop
- JSON-LD structured data for the page as a professional service offering

### Dependencies
- No new dependencies needed -- uses existing framer-motion, react-helmet-async, lucide-react, and Tailwind

