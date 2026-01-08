import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Loader2, Smartphone, Monitor, Clock, FileImage, Code, AlertTriangle, CheckCircle, Info, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface LighthouseResult {
  url: string;
  device: "mobile" | "desktop";
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics: {
    fcp: string;
    lcp: string;
    cls: string;
    tti: string;
    tbt: string;
    speed: string;
  };
  opportunities: Array<{
    title: string;
    description: string;
    savings?: string;
  }>;
  diagnostics: string[];
}

const SpeedTestTool = () => {
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LighthouseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runSpeedTest = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    // Validate URL
    let testUrl = url;
    if (!testUrl.startsWith("http://") && !testUrl.startsWith("https://")) {
      testUrl = "https://" + testUrl;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Using Google PageSpeed Insights API (free tier, no API key required for basic usage)
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&strategy=${device}&category=performance&category=accessibility&category=best-practices&category=seo`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Failed to analyze the website");
      }

      const lighthouse = data.lighthouseResult;
      const categories = lighthouse.categories;
      const audits = lighthouse.audits;

      // Extract metrics
      const fcp = audits["first-contentful-paint"]?.displayValue || "N/A";
      const lcp = audits["largest-contentful-paint"]?.displayValue || "N/A";
      const cls = audits["cumulative-layout-shift"]?.displayValue || "N/A";
      const tti = audits["interactive"]?.displayValue || "N/A";
      const tbt = audits["total-blocking-time"]?.displayValue || "N/A";
      const speed = audits["speed-index"]?.displayValue || "N/A";

      // Extract opportunities
      const opportunities: Array<{ title: string; description: string; savings?: string }> = [];
      
      const opportunityAudits = [
        "render-blocking-resources",
        "unused-javascript",
        "unused-css-rules",
        "modern-image-formats",
        "uses-optimized-images",
        "uses-responsive-images",
        "efficient-animated-content",
        "duplicated-javascript",
        "legacy-javascript",
        "preload-lcp-image",
        "total-byte-weight"
      ];

      opportunityAudits.forEach(auditId => {
        const audit = audits[auditId];
        if (audit && audit.score !== null && audit.score < 1) {
          opportunities.push({
            title: audit.title,
            description: audit.description?.replace(/\[.*?\]\(.*?\)/g, "").substring(0, 200) || "",
            savings: audit.displayValue
          });
        }
      });

      // Extract diagnostics
      const diagnostics: string[] = [];
      const diagnosticAudits = [
        "dom-size",
        "critical-request-chains",
        "mainthread-work-breakdown",
        "bootup-time",
        "font-display",
        "third-party-summary"
      ];

      diagnosticAudits.forEach(auditId => {
        const audit = audits[auditId];
        if (audit && audit.score !== null && audit.score < 0.9) {
          diagnostics.push(audit.title);
        }
      });

      const analysisResult: LighthouseResult = {
        url: testUrl,
        device,
        scores: {
          performance: Math.round((categories.performance?.score || 0) * 100),
          accessibility: Math.round((categories.accessibility?.score || 0) * 100),
          bestPractices: Math.round((categories["best-practices"]?.score || 0) * 100),
          seo: Math.round((categories.seo?.score || 0) * 100)
        },
        metrics: {
          fcp,
          lcp,
          cls,
          tti,
          tbt,
          speed
        },
        opportunities: opportunities.slice(0, 6),
        diagnostics: diagnostics.slice(0, 5)
      };

      setResult(analysisResult);
      toast.success("Speed test completed successfully!");

    } catch (err: any) {
      console.error("Speed test error:", err);
      setError(err.message || "Failed to analyze the website. Please check the URL and try again.");
      toast.error("Speed test failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500 border-green-500 bg-green-50";
    if (score >= 50) return "text-yellow-500 border-yellow-500 bg-yellow-50";
    return "text-red-500 border-red-500 bg-red-50";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Good";
    if (score >= 50) return "Needs Work";
    return "Poor";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-4 h-4" />;
    if (score >= 50) return <AlertTriangle className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Website Speed Test
          </CardTitle>
          <CardDescription>
            Powered by Google PageSpeed Insights API - Get real performance metrics for your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter your website URL (e.g., example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && runSpeedTest()}
              />
              <Button onClick={runSpeedTest} disabled={loading} className="shrink-0">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Run Test
                  </>
                )}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant={device === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setDevice("mobile")}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
              <Button
                variant={device === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setDevice("desktop")}
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </Button>
            </div>

            {loading && (
              <div className="bg-muted/50 rounded-xl p-6 text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                <p className="text-muted-foreground">
                  Running comprehensive speed analysis...
                  <br />
                  <span className="text-sm">This may take 30-60 seconds</span>
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Analysis Failed</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Analyzed URL */}
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Analyzed:</span>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {result.url}
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">
                  {result.device}
                </span>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(result.scores).map(([key, score]) => (
                  <div key={key} className={`text-center p-4 rounded-xl border-2 ${getScoreColor(score)}`}>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {getScoreIcon(score)}
                      <span className="text-xs font-medium">{getScoreLabel(score)}</span>
                    </div>
                    <div className="text-3xl font-bold">
                      {score}
                    </div>
                    <p className="text-sm mt-2 capitalize font-medium">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Core Web Vitals */}
              <div className="p-6 border border-border rounded-xl">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Core Web Vitals & Metrics
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">First Contentful Paint (FCP)</p>
                    <p className="text-xl font-bold text-primary">{result.metrics.fcp}</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Largest Contentful Paint (LCP)</p>
                    <p className="text-xl font-bold text-primary">{result.metrics.lcp}</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Cumulative Layout Shift (CLS)</p>
                    <p className="text-xl font-bold text-primary">{result.metrics.cls}</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Time to Interactive (TTI)</p>
                    <p className="text-xl font-bold text-primary">{result.metrics.tti}</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Total Blocking Time (TBT)</p>
                    <p className="text-xl font-bold text-primary">{result.metrics.tbt}</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Speed Index</p>
                    <p className="text-xl font-bold text-primary">{result.metrics.speed}</p>
                  </div>
                </div>
              </div>

              {/* Opportunities */}
              {result.opportunities.length > 0 && (
                <div className="p-6 border border-border rounded-xl">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileImage className="w-4 h-4 text-primary" />
                    Optimization Opportunities
                  </h3>
                  <ul className="space-y-3">
                    {result.opportunities.map((opp, idx) => (
                      <li key={idx} className="bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Code className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-sm">{opp.title}</p>
                            {opp.savings && (
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                                Potential savings: {opp.savings}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Diagnostics */}
              {result.diagnostics.length > 0 && (
                <div className="p-6 border border-border rounded-xl">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    Diagnostics
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {result.diagnostics.map((diagnostic, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg">
                        <Info className="w-4 h-4 text-muted-foreground" />
                        {diagnostic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Need Help Improving Your Website Speed?</h3>
                <p className="text-muted-foreground mb-4">
                  Our experts can optimize your website for better performance and higher search rankings.
                </p>
                <Button asChild>
                  <a href="/contact">Get Free Consultation</a>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeedTestTool;
