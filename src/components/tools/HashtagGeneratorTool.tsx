import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash, Copy, CheckCircle2, Loader2, Instagram, Twitter, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HashtagGeneratorTool = () => {
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState<"instagram" | "twitter" | "linkedin">("instagram");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const hashtagDatabase: Record<string, Record<string, string[]>> = {
    marketing: {
      instagram: ["#digitalmarketing", "#marketing", "#socialmediamarketing", "#marketingdigital", "#contentmarketing", "#marketingstrategy", "#onlinemarketing", "#marketingtips", "#branding", "#business", "#entrepreneur", "#socialmedia", "#advertising", "#seo", "#growth"],
      twitter: ["#Marketing", "#DigitalMarketing", "#ContentMarketing", "#SEO", "#SocialMedia", "#MarTech", "#GrowthHacking", "#B2B", "#Advertising"],
      linkedin: ["#Marketing", "#DigitalMarketing", "#ContentStrategy", "#B2BMarketing", "#MarketingLeadership", "#GrowthMarketing", "#BrandStrategy"]
    },
    business: {
      instagram: ["#business", "#entrepreneur", "#smallbusiness", "#businessowner", "#startup", "#success", "#motivation", "#entrepreneurship", "#hustle", "#businesstips", "#onlinebusiness", "#businessmindset", "#ceo", "#leadership", "#growth"],
      twitter: ["#Business", "#Entrepreneur", "#Startup", "#SmallBusiness", "#Leadership", "#Innovation", "#Success", "#CEOmindset"],
      linkedin: ["#Business", "#Entrepreneurship", "#Leadership", "#StartupLife", "#Innovation", "#BusinessGrowth", "#CEOinsights"]
    },
    technology: {
      instagram: ["#technology", "#tech", "#innovation", "#ai", "#artificialintelligence", "#machinelearning", "#coding", "#programming", "#software", "#developer", "#startup", "#digital", "#future", "#automation", "#data"],
      twitter: ["#Tech", "#AI", "#MachineLearning", "#Coding", "#Developer", "#Innovation", "#DataScience", "#Startup", "#FutureTech"],
      linkedin: ["#Technology", "#Innovation", "#AI", "#DigitalTransformation", "#TechLeadership", "#FutureOfWork", "#DataDriven"]
    },
    fitness: {
      instagram: ["#fitness", "#gym", "#workout", "#fitnessmotivation", "#fit", "#training", "#health", "#bodybuilding", "#lifestyle", "#motivation", "#healthy", "#exercise", "#muscle", "#fitfam", "#gymlife"],
      twitter: ["#Fitness", "#Workout", "#Health", "#GymLife", "#FitFam", "#Training", "#HealthyLifestyle", "#Exercise"],
      linkedin: ["#Fitness", "#WellnessAtWork", "#HealthyLifestyle", "#CorporateWellness", "#WorkLifeBalance"]
    },
    food: {
      instagram: ["#food", "#foodie", "#foodporn", "#instafood", "#yummy", "#delicious", "#foodphotography", "#foodstagram", "#cooking", "#homemade", "#dinner", "#lunch", "#breakfast", "#recipe", "#tasty"],
      twitter: ["#Food", "#Foodie", "#Recipe", "#Cooking", "#Delicious", "#FoodPhotography", "#Homemade", "#ChefLife"],
      linkedin: ["#FoodIndustry", "#FoodBusiness", "#Hospitality", "#Restaurant", "#FoodTech", "#Sustainability"]
    },
    travel: {
      instagram: ["#travel", "#travelgram", "#traveling", "#travelphotography", "#instatravel", "#wanderlust", "#adventure", "#explore", "#vacation", "#trip", "#tourism", "#travelblogger", "#nature", "#holiday", "#photography"],
      twitter: ["#Travel", "#Wanderlust", "#Adventure", "#Explore", "#Tourism", "#TravelBlogger", "#Vacation", "#Holiday"],
      linkedin: ["#Travel", "#TravelIndustry", "#Tourism", "#Hospitality", "#TravelTech", "#SustainableTravel"]
    },
    fashion: {
      instagram: ["#fashion", "#style", "#ootd", "#fashionblogger", "#outfit", "#fashionstyle", "#streetstyle", "#instafashion", "#fashionista", "#model", "#beauty", "#clothing", "#dress", "#trendy", "#fashionphotography"],
      twitter: ["#Fashion", "#Style", "#OOTD", "#FashionWeek", "#Trends", "#StreetStyle", "#Designer", "#FashionBlogger"],
      linkedin: ["#Fashion", "#FashionIndustry", "#RetailFashion", "#Sustainability", "#FashionTech", "#LuxuryBrands"]
    },
    default: {
      instagram: ["#instagood", "#photooftheday", "#love", "#beautiful", "#happy", "#picoftheday", "#photography", "#instagram", "#nature", "#art", "#style", "#life", "#follow", "#like", "#trending"],
      twitter: ["#trending", "#viral", "#popular", "#today", "#news", "#follow", "#share", "#discover", "#explore"],
      linkedin: ["#networking", "#professional", "#career", "#success", "#growth", "#learning", "#industry", "#innovation"]
    }
  };

  const generateHashtags = () => {
    if (!keyword.trim()) {
      toast({
        variant: "destructive",
        title: "Please enter a keyword",
        description: "Enter a topic or keyword to generate hashtags.",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const lowerKeyword = keyword.toLowerCase();
      let matchedCategory = "default";
      
      for (const category of Object.keys(hashtagDatabase)) {
        if (lowerKeyword.includes(category) || category.includes(lowerKeyword)) {
          matchedCategory = category;
          break;
        }
      }
      
      const baseHashtags = hashtagDatabase[matchedCategory][platform];
      const keywordHashtag = `#${keyword.replace(/\s+/g, '')}`;
      const result = [keywordHashtag, ...baseHashtags].slice(0, 20);
      
      setHashtags(result);
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Hashtags copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-violet-500" />
            Hashtag Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter Topic or Keyword</label>
            <Input
              placeholder="e.g., marketing, fitness, travel..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select Platform</label>
            <div className="flex gap-2">
              <Button
                variant={platform === "instagram" ? "default" : "outline"}
                onClick={() => setPlatform("instagram")}
                className="flex-1"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </Button>
              <Button
                variant={platform === "twitter" ? "default" : "outline"}
                onClick={() => setPlatform("twitter")}
                className="flex-1"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant={platform === "linkedin" ? "default" : "outline"}
                onClick={() => setPlatform("linkedin")}
                className="flex-1"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>

          <Button onClick={generateHashtags} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Hash className="w-4 h-4 mr-2" />
                Generate Hashtags
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {hashtags.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Hashtags ({hashtags.length})</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-violet-500/10 text-violet-600 rounded-full text-sm font-medium cursor-pointer hover:bg-violet-500/20 transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(tag);
                    toast({ title: "Copied!", description: `${tag} copied to clipboard.` });
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <Textarea
              value={hashtags.join(' ')}
              readOnly
              className="min-h-[100px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HashtagGeneratorTool;
