import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag, Copy, Check, Eye } from "lucide-react";

const MetaTagGeneratorTool = () => {
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    return `<!-- Primary Meta Tags -->
<title>${pageTitle}</title>
<meta name="title" content="${pageTitle}">
<meta name="description" content="${pageDescription}">
<meta name="keywords" content="${keywords}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${pageUrl}">
<meta property="og:title" content="${pageTitle}">
<meta property="og:description" content="${pageDescription}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${pageUrl}">
<meta property="twitter:title" content="${pageTitle}">
<meta property="twitter:description" content="${pageDescription}">`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const titleLength = pageTitle.length;
  const descLength = pageDescription.length;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            Meta Tag Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Page Title</label>
                  <span className={`text-xs ${titleLength > 60 ? 'text-red-500' : titleLength > 50 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {titleLength}/60
                  </span>
                </div>
                <Input
                  placeholder="Enter your page title"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  maxLength={70}
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Meta Description</label>
                  <span className={`text-xs ${descLength > 160 ? 'text-red-500' : descLength > 150 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {descLength}/160
                  </span>
                </div>
                <Textarea
                  placeholder="Enter your meta description"
                  value={pageDescription}
                  onChange={(e) => setPageDescription(e.target.value)}
                  maxLength={170}
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Keywords</label>
                <Input
                  placeholder="keyword1, keyword2, keyword3"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Page URL</label>
                <Input
                  placeholder="https://example.com/page"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* SERP Preview */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Google Search Preview
                </label>
                <div className="p-4 bg-white border border-border rounded-lg">
                  <p className="text-blue-600 text-lg truncate hover:underline cursor-pointer">
                    {pageTitle || "Your Page Title"}
                  </p>
                  <p className="text-green-700 text-sm truncate">
                    {pageUrl || "https://example.com/page"}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {pageDescription || "Your meta description will appear here..."}
                  </p>
                </div>
              </div>

              {/* Generated Code */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Generated Meta Tags</label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={pageTitle ? generateMetaTags() : ""}
                  readOnly
                  className="font-mono text-xs min-h-[200px]"
                  placeholder="Fill in the form to generate meta tags..."
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaTagGeneratorTool;
