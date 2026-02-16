import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Lightbulb,
  BookOpen,
  MessageCircleQuestion,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection, { FloatingElement } from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { getStageBySlug, growthStages } from "@/data/growthStagesData";

const GrowthStageDetailPage = () => {
  const { stageSlug } = useParams();
  const stage = getStageBySlug(stageSlug || "");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!stage) return <NotFound />;

  const prevStage = growthStages.find((s) => s.number === stage.number - 1);
  const nextStage = growthStages.find((s) => s.number === stage.number + 1);

  return (
    <>
      <Helmet>
        <title>{`Stage ${stage.number}: ${stage.name} | Growth Strategy | Digital Bull`}</title>
        <meta name="description" content={stage.objective} />
        <link rel="canonical" href={`https://dibull.com/growth-strategy/${stage.slug}`} />
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-primary py-24 lg:py-36">
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
          <FloatingElement className="absolute top-10 left-[10%]" duration={6}>
            <div className="w-72 h-72 rounded-full bg-cyan-400/15 blur-3xl" />
          </FloatingElement>

          <div className="container mx-auto px-4 relative z-10">
            <Link to="/growth-strategy" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Growth Strategy
            </Link>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stage.accent} flex items-center justify-center shadow-lg`}>
                  <stage.icon className="w-8 h-8 text-white" />
                </div>
                <Badge className="bg-white/10 text-white border-white/20 text-sm">Stage {stage.number} of 5</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">{stage.name}</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">{stage.objective}</p>
            </motion.div>
          </div>
        </section>

        {/* ═══ DETAILED OVERVIEW ═══ */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection direction="up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">What Is This Stage About?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{stage.detailedDescription}</p>
            </AnimatedSection>

            {/* Analogy box */}
            <AnimatedSection direction="up" delay={0.1}>
              <div className={`${stage.accentBg} border border-border rounded-2xl p-8 mb-8`}>
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-7 h-7 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-2">Simple Analogy</h3>
                    <p className="text-muted-foreground leading-relaxed">{stage.analogy}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Why it matters */}
            <AnimatedSection direction="up" delay={0.15}>
              <div className="bg-muted/50 border border-border rounded-2xl p-8">
                <h3 className="font-bold text-foreground text-lg mb-2">Why This Matters</h3>
                <p className="text-muted-foreground leading-relaxed">{stage.whyItMatters}</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══ STEP-BY-STEP PROCESS ═══ */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection direction="up">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-widest">How It Works</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Step-by-Step Process</h2>
            </AnimatedSection>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20" />
              {stage.steps.map((step, i) => (
                <AnimatedSection key={step.title} direction="up" delay={i * 0.1}>
                  <div className="relative pl-16 mb-10 last:mb-0">
                    <div className={`absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br ${stage.accent} flex items-center justify-center text-white font-bold shadow-md`}>
                      {i + 1}
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ REAL EXAMPLES ═══ */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <AnimatedSection direction="up" className="text-center mb-14">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-widest">Real Results</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Real-World Examples</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">See how businesses like yours used this stage to grow.</p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {stage.examples.map((ex, i) => (
                <AnimatedSection key={ex.business} direction="up" delay={i * 0.1}>
                  <motion.div className="bg-card border border-border rounded-2xl p-7 h-full flex flex-col" whileHover={{ y: -4 }}>
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-foreground">{ex.business}</h3>
                    </div>
                    <div className="space-y-4 flex-1">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">The Challenge</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{ex.scenario}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">The Result</p>
                        <p className="text-sm text-foreground font-medium leading-relaxed">{ex.result}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SERVICES & OUTCOMES ═══ */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Services */}
              <AnimatedSection direction="left">
                <h2 className="text-2xl font-bold text-foreground mb-6">Services in This Stage</h2>
                <div className="space-y-3">
                  {stage.services.map((svc) => (
                    <Link
                      key={svc.slug}
                      to={`/services/${svc.slug}`}
                      className="flex items-center justify-between bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                      <span className="font-medium text-foreground">{svc.name}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </AnimatedSection>

              {/* Outcomes */}
              <AnimatedSection direction="right">
                <h2 className="text-2xl font-bold text-foreground mb-6">What You'll Achieve</h2>
                <div className="space-y-4">
                  {stage.outcomes.map((o) => (
                    <div key={o} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{o}</span>
                    </div>
                  ))}
                </div>
                {/* Emotional line */}
                <div className={`${stage.accentBg} rounded-xl p-5 mt-8`}>
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-foreground font-semibold italic">{stage.emotionalLine}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ═══ FAQs ═══ */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <AnimatedSection direction="up" className="text-center mb-12">
              <MessageCircleQuestion className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground">Common Questions About This Stage</h2>
            </AnimatedSection>

            <div className="space-y-3">
              {stage.faqs.map((faq, i) => (
                <AnimatedSection key={i} direction="up" delay={i * 0.05}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground pr-4">{faq.q}</h3>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </div>
                    {openFaq === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </button>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ NAVIGATION ═══ */}
        <section className="py-16 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevStage ? (
                <Link to={`/growth-strategy/${prevStage.slug}`}>
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Stage {prevStage.number}: {prevStage.name}
                  </Button>
                </Link>
              ) : (
                <Link to="/growth-strategy">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Overview
                  </Button>
                </Link>
              )}
              {nextStage ? (
                <Link to={`/growth-strategy/${nextStage.slug}`}>
                  <Button variant="hero" className="gap-2">
                    Stage {nextStage.number}: {nextStage.name} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link to="/contact">
                  <Button variant="hero" className="gap-2">
                    Start Your Growth Journey <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <AnimatedSection direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-5">Ready to Implement Stage {stage.number}?</h2>
              <p className="text-blue-100 text-lg mb-8">Let's discuss how {stage.name} can transform your business. Get a free consultation.</p>
              <Link to="/contact">
                <Button variant="heroOutline" size="lg" className="gap-2 border-white/30 text-white hover:bg-white hover:text-blue-900">
                  Get Free Consultation <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default GrowthStageDetailPage;
