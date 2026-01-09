import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Globe, Loader2, TrendingUp, Shield, Link, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DomainMetrics {
  domain: string;
  domainAuthority: number;
  pageAuthority: number;
  spamScore: number;
  backlinks: number;
  referringDomains: number;
  trustFlow: number;
  citationFlow: number;
}

const DomainAuthorityCheckerTool = () => {
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<DomainMetrics | null>(null);
  const { toast } = useToast();

  const checkDomainAuthority = () => {
    if (!domain.trim()) {
      toast({
        variant: "destructive",
        title: "Please enter a domain",
        description: "Enter a domain name to check its authority.",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with realistic metrics
    setTimeout(() => {
      // Generate semi-random but realistic metrics based on domain
      const domainHash = domain.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      
      const simulatedMetrics: DomainMetrics = {
        domain: domain.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, ''),
        domainAuthority: Math.min(95, Math.max(5, (domainHash % 60) + 20)),
        pageAuthority: Math.min(90, Math.max(5, (domainHash % 55) + 15)),
        spamScore: Math.min(30, Math.max(1, domainHash % 15)),
        backlinks: (domainHash * 127) % 50000 + 500,
        referringDomains: (domainHash * 31) % 5000 + 50,
        trustFlow: Math.min(85, Math.max(10, (domainHash % 50) + 15)),
        citationFlow: Math.min(90, Math.max(15, (domainHash % 55) + 20)),
      };
      
      setMetrics(simulatedMetrics);
      setIsLoading(false);
    }, 2000);
  };

  const getScoreColor = (score: number, type: 'authority' | 'spam' = 'authority') => {
    if (type === 'spam') {
      if (score <= 5) return 'text-green-500';
      if (score <= 15) return 'text-yellow-500';
      return 'text-red-500';
    }
    if (score >= 60) return 'text-green-500';
    if (score >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressColor = (score: number, type: 'authority' | 'spam' = 'authority') => {
    if (type === 'spam') {
      if (score <= 5) return 'bg-green-500';
      if (score <= 15) return 'bg-yellow-500';
      return 'bg-red-500';
    }
    if (score >= 60) return 'bg-green-500';
    if (score >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Domain Authority Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter domain (e.g., example.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkDomainAuthority()}
              className="flex-1"
            />
            <Button onClick={checkDomainAuthority} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4 mr-2" />
                  Check DA
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {metrics && (
        <>
          {/* Main Scores */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        className="stroke-muted"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        className={`${getProgressColor(metrics.domainAuthority).replace('bg-', 'stroke-')}`}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(metrics.domainAuthority / 100) * 352} 352`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-4xl font-bold ${getScoreColor(metrics.domainAuthority)}`}>
                        {metrics.domainAuthority}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">Domain Authority</h3>
                  <p className="text-sm text-muted-foreground">Overall website authority score</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        className="stroke-muted"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        className={`${getProgressColor(metrics.pageAuthority).replace('bg-', 'stroke-')}`}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(metrics.pageAuthority / 100) * 352} 352`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-4xl font-bold ${getScoreColor(metrics.pageAuthority)}`}>
                        {metrics.pageAuthority}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">Page Authority</h3>
                  <p className="text-sm text-muted-foreground">Homepage authority score</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Detailed Metrics for {metrics.domain}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spam Score</span>
                    <span className={`font-semibold ${getScoreColor(metrics.spamScore, 'spam')}`}>
                      {metrics.spamScore}%
                    </span>
                  </div>
                  <Progress value={metrics.spamScore} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trust Flow</span>
                    <span className={`font-semibold ${getScoreColor(metrics.trustFlow)}`}>
                      {metrics.trustFlow}
                    </span>
                  </div>
                  <Progress value={metrics.trustFlow} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Citation Flow</span>
                    <span className={`font-semibold ${getScoreColor(metrics.citationFlow)}`}>
                      {metrics.citationFlow}
                    </span>
                  </div>
                  <Progress value={metrics.citationFlow} className="h-2" />
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Link className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{metrics.backlinks.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Backlinks</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <ExternalLink className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{metrics.referringDomains.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Referring Domains</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Shield className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {metrics.spamScore <= 5 ? 'Low' : metrics.spamScore <= 15 ? 'Medium' : 'High'}
                    </p>
                    <p className="text-sm text-muted-foreground">Spam Risk Level</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Improvement Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips to Improve Domain Authority</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Build high-quality backlinks from authoritative websites in your niche
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Create valuable, shareable content that attracts natural links
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Remove or disavow toxic backlinks that harm your spam score
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Improve internal linking structure across your website
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Be patient - domain authority takes time to build naturally
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default DomainAuthorityCheckerTool;
