import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SeoHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://dibull.com/og-image.jpg",
  ogType = "website",
  noindex = false,
  breadcrumbs,
  jsonLd,
}: SeoHeadProps) => {
  const breadcrumbJsonLd = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
    : null;

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />

      {/* Geo & Language */}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Ahmedabad" />
      <meta name="language" content="en-IN" />
      <meta name="author" content="Digital Bull Technology" />
      <meta name="revisit-after" content="7 days" />
      <link rel="alternate" hrefLang="en-in" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Digital Bull Technology" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Breadcrumb JSON-LD */}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}

      {/* Additional JSON-LD */}
      {jsonLdArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHead;
