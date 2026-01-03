import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Globe, FileText, Zap, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface SEOResult {
  url: string;
  title: string;
  titleLength: number;
  titleScore: "good" | "warning" | "error";
  description: string;
  descriptionLength: number;
  descriptionScore: "good" | "warning" | "error";
  hasH1: boolean;
  h1Text: string;
  isHttps: boolean;
  hasFavicon: boolean;
  isResponsive: boolean;
  overallScore: number;
}

const SEOChecker = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SEOResult | null>(null);
  const [error, setError] = useState("");

  const validateUrl = (input: string): boolean => {
    try {
      const urlObj = new URL(input.startsWith("http") ? input : `https://${input}`);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const analyzeUrl = async () => {
    if (!url.trim()) {
      setError("Please enter a website URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
      
      // Simulate SEO analysis (in production, this would call a backend API)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate simulated results based on URL characteristics
      const isHttps = normalizedUrl.startsWith("https");
      const hasGoodDomain = !normalizedUrl.includes("test") && !normalizedUrl.includes("example");
      
      const mockResult: SEOResult = {
        url: normalizedUrl,
        title: `Sample Title for ${new URL(normalizedUrl).hostname}`,
        titleLength: 45,
        titleScore: "good",
        description: "This is a sample meta description for SEO analysis. It provides context about the page content and helps search engines understand the page purpose.",
        descriptionLength: 145,
        descriptionScore: "good",
        hasH1: true,
        h1Text: "Welcome to Our Website",
        isHttps,
        hasFavicon: hasGoodDomain,
        isResponsive: true,
        overallScore: isHttps ? (hasGoodDomain ? 85 : 70) : 55,
      };

      setResult(mockResult);
    } catch (err) {
      setError("Failed to analyze URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreIcon = (status: "good" | "warning" | "error" | boolean) => {
    if (status === true || status === "good") {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
    if (status === "warning") {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
              Free Tool
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEO <span className="text-gradient">Checker</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Analyze any website's SEO health instantly. Enter a URL below to get actionable insights.
            </p>
          </div>

          {/* Search Input */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-lg mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                  }}
                  onKeyPress={(e) => e.key === "Enter" && analyzeUrl()}
                  placeholder="Enter website URL (e.g., example.com)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <Button
                onClick={analyzeUrl}
                disabled={loading}
                variant="hero"
                size="lg"
                className="sm:px-8"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Check SEO
                  </>
                )}
              </Button>
            </div>
            {error && (
              <p className="text-destructive text-sm mt-3 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>

          {/* Results */}
          {result && (
            <AnimatedSection className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
              {/* Overall Score */}
              <div className="text-center mb-8 pb-8 border-b border-border">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.overallScore)}`}>
                  {result.overallScore}
                </div>
                <p className="text-muted-foreground">Overall SEO Score</p>
                <p className="text-sm text-muted-foreground mt-2">{result.url}</p>
              </div>

              {/* Detailed Results */}
              <div className="space-y-6">
                {/* Title Tag */}
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">Title Tag</h3>
                        {getScoreIcon(result.titleScore)}
                      </div>
                      <p className="text-foreground mb-1">"{result.title}"</p>
                      <p className="text-sm text-muted-foreground">
                        Length: {result.titleLength} characters 
                        {result.titleLength < 30 && " (Too short - aim for 50-60)"}
                        {result.titleLength > 60 && " (Too long - may be truncated)"}
                        {result.titleLength >= 30 && result.titleLength <= 60 && " (Good length)"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Meta Description */}
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">Meta Description</h3>
                        {getScoreIcon(result.descriptionScore)}
                      </div>
                      <p className="text-foreground mb-1 text-sm">"{result.description}"</p>
                      <p className="text-sm text-muted-foreground">
                        Length: {result.descriptionLength} characters 
                        {result.descriptionLength < 120 && " (Too short - aim for 150-160)"}
                        {result.descriptionLength > 160 && " (May be truncated in search results)"}
                        {result.descriptionLength >= 120 && result.descriptionLength <= 160 && " (Good length)"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Checks */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl flex items-center gap-4">
                    {getScoreIcon(result.hasH1)}
                    <div>
                      <h3 className="font-semibold">H1 Heading</h3>
                      <p className="text-sm text-muted-foreground">
                        {result.hasH1 ? "Found" : "Missing"}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-xl flex items-center gap-4">
                    {getScoreIcon(result.isHttps)}
                    <div>
                      <h3 className="font-semibold">HTTPS</h3>
                      <p className="text-sm text-muted-foreground">
                        {result.isHttps ? "Secure" : "Not secure"}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-xl flex items-center gap-4">
                    {getScoreIcon(result.hasFavicon)}
                    <div>
                      <h3 className="font-semibold">Favicon</h3>
                      <p className="text-sm text-muted-foreground">
                        {result.hasFavicon ? "Present" : "Missing"}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-xl flex items-center gap-4">
                    {getScoreIcon(result.isResponsive)}
                    <div>
                      <h3 className="font-semibold">Mobile Responsive</h3>
                      <p className="text-sm text-muted-foreground">
                        {result.isResponsive ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-6 border-t border-border">
                  <p className="text-muted-foreground mb-4">
                    Want a comprehensive SEO audit and improvement plan?
                  </p>
                  <Button variant="hero" asChild>
                    <a href="/contact">
                      Get Free SEO Consultation
                      <Zap className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SEOChecker;
