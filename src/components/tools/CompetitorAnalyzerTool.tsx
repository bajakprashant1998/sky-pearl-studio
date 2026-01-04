import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Loader2, Search, Globe, TrendingUp, Eye, Link } from "lucide-react";

interface CompetitorResult {
  domain: string;
  traffic: number;
  keywords: number;
  backlinks: number;
  topKeywords: string[];
  strengthAreas: string[];
}

const CompetitorAnalyzerTool = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompetitorResult | null>(null);

  const analyzeCompetitor = async () => {
    if (!domain) return;

    setLoading(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const mockResult: CompetitorResult = {
      domain: domain.replace(/^https?:\/\//, "").replace(/\/$/, ""),
      traffic: Math.floor(Math.random() * 500000) + 50000,
      keywords: Math.floor(Math.random() * 10000) + 1000,
      backlinks: Math.floor(Math.random() * 100000) + 5000,
      topKeywords: [
        "digital marketing",
        "SEO services",
        "online advertising",
        "content marketing",
        "social media marketing"
      ],
      strengthAreas: [
        "Strong content strategy",
        "High domain authority",
        "Active social presence",
        "Good technical SEO"
      ]
    };

    setResult(mockResult);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Competitor Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              placeholder="Enter competitor domain (e.g., competitor.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="flex-1"
            />
            <Button onClick={analyzeCompetitor} disabled={loading} className="shrink-0">
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

          {result && (
            <div className="space-y-6">
              {/* Domain Header */}
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <Globe className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{result.domain}</h3>
                  <p className="text-sm text-muted-foreground">Competitor Analysis Report</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 border border-border rounded-xl text-center">
                  <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{result.traffic.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Est. Monthly Traffic</p>
                </div>
                <div className="p-5 border border-border rounded-xl text-center">
                  <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{result.keywords.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Ranking Keywords</p>
                </div>
                <div className="p-5 border border-border rounded-xl text-center">
                  <Link className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{result.backlinks.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Backlinks</p>
                </div>
              </div>

              {/* Top Keywords & Strengths */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 border border-border rounded-xl">
                  <h4 className="font-semibold mb-3">Top Ranking Keywords</h4>
                  <ul className="space-y-2">
                    {result.topKeywords.map((kw, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <span className="w-5 h-5 bg-primary/10 text-primary text-xs rounded-full flex items-center justify-center">
                          {idx + 1}
                        </span>
                        {kw}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 border border-border rounded-xl">
                  <h4 className="font-semibold mb-3">Competitive Strengths</h4>
                  <ul className="space-y-2">
                    {result.strengthAreas.map((strength, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorAnalyzerTool;
