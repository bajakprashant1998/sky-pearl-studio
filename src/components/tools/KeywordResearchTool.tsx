import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, Loader2, TrendingUp, TrendingDown, Minus, Search } from "lucide-react";

interface KeywordResult {
  keyword: string;
  volume: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cpc: string;
  trend: "up" | "down" | "stable";
}

const KeywordResearchTool = () => {
  const [seedKeyword, setSeedKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<KeywordResult[]>([]);

  const researchKeywords = async () => {
    if (!seedKeyword) return;

    setLoading(true);
    setResults([]);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResults: KeywordResult[] = [
      { keyword: seedKeyword, volume: Math.floor(Math.random() * 50000) + 10000, difficulty: "Hard", cpc: `$${(Math.random() * 5 + 1).toFixed(2)}`, trend: "up" },
      { keyword: `${seedKeyword} services`, volume: Math.floor(Math.random() * 20000) + 5000, difficulty: "Medium", cpc: `$${(Math.random() * 3 + 0.5).toFixed(2)}`, trend: "up" },
      { keyword: `best ${seedKeyword}`, volume: Math.floor(Math.random() * 15000) + 3000, difficulty: "Medium", cpc: `$${(Math.random() * 4 + 1).toFixed(2)}`, trend: "stable" },
      { keyword: `${seedKeyword} tips`, volume: Math.floor(Math.random() * 8000) + 2000, difficulty: "Easy", cpc: `$${(Math.random() * 2 + 0.3).toFixed(2)}`, trend: "up" },
      { keyword: `${seedKeyword} guide`, volume: Math.floor(Math.random() * 6000) + 1500, difficulty: "Easy", cpc: `$${(Math.random() * 1.5 + 0.2).toFixed(2)}`, trend: "stable" },
      { keyword: `${seedKeyword} examples`, volume: Math.floor(Math.random() * 5000) + 1000, difficulty: "Easy", cpc: `$${(Math.random() * 1 + 0.1).toFixed(2)}`, trend: "up" },
      { keyword: `how to ${seedKeyword}`, volume: Math.floor(Math.random() * 12000) + 4000, difficulty: "Medium", cpc: `$${(Math.random() * 2 + 0.5).toFixed(2)}`, trend: "stable" },
      { keyword: `${seedKeyword} for beginners`, volume: Math.floor(Math.random() * 4000) + 800, difficulty: "Easy", cpc: `$${(Math.random() * 0.8 + 0.1).toFixed(2)}`, trend: "down" },
    ];

    setResults(mockResults);
    setLoading(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Keyword Research
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              placeholder="Enter a seed keyword (e.g., digital marketing)"
              value={seedKeyword}
              onChange={(e) => setSeedKeyword(e.target.value)}
              className="flex-1"
            />
            <Button onClick={researchKeywords} disabled={loading} className="shrink-0">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Researching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Research
                </>
              )}
            </Button>
          </div>

          {results.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold">Keyword</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">Volume</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold">Difficulty</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">CPC</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium">{result.keyword}</td>
                      <td className="py-3 px-4 text-sm text-right">{result.volume.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(result.difficulty)}`}>
                          {result.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-right">{result.cpc}</td>
                      <td className="py-3 px-4 flex justify-center">{getTrendIcon(result.trend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KeywordResearchTool;
