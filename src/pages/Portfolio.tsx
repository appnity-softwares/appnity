import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Smartphone, Newspaper, Globe, ShoppingBag, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SEO } from "@/components/site/SEO";
import { publicApi } from "@/services/api";

const iconMap: any = {
  "Mobile Application": Smartphone,
  "News Portal": Newspaper,
  "Personal Brand": Globe,
  "Premium Showcase": ShoppingBag,
};

const colorMap: any = {
  "Mobile Application": "bg-rose-50 text-rose-600",
  "News Portal": "bg-blue-50 text-blue-600",
  "Personal Brand": "bg-slate-50 text-slate-700",
  "Premium Showcase": "bg-amber-50 text-amber-700",
};

const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await publicApi.getPortfolios();
        setProjects(data || []);
      } catch (error) {
        console.error("Failed to fetch portfolios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const industries = ["All", ...new Set(projects.map(p => p.industry))];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.industry === activeFilter);

  return (
    <SiteLayout>
      <SEO 
        title="Portfolio · Selected Works" 
        description="Explore Appnity Softwares' portfolio of engineering-grade platforms, from matrimonial apps to high-traffic news portals."
      />
      <PageHeader
        eyebrow="Selected Works"
        title={
          <>
            <span className="text-foreground">Proven systems,</span>
            <br />
            <span className="text-brand-gradient">shipped with precision.</span>
          </>
        }
        description="Every deployment here is a benchmark in speed, security, and absolute precision. Explore our live systems."
      />

      <section className="pb-32">
        <div className="container-tight">
          {/* Filters */}
          {!loading && (
            <div className="mb-16 flex flex-wrap items-center gap-3 justify-center md:justify-start">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveFilter(ind)}
                  className={`rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeFilter === ind 
                      ? "bg-primary text-primary-foreground shadow-glow" 
                      : "bg-surface-2 text-muted-foreground hover:bg-surface-3"
                  }`}
                >
                  {ind === "All" ? "All Systems" : ind}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <motion.div 
              layout
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, i) => {
                  const Icon = iconMap[p.category] || Globe;
                  const colors = colorMap[p.category] || "bg-zinc-50 text-zinc-600";
                  
                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <div className="group relative flex flex-col h-full rounded-2xl border border-border-strong dark:border-white/5 bg-white/70 dark:bg-zinc-900/30 backdrop-blur-sm p-6 lg:p-8 transition-all hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-elevated dark:hover:bg-zinc-900/50 overflow-hidden">
                        <div className="flex items-start justify-between mb-6">
                          <div className={`p-3 rounded-xl ${colors} dark:bg-opacity-10 dark:text-opacity-90 border border-black/5 dark:border-white/5`}>
                            <Icon size={24} strokeWidth={2} />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40 dark:text-muted-foreground/30 bg-surface-2 dark:bg-white/5 px-3 py-1 rounded border border-border-strong/40 dark:border-white/5">
                              {p.stack}
                            </span>
                            <a
                              href={p.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm transition-all hover:bg-primary hover:text-white"
                            >
                              <ArrowUpRight size={16} />
                            </a>
                          </div>
                        </div>

                        <div className="flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-1 block">
                            {p.category}
                          </span>
                          <h3 className="text-2xl font-bold tracking-tight text-foreground dark:text-zinc-200 group-hover:text-primary transition-colors">
                            {p.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80 dark:text-muted-foreground/50">
                            {p.description}
                          </p>
                        </div>

                        {/* Outcome Badges */}
                        <div className="mt-8 grid grid-cols-2 gap-2">
                          {(Array.isArray(p.metrics) ? p.metrics : []).map((o: any) => (
                            <div key={o.label} className="bg-surface-2 dark:bg-white/5 rounded-xl px-4 py-3 border border-border-strong/50">
                               <div className="text-sm font-bold text-foreground">{o.metric}</div>
                               <div className="text-[9px] uppercase tracking-widest text-muted-foreground/60">{o.label}</div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-border/40 dark:border-white/5 flex items-center justify-between">
                          <a
                            href={p.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground dark:text-zinc-300 hover:text-primary transition-colors"
                          >
                            Visit Website
                            <ArrowUpRight size={12} className="opacity-40" />
                          </a>
                          <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                            <span className="mono text-[8px] font-bold text-muted-foreground/40 dark:text-muted-foreground/30 uppercase">Live System</span>
                          </div>
                        </div>

                        <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-primary opacity-[0.05] dark:opacity-[0.1] rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Engagement Section */}
          <div className="mt-32 rounded-[3rem] border border-border-strong bg-surface-1/30 p-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              From Concept to 
              <br />
              <span className="text-brand-gradient">Live Production.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Ready to ship your next high-performance platform? Let's connect.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/contact" className="rounded-full bg-primary px-10 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Portfolio;
