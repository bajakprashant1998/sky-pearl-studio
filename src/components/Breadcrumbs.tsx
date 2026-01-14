import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "default" | "light";
}

const Breadcrumbs = ({ items, className = "", variant = "default" }: BreadcrumbsProps) => {
  const location = useLocation();
  
  // Build full breadcrumb list with Home
  const fullItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": fullItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href 
        ? `https://dibull.com${item.href}`
        : `https://dibull.com${location.pathname}`,
    })),
  };

  const isLight = variant === "light";
  const textColor = isLight ? "text-white/70" : "text-muted-foreground";
  const hoverColor = isLight ? "hover:text-white" : "hover:text-primary";
  const activeColor = isLight ? "text-white" : "text-foreground";
  const separatorColor = isLight ? "text-white/40" : "text-muted-foreground/50";

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center gap-2 text-sm flex-wrap ${className}`}
      >
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;
          const isFirst = index === 0;

          return (
            <div key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={`${textColor} ${hoverColor} transition-colors flex items-center gap-1`}
                >
                  {isFirst && <Home className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className={`${isLast ? activeColor : textColor} font-medium flex items-center gap-1`}>
                  {isFirst && <Home className="w-4 h-4" />}
                  <span>{item.label}</span>
                </span>
              )}
              
              {!isLast && (
                <ChevronRight className={`w-4 h-4 ${separatorColor} flex-shrink-0`} />
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
};

export default Breadcrumbs;