import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Loader2, Download, Sparkles } from "lucide-react";

const AIImageGeneratorTool = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt) return;

    setLoading(true);
    setGeneratedImage(null);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Using Unsplash for demo images based on prompt keywords
    const keywords = prompt.toLowerCase().split(" ").slice(0, 2).join(",");
    setGeneratedImage(`https://source.unsplash.com/800x800/?${encodeURIComponent(keywords)}`);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Generate AI Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Image Description</label>
                <Input
                  placeholder="Describe the image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Be specific for better results (e.g., "A modern office building at sunset with glass windows")
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Style</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="illustration">Illustration</SelectItem>
                    <SelectItem value="3d">3D Render</SelectItem>
                    <SelectItem value="abstract">Abstract</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Aspect Ratio</label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1">Square (1:1)</SelectItem>
                    <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                    <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                    <SelectItem value="4:3">Standard (4:3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateImage} disabled={loading || !prompt} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Image className="w-4 h-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Demo uses sample images. Full version generates unique AI images.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Generated Image</label>
              <div className="aspect-square bg-muted/50 rounded-xl overflow-hidden flex items-center justify-center border border-border">
                {loading ? (
                  <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Creating your image...</p>
                  </div>
                ) : generatedImage ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={generatedImage}
                      alt="Generated AI image"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm" asChild>
                        <a href={generatedImage} download="ai-generated-image.jpg" target="_blank">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <Image className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Enter a description and generate your image
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIImageGeneratorTool;
