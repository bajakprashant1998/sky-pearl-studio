import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backendClient";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, GraduationCap, ArrowUpDown, Eye, EyeOff, X } from "lucide-react";

interface ModuleTopic {
  title: string;
  description: string;
}

interface FutureScope {
  title: string;
  description: string;
  careers: string[];
  salaryRange: string;
  demandTrend: string;
  industryGrowth: string;
}

interface AcademyModuleRow {
  id: string;
  slug: string;
  title: string;
  short_title: string;
  icon_name: string;
  color: string;
  gradient: string;
  description: string;
  overview: string;
  duration: string;
  topics: ModuleTopic[];
  skills: string[];
  tools: string[];
  future_scope: FutureScope;
  project_work: string[];
  certification: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const ICON_OPTIONS = [
  "Globe", "Monitor", "Search", "FileText", "Share2", "Target",
  "MessageSquare", "BarChart3", "Shield", "Zap", "Code", "Palette",
  "Video", "Camera", "Mic", "Layers", "Database", "Brain"
];

const COLOR_PRESETS = [
  { label: "Blue", value: "from-blue-500 to-blue-600", gradient: "bg-gradient-to-r from-blue-500 to-blue-600" },
  { label: "Cyan/Teal", value: "from-cyan-500 to-teal-500", gradient: "bg-gradient-to-r from-cyan-500 to-teal-500" },
  { label: "Red/Rose", value: "from-red-500 to-rose-500", gradient: "bg-gradient-to-r from-red-500 to-rose-500" },
  { label: "Orange/Amber", value: "from-orange-500 to-amber-500", gradient: "bg-gradient-to-r from-orange-500 to-amber-500" },
  { label: "Pink/Rose", value: "from-pink-500 to-rose-500", gradient: "bg-gradient-to-r from-pink-500 to-rose-500" },
  { label: "Blue/Indigo", value: "from-blue-600 to-indigo-600", gradient: "bg-gradient-to-r from-blue-600 to-indigo-600" },
  { label: "Green/Emerald", value: "from-green-500 to-emerald-500", gradient: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { label: "Purple/Violet", value: "from-purple-500 to-violet-500", gradient: "bg-gradient-to-r from-purple-500 to-violet-500" },
  { label: "Amber/Yellow", value: "from-amber-500 to-yellow-500", gradient: "bg-gradient-to-r from-amber-500 to-yellow-500" },
];

const emptyModule: Omit<AcademyModuleRow, "id" | "created_at" | "updated_at"> = {
  slug: "",
  title: "",
  short_title: "",
  icon_name: "Globe",
  color: "from-blue-500 to-blue-600",
  gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
  description: "",
  overview: "",
  duration: "2 Weeks",
  topics: [],
  skills: [],
  tools: [],
  future_scope: { title: "", description: "", careers: [], salaryRange: "", demandTrend: "", industryGrowth: "" },
  project_work: [],
  certification: "",
  sort_order: 0,
  is_active: true,
};

const AdminAcademy = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<AcademyModuleRow | null>(null);
  const [form, setForm] = useState(emptyModule);
  
  // Temp inputs for array fields
  const [newSkill, setNewSkill] = useState("");
  const [newTool, setNewTool] = useState("");
  const [newProject, setNewProject] = useState("");
  const [newCareer, setNewCareer] = useState("");
  const [newTopic, setNewTopic] = useState<ModuleTopic>({ title: "", description: "" });

  const { data: modules = [], isLoading } = useQuery({
    queryKey: ["admin-academy-modules"],
    queryFn: async () => {
      const { data, error } = await backend
        .from("academy_modules")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data || []) as AcademyModuleRow[];
    },
  });

