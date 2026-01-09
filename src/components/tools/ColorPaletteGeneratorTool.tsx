import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Copy, CheckCircle2, RefreshCw, Lock, Unlock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
  locked: boolean;
}

const ColorPaletteGeneratorTool = () => {
  const [colors, setColors] = useState<ColorInfo[]>([]);
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const createColorInfo = (hex: string, locked = false): ColorInfo => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return {
      hex: hex.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      locked
    };
  };

  const generatePalette = () => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    const newColors: ColorInfo[] = colors.map((c, i) => {
      if (c.locked) return c;
      return createColorInfo(generateRandomColor());
    });

    if (newColors.length === 0) {
      // Generate initial 5 colors based on color theory
      const complementary = hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
      const analogous1 = hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l);
      const analogous2 = hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);
      const triadic = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);

      setColors([
        createColorInfo(baseColor),
        createColorInfo(analogous1),
        createColorInfo(complementary),
        createColorInfo(analogous2),
        createColorInfo(triadic)
      ]);
    } else {
      setColors(newColors);
    }
  };

  const generateHarmony = (type: 'complementary' | 'analogous' | 'triadic' | 'split') => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    let newColors: ColorInfo[] = [];

    switch (type) {
      case 'complementary':
        newColors = [
          createColorInfo(baseColor),
          createColorInfo(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 20, 90))),
          createColorInfo(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)),
          createColorInfo(hslToHex((hsl.h + 180) % 360, hsl.s, Math.min(hsl.l + 20, 90))),
          createColorInfo(hslToHex(hsl.h, Math.max(hsl.s - 30, 10), hsl.l))
        ];
        break;
      case 'analogous':
        newColors = [
          createColorInfo(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l)),
          createColorInfo(hslToHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l)),
          createColorInfo(baseColor),
          createColorInfo(hslToHex((hsl.h + 15) % 360, hsl.s, hsl.l)),
          createColorInfo(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l))
        ];
        break;
      case 'triadic':
        newColors = [
          createColorInfo(baseColor),
          createColorInfo(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 85))),
          createColorInfo(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l)),
          createColorInfo(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)),
          createColorInfo(hslToHex(hsl.h, Math.max(hsl.s - 20, 20), Math.min(hsl.l + 30, 95)))
        ];
        break;
      case 'split':
        newColors = [
          createColorInfo(baseColor),
          createColorInfo(hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l)),
          createColorInfo(hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l)),
          createColorInfo(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 20, 90))),
          createColorInfo(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 10)))
        ];
        break;
    }

    setColors(newColors);
  };

  const toggleLock = (index: number) => {
    const newColors = [...colors];
    newColors[index].locked = !newColors[index].locked;
    setColors(newColors);
  };

  const copyColor = (format: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    toast({
      title: "Copied!",
      description: `${format}: ${value}`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const exportPalette = (format: 'css' | 'scss' | 'tailwind') => {
    let content = '';
    
    switch (format) {
      case 'css':
        content = ':root {\n';
        colors.forEach((c, i) => {
          content += `  --color-${i + 1}: ${c.hex};\n`;
        });
        content += '}';
        break;
      case 'scss':
        colors.forEach((c, i) => {
          content += `$color-${i + 1}: ${c.hex};\n`;
        });
        break;
      case 'tailwind':
        content = 'colors: {\n';
        colors.forEach((c, i) => {
          content += `  'palette-${i + 1}': '${c.hex}',\n`;
        });
        content += '}';
        break;
    }

    navigator.clipboard.writeText(content);
    toast({
      title: "Exported!",
      description: `Palette exported as ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-rose-500" />
            Color Palette Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2">Base Color</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-14 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-28"
                  placeholder="#000000"
                />
              </div>
            </div>
            <Button onClick={generatePalette}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => generateHarmony('complementary')}>
              Complementary
            </Button>
            <Button variant="outline" size="sm" onClick={() => generateHarmony('analogous')}>
              Analogous
            </Button>
            <Button variant="outline" size="sm" onClick={() => generateHarmony('triadic')}>
              Triadic
            </Button>
            <Button variant="outline" size="sm" onClick={() => generateHarmony('split')}>
              Split-Complementary
            </Button>
          </div>
        </CardContent>
      </Card>

      {colors.length > 0 && (
        <>
          {/* Color Palette Display */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-32 rounded-xl overflow-hidden shadow-lg mb-6">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 relative group cursor-pointer transition-all hover:flex-[1.5]"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyColor('HEX', color.hex)}
                  >
                    <button
                      className="absolute top-2 right-2 p-1 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLock(index);
                      }}
                    >
                      {color.locked ? (
                        <Lock className="w-4 h-4 text-white" />
                      ) : (
                        <Unlock className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-mono bg-black/30 px-2 py-1 rounded text-center">
                        {color.hex}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Color Details */}
              <div className="grid md:grid-cols-5 gap-4">
                {colors.map((color, index) => (
                  <div key={index} className="space-y-2">
                    <div
                      className="w-full h-16 rounded-lg shadow-md"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="space-y-1">
                      <button
                        className="flex items-center justify-between w-full text-xs p-1 hover:bg-muted rounded"
                        onClick={() => copyColor('HEX', color.hex)}
                      >
                        <span className="font-mono">{color.hex}</span>
                        {copied === color.hex ? (
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-muted-foreground" />
                        )}
                      </button>
                      <button
                        className="flex items-center justify-between w-full text-xs p-1 hover:bg-muted rounded"
                        onClick={() => copyColor('RGB', color.rgb)}
                      >
                        <span className="font-mono text-[10px]">{color.rgb}</span>
                        {copied === color.rgb ? (
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => exportPalette('css')}>
                  <Copy className="w-4 h-4 mr-2" />
                  CSS Variables
                </Button>
                <Button variant="outline" onClick={() => exportPalette('scss')}>
                  <Copy className="w-4 h-4 mr-2" />
                  SCSS Variables
                </Button>
                <Button variant="outline" onClick={() => exportPalette('tailwind')}>
                  <Copy className="w-4 h-4 mr-2" />
                  Tailwind Config
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {colors.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select a base color and click "Generate" to create your palette</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ColorPaletteGeneratorTool;
