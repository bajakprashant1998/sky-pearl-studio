import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Copy, Check } from "lucide-react";

type SchemaType = "organization" | "article" | "product" | "faq" | "local-business";

const SchemaMarkupGeneratorTool = () => {
  const [schemaType, setSchemaType] = useState<SchemaType>("organization");
  const [copied, setCopied] = useState(false);

  // Organization fields
  const [orgName, setOrgName] = useState("");
  const [orgUrl, setOrgUrl] = useState("");
  const [orgLogo, setOrgLogo] = useState("");

  // Article fields
  const [articleTitle, setArticleTitle] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");
  const [articleDate, setArticleDate] = useState("");

  // Product fields
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // FAQ fields
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  // Local Business fields
  const [bizName, setBizName] = useState("");
  const [bizAddress, setBizAddress] = useState("");
  const [bizPhone, setBizPhone] = useState("");

  const generateSchema = (): string => {
    switch (schemaType) {
      case "organization":
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": orgName || "Your Organization Name",
          "url": orgUrl || "https://example.com",
          "logo": orgLogo || "https://example.com/logo.png"
        }, null, 2);

      case "article":
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": articleTitle || "Article Title",
          "author": {
            "@type": "Person",
            "name": articleAuthor || "Author Name"
          },
          "datePublished": articleDate || new Date().toISOString().split('T')[0]
        }, null, 2);

      case "product":
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productName || "Product Name",
          "description": productDescription || "Product description",
          "offers": {
            "@type": "Offer",
            "price": productPrice || "99.99",
            "priceCurrency": "INR"
          }
        }, null, 2);

      case "faq":
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [{
            "@type": "Question",
            "name": faqQuestion || "What is your question?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faqAnswer || "This is the answer to your question."
            }
          }]
        }, null, 2);

      case "local-business":
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": bizName || "Business Name",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": bizAddress || "123 Main St"
          },
          "telephone": bizPhone || "+91 1234567890"
        }, null, 2);

      default:
        return "{}";
    }
  };

  const copyToClipboard = () => {
    const script = `<script type="application/ld+json">\n${generateSchema()}\n</script>`;
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderFields = () => {
    switch (schemaType) {
      case "organization":
        return (
          <>
            <Input placeholder="Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
            <Input placeholder="Website URL" value={orgUrl} onChange={(e) => setOrgUrl(e.target.value)} />
            <Input placeholder="Logo URL" value={orgLogo} onChange={(e) => setOrgLogo(e.target.value)} />
          </>
        );
      case "article":
        return (
          <>
            <Input placeholder="Article Title" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} />
            <Input placeholder="Author Name" value={articleAuthor} onChange={(e) => setArticleAuthor(e.target.value)} />
            <Input type="date" placeholder="Publish Date" value={articleDate} onChange={(e) => setArticleDate(e.target.value)} />
          </>
        );
      case "product":
        return (
          <>
            <Input placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <Input placeholder="Price (INR)" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            <Textarea placeholder="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} rows={3} />
          </>
        );
      case "faq":
        return (
          <>
            <Input placeholder="Question" value={faqQuestion} onChange={(e) => setFaqQuestion(e.target.value)} />
            <Textarea placeholder="Answer" value={faqAnswer} onChange={(e) => setFaqAnswer(e.target.value)} rows={3} />
          </>
        );
      case "local-business":
        return (
          <>
            <Input placeholder="Business Name" value={bizName} onChange={(e) => setBizName(e.target.value)} />
            <Input placeholder="Address" value={bizAddress} onChange={(e) => setBizAddress(e.target.value)} />
            <Input placeholder="Phone Number" value={bizPhone} onChange={(e) => setBizPhone(e.target.value)} />
          </>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Schema Markup Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Schema Type</label>
                <Select value={schemaType} onValueChange={(v) => setSchemaType(v as SchemaType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organization">Organization</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="local-business">Local Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderFields()}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Generated Schema</label>
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
                value={`<script type="application/ld+json">\n${generateSchema()}\n</script>`}
                readOnly
                className="font-mono text-xs min-h-[300px]"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Add this code to the &lt;head&gt; section of your HTML.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemaMarkupGeneratorTool;
