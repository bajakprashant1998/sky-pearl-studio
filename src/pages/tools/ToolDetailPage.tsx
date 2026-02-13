import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { getToolBySlug, freeToolsData } from "@/data/freeToolsData";

// Tool Components
import SEOCheckerTool from "@/components/tools/SEOCheckerTool";
import SpeedTestTool from "@/components/tools/SpeedTestTool";
import AIContentGeneratorTool from "@/components/tools/AIContentGeneratorTool";
import AIImageGeneratorTool from "@/components/tools/AIImageGeneratorTool";
import KeywordResearchTool from "@/components/tools/KeywordResearchTool";
import BacklinkCheckerTool from "@/components/tools/BacklinkCheckerTool";
import CompetitorAnalyzerTool from "@/components/tools/CompetitorAnalyzerTool";
import MetaTagGeneratorTool from "@/components/tools/MetaTagGeneratorTool";
import HeadlineAnalyzerTool from "@/components/tools/HeadlineAnalyzerTool";
import SchemaMarkupGeneratorTool from "@/components/tools/SchemaMarkupGeneratorTool";
import HashtagGeneratorTool from "@/components/tools/HashtagGeneratorTool";
import RobotsTxtGeneratorTool from "@/components/tools/RobotsTxtGeneratorTool";
import DomainAuthorityCheckerTool from "@/components/tools/DomainAuthorityCheckerTool";
import SSLCheckerTool from "@/components/tools/SSLCheckerTool";
import ColorPaletteGeneratorTool from "@/components/tools/ColorPaletteGeneratorTool";

const toolComponents: Record<string, React.ComponentType> = {
  "seo-checker": SEOCheckerTool,
  "speed-test": SpeedTestTool,
  "ai-content-generator": AIContentGeneratorTool,
  "ai-image-generator": AIImageGeneratorTool,
  "keyword-research": KeywordResearchTool,
  "backlink-checker": BacklinkCheckerTool,
  "competitor-analyzer": CompetitorAnalyzerTool,
  "meta-tag-generator": MetaTagGeneratorTool,
  "headline-analyzer": HeadlineAnalyzerTool,
  "schema-markup-generator": SchemaMarkupGeneratorTool,
  "hashtag-generator": HashtagGeneratorTool,
  "robots-txt-generator": RobotsTxtGeneratorTool,
  "domain-authority-checker": DomainAuthorityCheckerTool,
  "ssl-checker": SSLCheckerTool,
  "color-palette-generator": ColorPaletteGeneratorTool
};

const ToolDetailPage = () => {
  const { toolSlug } = useParams<{ toolSlug: string }>();
  const tool = getToolBySlug(toolSlug || "");
  
  if (!tool) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
            <Button asChild>
              <Link to="/free-tools">Back to Tools</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const ToolComponent = toolComponents[tool.slug];
  const otherTools = freeToolsData.filter(t => t.id !== tool.id).slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{tool.title} | Free Marketing Tools | Digital Bull</title>
        <meta name="description" content={tool.fullDescription} />
        <meta name="keywords" content={`${tool.title.toLowerCase()}, free ${tool.title.toLowerCase()}, marketing tools`} />
        <link rel="canonical" href={`https://dibull.com/free-tools/${tool.slug}`} />
        <meta property="og:title" content={`${tool.title} | Digital Bull Technology`} />
        <meta property="og:description" content={tool.shortDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://dibull.com/free-tools/${tool.slug}`} />
        <meta property="og:image" content="https://dibull.com/dibull_logo.png" />
        <meta property="og:site_name" content="Digital Bull Technology" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${tool.title} | Digital Bull Technology`} />
        <meta name="twitter:description" content={tool.shortDescription} />
        <meta name="twitter:image" content="https://dibull.com/dibull_logo.png" />
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/free-tools" className="text-muted-foreground hover:text-primary">Free Tools</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{tool.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1"
              >
                <Link 
                  to="/free-tools" 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Tools
                </Link>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-6`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {tool.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {tool.fullDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:w-80"
              >
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {tool.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tool Component */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {ToolComponent && <ToolComponent />}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {tool.howItWorks.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="bg-card border border-border rounded-xl p-6 text-center h-full">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                  {idx < tool.howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Tools */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Explore More Free Tools
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherTools.map((otherTool) => (
                <Link
                  key={otherTool.id}
                  to={`/free-tools/${otherTool.slug}`}
                  className="group"
                >
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${otherTool.gradient} flex items-center justify-center mb-3`}>
                      <otherTool.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {otherTool.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {otherTool.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ToolDetailPage;
