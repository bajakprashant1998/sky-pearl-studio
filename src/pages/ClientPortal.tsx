import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Briefcase, FileText, LogIn, CheckCircle2, Clock, DollarSign } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ClientPortal = () => {
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data: projectData, error } = await supabase
      .from("client_projects")
      .select("*")
      .eq("client_email", email)
      .order("created_at", { ascending: false });

    if (error || !projectData?.length) {
      toast.error("No projects found for this email. Please contact us.");
      setLoading(false);
      return;
    }

    setProjects(projectData);

    const projectIds = projectData.map((p: any) => p.id);
    const { data: invoiceData } = await supabase
      .from("client_invoices")
      .select("*")
      .in("project_id", projectIds)
      .order("created_at", { ascending: false });

    setInvoices(invoiceData || []);
    setVerified(true);
    setLoading(false);
  };

  const statusIcons: Record<string, React.ElementType> = {
    in_progress: Clock,
    review: FileText,
    completed: CheckCircle2,
    on_hold: Clock,
  };

  const statusColors: Record<string, string> = {
    in_progress: "bg-blue-100 text-blue-700",
    review: "bg-amber-100 text-amber-700",
    completed: "bg-green-100 text-green-700",
    on_hold: "bg-muted text-muted-foreground",
  };

  return (
    <>
      <Helmet>
        <title>Client Portal | Digital Bull Technology</title>
        <meta name="description" content="View your project progress, reports, and invoices in the client portal." />
      </Helmet>
      <Navbar />
      <div className="min-h-screen pt-20 bg-secondary/30">
        <div className="container px-4 py-16 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Client Portal</h1>
            <p className="text-muted-foreground">View your project progress, reports, and invoices</p>
          </div>

          {!verified ? (
            <div className="bg-card rounded-2xl border border-border p-8 max-w-md mx-auto">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <LogIn className="w-5 h-5 text-primary" /> Access Your Projects
              </h2>
              <form onSubmit={handleLookup} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Looking up..." : "View My Projects"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">Showing projects for: <span className="text-primary font-medium">{email}</span></p>

              {projects.map((project) => {
                const StatusIcon = statusIcons[project.status] || Clock;
                const projectInvoices = invoices.filter((i: any) => i.project_id === project.id);
                return (
                  <div key={project.id} className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{project.project_name}</h3>
                        <p className="text-sm text-muted-foreground">{project.client_name}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[project.status] || statusColors.on_hold}`}>
                        <StatusIcon className="w-3 h-3" />
                        {project.status.replace("_", " ")}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-bold text-foreground">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>

                    {/* Invoices */}
                    {projectInvoices.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-primary" /> Invoices
                        </h4>
                        <div className="space-y-2">
                          {projectInvoices.map((inv: any) => (
                            <div key={inv.id} className="flex items-center justify-between bg-muted/40 rounded-lg p-3">
                              <div>
                                <span className="text-sm font-medium text-foreground">{inv.invoice_number}</span>
                                <span className="text-xs text-muted-foreground ml-2">₹{Number(inv.amount).toLocaleString()}</span>
                              </div>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                              }`}>{inv.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <Button variant="outline" onClick={() => { setVerified(false); setProjects([]); setInvoices([]); }}>
                ← Back
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientPortal;