  const upsertMutation = useMutation({
    mutationFn: async (mod: typeof form & { id?: string }) => {
      if (mod.id) {
        const { error } = await backend.from("academy_modules").update(mod).eq("id", mod.id);
        if (error) throw error;
      } else {
        const { error } = await backend.from("academy_modules").insert(mod);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-academy-modules"] });
      toast.success(editingModule ? "Module updated" : "Module created");
      resetForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await backend.from("academy_modules").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-academy-modules"] });
      toast.success("Module deleted");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await backend.from("academy_modules").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-academy-modules"] }),
    onError: (e: any) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm(emptyModule);
    setEditingModule(null);
    setDialogOpen(false);
    setNewSkill("");
    setNewTool("");
    setNewProject("");
    setNewCareer("");
    setNewTopic({ title: "", description: "" });
  };

  const openEdit = (mod: AcademyModuleRow) => {
    setEditingModule(mod);
    setForm({
      slug: mod.slug,
      title: mod.title,
      short_title: mod.short_title,
      icon_name: mod.icon_name,
      color: mod.color,
      gradient: mod.gradient,
      description: mod.description,
      overview: mod.overview,
      duration: mod.duration,
      topics: mod.topics || [],
      skills: mod.skills || [],
      tools: mod.tools || [],
      future_scope: mod.future_scope || emptyModule.future_scope,
      project_work: mod.project_work || [],
      certification: mod.certification,
      sort_order: mod.sort_order,
      is_active: mod.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.slug || !form.description) {
      toast.error("Title, slug, and description are required");
      return;
    }
    upsertMutation.mutate(editingModule ? { ...form, id: editingModule.id } : form);
  };

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const addToArray = (
    key: "skills" | "tools" | "project_work",
    value: string,
    setter: (v: string) => void
  ) => {
    if (!value.trim()) return;
    setForm((p) => ({ ...p, [key]: [...p[key], value.trim()] }));
    setter("");
  };

  const removeFromArray = (key: "skills" | "tools" | "project_work", index: number) => {
    setForm((p) => ({ ...p, [key]: p[key].filter((_, i) => i !== index) }));
  };

  const addTopic = () => {
    if (!newTopic.title.trim()) return;
    setForm((p) => ({ ...p, topics: [...p.topics, { ...newTopic }] }));
    setNewTopic({ title: "", description: "" });
  };

  const removeTopic = (index: number) => {
    setForm((p) => ({ ...p, topics: p.topics.filter((_, i) => i !== index) }));
  };

  const addCareer = () => {
    if (!newCareer.trim()) return;
    setForm((p) => ({
      ...p,
      future_scope: { ...p.future_scope, careers: [...p.future_scope.careers, newCareer.trim()] },
    }));
    setNewCareer("");
  };

  const removeCareer = (index: number) => {
    setForm((p) => ({
      ...p,
      future_scope: { ...p.future_scope, careers: p.future_scope.careers.filter((_, i) => i !== index) },
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-primary" />
              Academy Content Manager
            </h1>
            <p className="text-muted-foreground mt-1">Manage course modules, syllabus, and training details</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(o) => { if (!o) resetForm(); else setDialogOpen(true); }}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" /> Add Module
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingModule ? "Edit Module" : "Add New Module"}</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="basic" className="mt-4">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="topics">Topics</TabsTrigger>
                  <TabsTrigger value="skills">Skills & Tools</TabsTrigger>
                  <TabsTrigger value="career">Career & Projects</TabsTrigger>
                </TabsList>

                {/* Basic Info */}
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title *</Label>
                      <Input
                        value={form.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setForm((p) => ({
                            ...p,
                            title,
                            slug: editingModule ? p.slug : autoSlug(title),
                          }));
                        }}
                        placeholder="Digital Marketing Fundamentals"
                      />
                    </div>
                    <div>
                      <Label>Slug *</Label>
                      <Input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} placeholder="digital-marketing-fundamentals" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Short Title</Label>
                      <Input value={form.short_title} onChange={(e) => setForm((p) => ({ ...p, short_title: e.target.value }))} placeholder="DM Fundamentals" />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} placeholder="2 Weeks" />
                    </div>
                  </div>
                  <div>
                    <Label>Description *</Label>
                    <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} />
                  </div>
                  <div>
                    <Label>Overview</Label>
                    <Textarea value={form.overview} onChange={(e) => setForm((p) => ({ ...p, overview: e.target.value }))} rows={3} />
                  </div>
                  <div>
                    <Label>Certification Name</Label>
                    <Input value={form.certification} onChange={(e) => setForm((p) => ({ ...p, certification: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Icon</Label>
                      <select
                        className="w-full border border-input rounded-md px-3 py-2 bg-background text-sm"
                        value={form.icon_name}
                        onChange={(e) => setForm((p) => ({ ...p, icon_name: e.target.value }))}
                      >
                        {ICON_OPTIONS.map((i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Color Theme</Label>
                      <select
                        className="w-full border border-input rounded-md px-3 py-2 bg-background text-sm"
                        value={form.color}
                        onChange={(e) => {
                          const preset = COLOR_PRESETS.find((c) => c.value === e.target.value);
                          setForm((p) => ({
                            ...p,
                            color: e.target.value,
                            gradient: preset?.gradient || `bg-gradient-to-r ${e.target.value}`,
                          }));
                        }}
                      >
                        {COLOR_PRESETS.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Sort Order</Label>
                      <Input type="number" value={form.sort_order} onChange={(e) => setForm((p) => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <Switch checked={form.is_active} onCheckedChange={(v) => setForm((p) => ({ ...p, is_active: v }))} />
                      <Label>Active</Label>
                    </div>
                  </div>
                </TabsContent>

                {/* Topics */}
                <TabsContent value="topics" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <Label>Add Topic</Label>
                    <Input placeholder="Topic title" value={newTopic.title} onChange={(e) => setNewTopic((p) => ({ ...p, title: e.target.value }))} />
                    <Textarea placeholder="Topic description" value={newTopic.description} onChange={(e) => setNewTopic((p) => ({ ...p, description: e.target.value }))} rows={2} />
                    <Button type="button" variant="secondary" size="sm" onClick={addTopic}>
                      <Plus className="w-3 h-3 mr-1" /> Add Topic
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {form.topics.map((t, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">{t.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeTopic(i)}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    {form.topics.length === 0 && <p className="text-sm text-muted-foreground">No topics added yet</p>}
                  </div>
                </TabsContent>

                {/* Skills & Tools */}
                <TabsContent value="skills" className="space-y-6 mt-4">
                  {/* Skills */}
                  <div className="space-y-3">
                    <Label>Skills</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Add a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToArray("skills", newSkill, setNewSkill))} />
                      <Button type="button" variant="secondary" size="sm" onClick={() => addToArray("skills", newSkill, setNewSkill)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {form.skills.map((s, i) => (
                        <Badge key={i} variant="secondary" className="gap-1">
                          {s}
                          <button onClick={() => removeFromArray("skills", i)}><X className="w-3 h-3" /></button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {/* Tools */}
                  <div className="space-y-3">
                    <Label>Tools</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Add a tool" value={newTool} onChange={(e) => setNewTool(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToArray("tools", newTool, setNewTool))} />
                      <Button type="button" variant="secondary" size="sm" onClick={() => addToArray("tools", newTool, setNewTool)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {form.tools.map((t, i) => (
                        <Badge key={i} variant="outline" className="gap-1">
                          {t}
                          <button onClick={() => removeFromArray("tools", i)}><X className="w-3 h-3" /></button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Career & Projects */}
                <TabsContent value="career" className="space-y-6 mt-4">
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Future Scope</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Section Title</Label>
                        <Input value={form.future_scope.title} onChange={(e) => setForm((p) => ({ ...p, future_scope: { ...p.future_scope, title: e.target.value } }))} />
                      </div>
                      <div>
                        <Label>Salary Range</Label>
                        <Input value={form.future_scope.salaryRange} onChange={(e) => setForm((p) => ({ ...p, future_scope: { ...p.future_scope, salaryRange: e.target.value } }))} placeholder="₹4-15 LPA" />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={form.future_scope.description} onChange={(e) => setForm((p) => ({ ...p, future_scope: { ...p.future_scope, description: e.target.value } }))} rows={2} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Demand Trend</Label>
                        <Input value={form.future_scope.demandTrend} onChange={(e) => setForm((p) => ({ ...p, future_scope: { ...p.future_scope, demandTrend: e.target.value } }))} />
                      </div>
                      <div>
                        <Label>Industry Growth</Label>
                        <Input value={form.future_scope.industryGrowth} onChange={(e) => setForm((p) => ({ ...p, future_scope: { ...p.future_scope, industryGrowth: e.target.value } }))} />
                      </div>
                    </div>
                    {/* Careers */}
                    <div>
                      <Label>Career Paths</Label>
                      <div className="flex gap-2">
                        <Input placeholder="Add career" value={newCareer} onChange={(e) => setNewCareer(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCareer())} />
                        <Button type="button" variant="secondary" size="sm" onClick={addCareer}>
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.future_scope.careers.map((c, i) => (
                          <Badge key={i} variant="secondary" className="gap-1">
                            {c}
                            <button onClick={() => removeCareer(i)}><X className="w-3 h-3" /></button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Work */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Project Work</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Add project" value={newProject} onChange={(e) => setNewProject(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToArray("project_work", newProject, setNewProject))} />
                      <Button type="button" variant="secondary" size="sm" onClick={() => addToArray("project_work", newProject, setNewProject)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {form.project_work.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                          <span className="flex-1 text-sm">{p}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeFromArray("project_work", i)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
                <Button onClick={handleSave} disabled={upsertMutation.isPending}>
                  {upsertMutation.isPending ? "Saving..." : editingModule ? "Update Module" : "Create Module"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Module List */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading modules...</div>
        ) : modules.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No modules yet</h3>
              <p className="text-muted-foreground mb-4">Create your first academy module to get started</p>
              <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" /> Add Module
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {modules.map((mod) => (
              <Card key={mod.id} className={`border-border/50 ${!mod.is_active ? "opacity-60" : ""}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${mod.gradient} flex items-center justify-center shrink-0`}>
                    <span className="text-white font-bold text-sm">{mod.sort_order}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{mod.title}</h3>
                      {!mod.is_active && <Badge variant="outline" className="text-xs">Inactive</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{mod.description}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{mod.duration}</span>
                      <span>·</span>
                      <span>{mod.topics?.length || 0} topics</span>
                      <span>·</span>
                      <span>{mod.skills?.length || 0} skills</span>
                      <span>·</span>
                      <span>{mod.tools?.length || 0} tools</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActiveMutation.mutate({ id: mod.id, is_active: !mod.is_active })}
                      title={mod.is_active ? "Deactivate" : "Activate"}
                    >
                      {mod.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openEdit(mod)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        if (confirm("Delete this module?")) deleteMutation.mutate(mod.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAcademy;
