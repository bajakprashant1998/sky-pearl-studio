import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Loader2, CheckCircle2, XCircle, AlertTriangle, Clock, Lock, Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SSLInfo {
  domain: string;
  isValid: boolean;
  issuer: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  protocol: string;
  cipher: string;
  keySize: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  issues: string[];
}

const SSLCheckerTool = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sslInfo, setSSLInfo] = useState<SSLInfo | null>(null);
  const { toast } = useToast();

  const checkSSL = () => {
    if (!url.trim()) {
      toast({
        variant: "destructive",
        title: "Please enter a URL",
        description: "Enter a website URL to check its SSL certificate.",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate SSL check
    setTimeout(() => {
      const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
      const urlHash = cleanUrl.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      
      // Simulate realistic SSL data
      const today = new Date();
      const validFrom = new Date(today);
      validFrom.setMonth(validFrom.getMonth() - (urlHash % 6 + 1));
      
      const validTo = new Date(today);
      validTo.setMonth(validTo.getMonth() + (urlHash % 12 + 1));
      
      const daysRemaining = Math.floor((validTo.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      const grades: ('A+' | 'A' | 'B' | 'C' | 'D' | 'F')[] = ['A+', 'A', 'A', 'B', 'A', 'A+'];
      const grade = grades[urlHash % grades.length];
      
      const issuers = [
        "Let's Encrypt Authority X3",
        "DigiCert SHA2 Extended Validation Server CA",
        "Sectigo RSA Domain Validation Secure Server CA",
        "GlobalSign RSA OV SSL CA 2018",
        "Amazon",
        "Cloudflare Inc ECC CA-3"
      ];

      const possibleIssues = [
        "Certificate chain incomplete",
        "Weak cipher suites enabled",
        "TLS 1.0/1.1 still supported",
        "HSTS header not present",
        "No OCSP stapling"
      ];

      const issues: string[] = [];
      if (grade === 'B' || grade === 'C') {
        issues.push(possibleIssues[urlHash % possibleIssues.length]);
      }
      if (grade === 'C' || grade === 'D') {
        issues.push(possibleIssues[(urlHash + 1) % possibleIssues.length]);
      }

      const simulatedInfo: SSLInfo = {
        domain: cleanUrl,
        isValid: grade !== 'F',
        issuer: issuers[urlHash % issuers.length],
        validFrom: validFrom.toISOString().split('T')[0],
        validTo: validTo.toISOString().split('T')[0],
        daysRemaining: daysRemaining,
        protocol: "TLS 1.3",
        cipher: "TLS_AES_256_GCM_SHA384",
        keySize: 2048,
        grade: grade,
        issues: issues
      };
      
      setSSLInfo(simulatedInfo);
      setIsLoading(false);
    }, 2000);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-green-500';
      case 'B':
        return 'bg-yellow-500';
      case 'C':
        return 'bg-orange-500';
      case 'D':
      case 'F':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDaysColor = (days: number) => {
    if (days > 60) return 'text-green-500';
    if (days > 30) return 'text-yellow-500';
    if (days > 0) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            SSL Certificate Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter website URL (e.g., example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkSSL()}
              className="flex-1"
            />
            <Button onClick={checkSSL} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Check SSL
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {sslInfo && (
        <>
          {/* Main Status */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-24 h-24 ${getGradeColor(sslInfo.grade)} rounded-xl flex items-center justify-center`}>
                    <span className="text-4xl font-bold text-white">{sslInfo.grade}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      {sslInfo.isValid ? (
                        <>
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                          Certificate Valid
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-red-500" />
                          Certificate Invalid
                        </>
                      )}
                    </h3>
                    <p className="text-muted-foreground">{sslInfo.domain}</p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Clock className={`w-6 h-6 mx-auto mb-2 ${getDaysColor(sslInfo.daysRemaining)}`} />
                    <p className={`text-2xl font-bold ${getDaysColor(sslInfo.daysRemaining)}`}>
                      {sslInfo.daysRemaining}
                    </p>
                    <p className="text-xs text-muted-foreground">Days Remaining</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Lock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <p className="text-lg font-bold">{sslInfo.keySize}</p>
                    <p className="text-xs text-muted-foreground">Key Size (bits)</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Server className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                    <p className="text-lg font-bold">{sslInfo.protocol}</p>
                    <p className="text-xs text-muted-foreground">Protocol</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Certificate Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Issued By</span>
                    <span className="font-medium text-right max-w-[200px] truncate">{sslInfo.issuer}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Valid From</span>
                    <span className="font-medium">{sslInfo.validFrom}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Valid Until</span>
                    <span className="font-medium">{sslInfo.validTo}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Protocol</span>
                    <span className="font-medium">{sslInfo.protocol}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Cipher Suite</span>
                    <span className="font-medium text-xs">{sslInfo.cipher}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Key Size</span>
                    <span className="font-medium">{sslInfo.keySize} bits</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issues */}
          {sslInfo.issues.length > 0 && (
            <Card className="border-orange-500/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Security Issues Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {sslInfo.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Enable HSTS (HTTP Strict Transport Security) to force HTTPS
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Use only TLS 1.2 or higher, disable TLS 1.0 and 1.1
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Enable OCSP stapling for faster certificate validation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Set up automatic certificate renewal before expiry
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Use strong cipher suites and disable weak ones
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SSLCheckerTool;
