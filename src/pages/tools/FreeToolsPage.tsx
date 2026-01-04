import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { freeToolsData } from "@/data/freeToolsData";

const FreeToolsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Free Marketing Tools | SEO Checker, AI Content Generator & More | Digital Bull</title>
        <meta
          name="description"
          content="Access 10+ free marketing tools including SEO checker, website speed test, AI content generator, keyword research tool, and more. Boost your digital marketing for free."
        />
        <meta
          name="keywords"
          content="free SEO tools, free marketing tools, SEO checker, speed test, AI content generator, keyword research, backlink checker, meta tag generator"
        />
        <link rel="canonical" href="https://dibull.com/free-tools" />
        <meta property="og:title" content="Free Marketing Tools | Digital Bull Technology" />
        <meta property="og:description" content="Access 10+ free marketing tools to boost your digital presence. SEO checker, AI generators, and more." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                100% Free - No Signup Required
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Free <span className="text-gradient">Marketing Tools</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful tools to analyze, optimize, and grow your online presence. Used by thousands of marketers worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {freeToolsData.map((tool) => (
                <motion.div
                  key={tool.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link to={`/free-tools/${tool.slug}`}>
                    <div className="h-full bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <tool.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {tool.shortDescription}
                      </p>
                      <div className="flex items-center text-primary text-sm font-medium">
                        Use Tool Free
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need More Advanced Solutions?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Our free tools are great for getting started. For enterprise-grade solutions with advanced features, talk to our experts.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  Get Custom Solutions <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FreeToolsPage;
