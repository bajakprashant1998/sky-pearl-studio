import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Loader2, Smartphone, Monitor, Clock, FileImage, Code } from "lucide-react";

interface SpeedResult {
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
  };
  opportunities: string[];
}

const SpeedTestTool = () => {
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeedResult | null>(null);

  const runSpeedTest = async () => {
    if (!url) return;

    setLoading(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const mockResult: SpeedResult = {
      url: url.startsWith("http") ? url : `https://${url}`,
      device,
      scores: {
        performance: Math.floor(Math.random() * 40) + 55,
        accessibility: Math.floor(Math.random() * 20) + 75,
        bestPractices: Math.floor(Math.random() * 25) + 70,
        seo: Math.floor(Math.random() * 15) + 80
      },
      metrics: {
        fcp: `${(Math.random() * 2 + 0.5).toFixed(1)}s`,
        lcp: `${(Math.random() * 3 + 1).toFixed(1)}s`,
        cls: (Math.random() * 0.2).toFixed(2),
        tti: `${(Math.random() * 4 + 2).toFixed(1)}s`
      },
      opportunities: [
        "Serve images in next-gen formats",
        "Eliminate render-blocking resources",
        "Reduce unused JavaScript",
        "Enable text compression"
      ]
    };

    setResult(mockResult);
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500 border-green-500";
    if (score >= 50) return "text-yellow-500 border-yellow-500";
    return "text-red-500 border-red-500";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Test Your Website Speed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter your website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={runSpeedTest} disabled={loading} className="shrink-0">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
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
          </div>

          {result && (
            <div className="space-y-6">
              {/* Score Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(result.scores).map(([key, score]) => (
                  <div key={key} className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className={`text-3xl font-bold border-2 w-16 h-16 rounded-full flex items-center justify-center mx-auto ${getScoreColor(score)}`}>
                      {score}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Core Web Vitals */}
              <div className="p-6 border border-border rounded-xl">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Core Web Vitals
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">First Contentful Paint</p>
                    <p className="text-xl font-bold text-primary">{result.metrics.fcp}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Largest Contentful Paint</p>
                    <p className="text-xl font-bold text-primary">{result.metrics.lcp}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Cumulative Layout Shift</p>
                    <p className="text-xl font-bold text-primary">{result.metrics.cls}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Time to Interactive</p>
                    <p className="text-xl font-bold text-primary">{result.metrics.tti}</p>
                  </div>
                </div>
              </div>

              {/* Opportunities */}
              <div className="p-6 border border-border rounded-xl">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <FileImage className="w-4 h-4" />
                  Optimization Opportunities
                </h3>
                <ul className="space-y-2">
                  {result.opportunities.map((opp, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Code className="w-4 h-4 text-yellow-500" />
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeedTestTool;
