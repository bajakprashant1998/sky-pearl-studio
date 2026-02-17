
import fs from 'fs';
import path from 'path';
import { services } from '../src/data/services';
import { freeToolsData } from '../src/data/freeToolsData';
import { caseStudiesData } from '../src/data/caseStudiesData';
import { businessImpactData } from '../src/data/businessImpactData';
import { getSubcategoryData } from '../src/data/subcategoryData';

const BASE_URL = 'https://dibull.com';

const staticRoutes = [
    '',
    '/about-us',
    '/contact',
    '/careers',
    '/case-studies',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/free-tools',
    '/digital-marketing-academy',
    '/digital-marketing-syllabus',
    '/digital-marketing-academy/ai-website-designing',
    '/digital-marketing-academy/ai-graphic-designing',
    '/digital-marketing-academy/ai-video-editing',
    '/our-verticals',
    '/services',
    '/growth-strategy',
    '/blog',
];

// Academy benefit slugs
const academyBenefitSlugs = [
    'ai-integrated-syllabus',
    'in-depth-training',
    'daily-practical-sessions',
    'expert-trainers',
    'small-batch-sizes',
    'portfolio-development',
    'career-guidance',
    'certification-support',
];

// Academy module slugs
const academyModuleSlugs = [
    'digital-marketing-fundamentals',
    'website-landing-page-fundamentals',
    'search-engine-optimization',
    'content-marketing',
    'social-media-marketing',
    'paid-advertising-performance-marketing',
    'email-whatsapp-marketing',
    'analytics-data-tracking',
    'online-reputation-management',
];

// Growth strategy stage slugs
const growthStageSlugs = [
    'digital-foundation',
    'automation-intelligence',
    'traffic-audience-growth',
    'conversion-revenue-optimisation',
    'scale-authority',
];

// Live vertical slugs
const liveVerticalSlugs = [
    'cadbull',
    'shuttech',
    'castingscreen',
    'civilengi',
    'dibull',
    'gift-city-property',
];

// Upcoming vertical slugs
const upcomingVerticalSlugs = [
    'hireforjob',
    'kundlichart',
    'makeonindia',
    'gametoxic',
    'drugseffect',
    'yourdesignstory',
    'hindifilmcinema',
    'filesbundle',
];

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

interface SitemapUrl {
    loc: string;
    priority: string;
    changefreq: string;
}

const generateSitemap = () => {
    const urls: SitemapUrl[] = [];

    // Add static routes
    staticRoutes.forEach(route => {
        const priority = route === '' ? '1.0' : route === '/services' || route === '/blog' ? '0.9' : '0.8';
        urls.push({ loc: `${BASE_URL}${route}`, priority, changefreq: 'weekly' });
    });

    // Add Services and Subservices
    services.forEach(service => {
        urls.push({ loc: `${BASE_URL}/services/${service.slug}`, priority: '0.9', changefreq: 'weekly' });

        service.subcategories.forEach(sub => {
            urls.push({ loc: `${BASE_URL}/services/${service.slug}/${sub.id}`, priority: '0.8', changefreq: 'weekly' });

            sub.items.forEach(item => {
                const featureSlug = slugify(item.name);
                urls.push({ loc: `${BASE_URL}/services/${service.slug}/${sub.id}/feature/${featureSlug}`, priority: '0.7', changefreq: 'monthly' });
            });

            const subData = getSubcategoryData(sub.id, sub.title, service.title, sub.items.map(i => i.name));
            subData.keyBenefits.forEach(benefit => {
                const benefitSlug = slugify(benefit);
                urls.push({ loc: `${BASE_URL}/services/${service.slug}/${sub.id}/benefit/${benefitSlug}`, priority: '0.7', changefreq: 'monthly' });
            });
        });
    });

    // Add Free Tools
    freeToolsData.forEach(tool => {
        urls.push({ loc: `${BASE_URL}/free-tools/${tool.slug}`, priority: '0.8', changefreq: 'weekly' });
    });

    // Add Case Studies
    caseStudiesData.forEach(study => {
        urls.push({ loc: `${BASE_URL}/case-studies/${study.slug}`, priority: '0.8', changefreq: 'monthly' });
    });

    // Add Impact Pages
    businessImpactData.forEach(impact => {
        urls.push({ loc: `${BASE_URL}/impact/${impact.slug}`, priority: '0.7', changefreq: 'monthly' });
    });

    // Add Growth Strategy Stages
    growthStageSlugs.forEach(slug => {
        urls.push({ loc: `${BASE_URL}/growth-strategy/${slug}`, priority: '0.8', changefreq: 'monthly' });
    });

    // Add Academy Benefits
    academyBenefitSlugs.forEach(slug => {
        urls.push({ loc: `${BASE_URL}/digital-marketing-academy/benefit/${slug}`, priority: '0.7', changefreq: 'monthly' });
    });

    // Add Academy Modules
    academyModuleSlugs.forEach(slug => {
        urls.push({ loc: `${BASE_URL}/digital-marketing-academy/module/${slug}`, priority: '0.7', changefreq: 'monthly' });
    });

    // Add Live Verticals
    liveVerticalSlugs.forEach(slug => {
        urls.push({ loc: `${BASE_URL}/our-verticals/${slug}`, priority: '0.7', changefreq: 'monthly' });
    });

    // Add Upcoming Verticals
    upcomingVerticalSlugs.forEach(slug => {
        urls.push({ loc: `${BASE_URL}/our-verticals/upcoming/${slug}`, priority: '0.6', changefreq: 'monthly' });
    });

    // Generate XML
    const today = new Date().toISOString().split('T')[0];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Write to public/sitemap.xml
    const publicDir = path.resolve(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log(`Sitemap generated with ${urls.length} URLs at public/sitemap.xml`);
};

generateSitemap();
