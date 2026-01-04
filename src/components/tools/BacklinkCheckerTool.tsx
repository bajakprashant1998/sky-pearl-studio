import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon, Loader2, ExternalLink, Search, TrendingUp } from "lucide-react";

interface BacklinkResult {
  domain: string;
  da: number;
  backlinks: number;
  referringDomains: number;
  topAnchors: string[];
}

const BacklinkCheckerTool = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BacklinkResult | null>(null);

  const checkBacklinks = async () => {
    if (!domain) return;

    setLoading(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const mockResult: BacklinkResult = {
      domain: domain.replace(/^https?:\/\//, "").replace(/\/$/, ""),
      da: Math.floor(Math.random() * 50) + 20,
      backlinks: Math.floor(Math.random() * 50000) + 1000,
      referringDomains: Math.floor(Math.random() * 500) + 50,
      topAnchors: [
        "Brand name",
        "Click here",
        "Website URL",
        "Learn more",
        domain.split(".")[0]
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
            <LinkIcon className="w-5 h-5 text-primary" />
            Backlink Checker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              placeholder="Enter domain (e.g., example.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="flex-1"
            />
            <Button onClick={checkBacklinks} disabled={loading} className="shrink-0">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Check Backlinks
                </>
              )}
            </Button>
          </div>

          {result && (
            <div className="space-y-6">
              {/* Main Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl text-center">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary">{result.da}</p>
                  <p className="text-sm text-muted-foreground">Domain Authority</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl text-center">
                  <LinkIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-3xl font-bold">{result.backlinks.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Backlinks</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl text-center">
                  <ExternalLink className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-3xl font-bold">{result.referringDomains.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Referring Domains</p>
                </div>
              </div>

              {/* Top Anchors */}
              <div className="p-6 border border-border rounded-xl">
                <h3 className="font-semibold mb-4">Top Anchor Texts</h3>
                <div className="flex flex-wrap gap-2">
                  {result.topAnchors.map((anchor, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      {anchor}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                This is demo data. For accurate backlink analysis, consider our premium services.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BacklinkCheckerTool;
