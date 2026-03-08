import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backendClient";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Globe, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const defaultSettings: Record<string, any> = {
  hero_title: "Grow Your Business with",
  hero_rotating_words: "Revenue,Leads,Growth,Impact",
  hero_subtitle: "We help businesses achieve digital excellence with data-driven marketing strategies.",
  hero_cta_primary: "Get Free Consultation",
  hero_cta_secondary: "View Our Work",
  company_name: "Digital Bull Technology",
  company_email: "info@dibull.com",
  company_phone: "+91 79846 02424",
  company_address: "Ahmedabad, Gujarat, India",
  company_whatsapp: "+917984602424",
  social_facebook: "",
  social_twitter: "",
  social_linkedin: "",
  social_instagram: "",
  social_youtube: "",
  footer_about: "Digital Bull Technology is a leading digital marketing agency in Ahmedabad, offering comprehensive online growth solutions.",
  footer_copyright: "© 2025 Digital Bull Technology. All rights reserved.",
  stats_clients: "500",
  stats_projects: "1200",
  stats_satisfaction: "98",
  stats_experience: "8",
};

const AdminSiteSettings = () => {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings);

  const { isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await backend.from("site_settings").select("*");
      if (error) throw error;
      if (data) {
        const mapped: Record<string, string> = { ...defaultSettings };
        data.forEach((row: any) => {
          mapped[row.setting_key] = typeof row.setting_value === "object" 
            ? JSON.stringify(row.setting_value) 
            : String(row.setting_value?.value || row.setting_value || "");
        });
        setSettings(mapped);
      }
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (entries: Record<string, string>) => {
      const promises = Object.entries(entries).map(([key, value]) => {
        const category = key.startsWith("hero_") ? "hero" 
          : key.startsWith("company_") ? "company"
          : key.startsWith("social_") ? "social"
          : key.startsWith("footer_") ? "footer"
          : key.startsWith("stats_") ? "stats"
          : "general";
        
        return backend.from("site_settings").upsert({
          setting_key: key,
          setting_value: { value },
          category,
          updated_at: new Date().toISOString(),
        }, { onConflict: "setting_key" });
      });
      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Settings saved successfully!");
    },
    onError: () => toast.error("Failed to save settings"),
  });

  const handleSave = () => saveMutation.mutate(settings);
  const update = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }));

  if (isLoading) return <AdminLayout><div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
          <p className="text-muted-foreground">Manage your website content dynamically</p>
        </div>
        <Button onClick={handleSave} disabled={saveMutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {saveMutation.isPending ? "Saving..." : "Save All Settings"}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Hero Title</Label>
                <Input value={settings.hero_title} onChange={e => update("hero_title", e.target.value)} />
              </div>
              <div>
                <Label>Rotating Words (comma-separated)</Label>
                <Input value={settings.hero_rotating_words} onChange={e => update("hero_rotating_words", e.target.value)} placeholder="Revenue,Leads,Growth" />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Textarea value={settings.hero_subtitle} onChange={e => update("hero_subtitle", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary CTA Text</Label>
                  <Input value={settings.hero_cta_primary} onChange={e => update("hero_cta_primary", e.target.value)} />
                </div>
                <div>
                  <Label>Secondary CTA Text</Label>
                  <Input value={settings.hero_cta_secondary} onChange={e => update("hero_cta_secondary", e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" />Company Info</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Company Name</Label><Input value={settings.company_name} onChange={e => update("company_name", e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="flex items-center gap-1"><Mail className="w-3 h-3" />Email</Label><Input value={settings.company_email} onChange={e => update("company_email", e.target.value)} /></div>
                <div><Label className="flex items-center gap-1"><Phone className="w-3 h-3" />Phone</Label><Input value={settings.company_phone} onChange={e => update("company_phone", e.target.value)} /></div>
              </div>
              <div><Label className="flex items-center gap-1"><MapPin className="w-3 h-3" />Address</Label><Input value={settings.company_address} onChange={e => update("company_address", e.target.value)} /></div>
              <div><Label>WhatsApp Number</Label><Input value={settings.company_whatsapp} onChange={e => update("company_whatsapp", e.target.value)} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader><CardTitle>Social Media Links</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "social_facebook", label: "Facebook", icon: Facebook },
                { key: "social_twitter", label: "Twitter / X", icon: Twitter },
                { key: "social_linkedin", label: "LinkedIn", icon: Linkedin },
                { key: "social_instagram", label: "Instagram", icon: Instagram },
                { key: "social_youtube", label: "YouTube", icon: Youtube },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key}>
                  <Label className="flex items-center gap-2"><Icon className="w-4 h-4" />{label}</Label>
                  <Input value={settings[key]} onChange={e => update(key, e.target.value)} placeholder={`https://${label.toLowerCase()}.com/...`} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <Card>
            <CardHeader><CardTitle>Footer</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>About Text</Label><Textarea value={settings.footer_about} onChange={e => update("footer_about", e.target.value)} rows={3} /></div>
              <div><Label>Copyright Text</Label><Input value={settings.footer_copyright} onChange={e => update("footer_copyright", e.target.value)} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader><CardTitle>Stats Section Numbers</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div><Label>Happy Clients</Label><Input type="number" value={settings.stats_clients} onChange={e => update("stats_clients", e.target.value)} /></div>
              <div><Label>Projects Completed</Label><Input type="number" value={settings.stats_projects} onChange={e => update("stats_projects", e.target.value)} /></div>
              <div><Label>Satisfaction Rate (%)</Label><Input type="number" value={settings.stats_satisfaction} onChange={e => update("stats_satisfaction", e.target.value)} /></div>
              <div><Label>Years Experience</Label><Input type="number" value={settings.stats_experience} onChange={e => update("stats_experience", e.target.value)} /></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSiteSettings;
