
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
    '/digital-marketing-classes'
];

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

const generateSitemap = () => {
    const urls: string[] = [];

    // Add static routes
    staticRoutes.forEach(route => {
        urls.push(`${BASE_URL}${route}`);
    });

    // Add Services and Subservices
    services.forEach(service => {
        // Service Category
        urls.push(`${BASE_URL}/services/${service.slug}`);

        service.subcategories.forEach(sub => {
            // Service Subcategory
            urls.push(`${BASE_URL}/services/${service.slug}/${sub.id}`);

            // Features
            sub.items.forEach(item => {
                const featureSlug = slugify(item.name);
                urls.push(`${BASE_URL}/services/${service.slug}/${sub.id}/feature/${featureSlug}`);
            });

            // Benefits
            // Get detailed data to access benefits
            const subData = getSubcategoryData(
                sub.id,
                sub.title,
                service.title,
                sub.items.map(i => i.name)
            );

            subData.keyBenefits.forEach(benefit => {
                const benefitSlug = slugify(benefit);
                urls.push(`${BASE_URL}/services/${service.slug}/${sub.id}/benefit/${benefitSlug}`);
            });
        });
    });

    // Add Free Tools
    freeToolsData.forEach(tool => {
        urls.push(`${BASE_URL}/free-tools/${tool.slug}`);
    });

    // Add Case Studies
    caseStudiesData.forEach(study => {
        urls.push(`${BASE_URL}/case-studies/${study.slug}`);
    });

    // Add Impact Pages
    businessImpactData.forEach(impact => {
        urls.push(`${BASE_URL}/impact/${impact.slug}`);
    });

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
