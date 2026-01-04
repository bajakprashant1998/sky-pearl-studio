import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";

interface SEOResult {
  title: { value: string; length: number; status: "good" | "warning" | "error" };
  description: { value: string; length: number; status: "good" | "warning" | "error" };
  h1: { count: number; value: string; status: "good" | "warning" | "error" };
  images: { total: number; withAlt: number; status: "good" | "warning" | "error" };
  links: { internal: number; external: number };
  score: number;
}

const SEOCheckerTool = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SEOResult | null>(null);
  const [error, setError] = useState("");

  const analyzeUrl = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    // Simulated SEO analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate mock results based on URL
    const mockResult: SEOResult = {
      title: {
        value: `${new URL(url.startsWith("http") ? url : `https://${url}`).hostname} - Page Title`,
        length: 45,
        status: "good"
      },
      description: {
        value: "This is a sample meta description that would be extracted from the page...",
        length: 120,
        status: "good"
      },
      h1: {
        count: 1,
        value: "Main Heading",
        status: "good"
      },
      images: {
        total: 12,
        withAlt: 8,
        status: "warning"
      },
      links: {
        internal: 25,
        external: 8
      },
      score: Math.floor(Math.random() * 30) + 65
    };

    setResult(mockResult);
    setLoading(false);
  };

  const getStatusIcon = (status: "good" | "warning" | "error") => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Analyze Your Website SEO
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              type="url"
              placeholder="Enter your website URL (e.g., example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={analyzeUrl} disabled={loading} className="shrink-0">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Score */}
              <div className="text-center p-6 bg-muted/50 rounded-xl">
                <div className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}/100
                </div>
                <p className="text-muted-foreground mt-2">Overall SEO Score</p>
              </div>

              {/* Results Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Title Tag */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Title Tag</h4>
                    {getStatusIcon(result.title.status)}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{result.title.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Length: {result.title.length} characters (Recommended: 50-60)
                  </p>
                </div>

                {/* Meta Description */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Meta Description</h4>
                    {getStatusIcon(result.description.status)}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{result.description.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Length: {result.description.length} characters (Recommended: 150-160)
                  </p>
                </div>

                {/* H1 Tag */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">H1 Tag</h4>
                    {getStatusIcon(result.h1.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{result.h1.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Found: {result.h1.count} H1 tag(s)
                  </p>
                </div>

                {/* Images */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Image Alt Tags</h4>
                    {getStatusIcon(result.images.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.images.withAlt} of {result.images.total} images have alt text
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round((result.images.withAlt / result.images.total) * 100)}% coverage
                  </p>
                </div>

                {/* Links */}
                <div className="p-4 border border-border rounded-lg md:col-span-2">
                  <h4 className="font-semibold mb-2">Link Analysis</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">{result.links.internal}</p>
                      <p className="text-sm text-muted-foreground">Internal Links</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent">{result.links.external}</p>
                      <p className="text-sm text-muted-foreground">External Links</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOCheckerTool;
