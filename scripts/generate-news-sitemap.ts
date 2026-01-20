
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://dibull.com';
const PUBLICATION_NAME = 'Digital Bull Technology';
const PUBLICATION_LANGUAGE = 'en';

interface BlogPost {
  slug: string;
  title: string;
  publishDate: string;
  category: string;
  tags: string[];
}

// This will be populated from the database or static data
// For now, we'll create a function that can be called with blog posts
const generateNewsSitemap = async (blogPosts: BlogPost[]) => {
  // Filter posts from the last 48 hours (Google News requirement)
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  
  const recentPosts = blogPosts.filter(post => {
    const postDate = new Date(post.publishDate);
    return postDate >= twoDaysAgo;
  });

  // If no recent posts, include posts from last 30 days for sitemap discovery
  const postsToInclude = recentPosts.length > 0 ? recentPosts : blogPosts.filter(post => {
    const postDate = new Date(post.publishDate);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return postDate >= thirtyDaysAgo;
  });

  // Generate News Sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${postsToInclude.map(post => {
  const publishDate = new Date(post.publishDate).toISOString();
  return `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${PUBLICATION_NAME}</news:name>
        <news:language>${PUBLICATION_LANGUAGE}</news:language>
      </news:publication>
      <news:publication_date>${publishDate}</news:publication_date>
      <news:title><![CDATA[${post.title}]]></news:title>
      <news:keywords>${post.tags.slice(0, 10).join(', ')}</news:keywords>
    </news:news>
    <lastmod>${publishDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  // Write to public/news-sitemap.xml
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'news-sitemap.xml'), sitemap);
  console.log(`News sitemap generated with ${postsToInclude.length} articles at public/news-sitemap.xml`);
  
  return sitemap;
};

// Example usage with static data (can be replaced with database fetch)
const examplePosts: BlogPost[] = [
  {
    slug: 'google-search-generative-experience-2026',
    title: 'Google Search Generative Experience 2026: How AI is Transforming SEO',
    publishDate: new Date().toISOString(),
    category: 'SEO',
    tags: ['SEO', 'AI', 'Google', 'Search', 'Digital Marketing']
  }
];

// Run if executed directly
if (typeof require !== 'undefined' && require.main === module) {
  generateNewsSitemap(examplePosts);
}

export { generateNewsSitemap };
