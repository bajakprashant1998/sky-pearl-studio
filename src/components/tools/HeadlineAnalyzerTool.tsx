import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Type, Loader2, CheckCircle, AlertCircle, XCircle, Lightbulb } from "lucide-react";

interface HeadlineScore {
  overall: number;
  emotional: number;
  power: number;
  readability: number;
  wordBalance: {
    common: number;
    uncommon: number;
    emotional: number;
    power: number;
  };
  improvements: string[];
}

const HeadlineAnalyzerTool = () => {
  const [headline, setHeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HeadlineScore | null>(null);

  const analyzeHeadline = async () => {
    if (!headline) return;

    setLoading(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const words = headline.split(" ").length;
    const hasNumber = /\d/.test(headline);
    const hasPowerWord = /ultimate|proven|secret|amazing|incredible|essential|best|top/i.test(headline);
    const hasEmotionalWord = /love|fear|joy|surprise|trust|discover|reveal/i.test(headline);

    let score = 50;
    if (words >= 6 && words <= 12) score += 15;
    if (hasNumber) score += 10;
    if (hasPowerWord) score += 15;
    if (hasEmotionalWord) score += 10;

    const mockResult: HeadlineScore = {
      overall: Math.min(score, 100),
      emotional: hasEmotionalWord ? 75 : 35,
      power: hasPowerWord ? 80 : 40,
      readability: words <= 10 ? 85 : 60,
      wordBalance: {
        common: Math.floor(Math.random() * 30) + 40,
        uncommon: Math.floor(Math.random() * 20) + 10,
        emotional: hasEmotionalWord ? 20 : 5,
        power: hasPowerWord ? 15 : 5
      },
      improvements: [
        !hasNumber ? "Add a number for specificity (e.g., '7 Ways...')" : null,
        !hasPowerWord ? "Include a power word like 'Ultimate', 'Proven', or 'Essential'" : null,
        !hasEmotionalWord ? "Add emotional appeal with words like 'Discover' or 'Transform'" : null,
        words < 6 ? "Make your headline longer (6-12 words is optimal)" : null,
        words > 12 ? "Consider shortening your headline for better impact" : null
      ].filter(Boolean) as string[]
    };

    setResult(mockResult);
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 50) return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5 text-primary" />
            Headline Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              placeholder="Enter your headline to analyze..."
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="flex-1"
            />
            <Button onClick={analyzeHeadline} disabled={loading || !headline} className="shrink-0">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </Button>
          </div>

          {result && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="text-center p-8 bg-muted/50 rounded-xl">
                <div className={`text-6xl font-bold ${getScoreColor(result.overall)}`}>
                  {result.overall}
                </div>
                <p className="text-muted-foreground mt-2">Headline Score</p>
              </div>

              {/* Score Breakdown */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Emotional Appeal</span>
                    {getScoreIcon(result.emotional)}
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${result.emotional >= 70 ? 'bg-green-500' : result.emotional >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${result.emotional}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Power Words</span>
                    {getScoreIcon(result.power)}
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${result.power >= 70 ? 'bg-green-500' : result.power >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${result.power}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Readability</span>
                    {getScoreIcon(result.readability)}
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${result.readability >= 70 ? 'bg-green-500' : result.readability >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${result.readability}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Improvements */}
              {result.improvements.length > 0 && (
                <div className="p-5 border border-border rounded-xl">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Suggestions for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {result.improvements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">•</span>
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HeadlineAnalyzerTool;
