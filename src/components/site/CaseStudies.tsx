import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Smartphone, Globe, ShoppingBag, Newspaper } from "lucide-react";
import { publicApi } from "@/services/api";

const iconMap: any = {
  Smartphone: Smartphone,
  Globe: Globe,
  ShoppingBag: ShoppingBag,
  Newspaper: Newspaper,
};

export const CaseStudies = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await publicApi.getFeaturedPortfolios();
        setProjects(data || []);
      } catch (error) {
        console.error("Failed to fetch portfolios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="relative min-h-screen py-20 md:py-0 flex items-center overflow-hidden border-b border-border/50 bg-background">
      {/* Precision Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06] grid-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.02),transparent_70%)]" />

      <div className="container-tight relative z-10 w-full flex flex-col md:flex-row gap-8 lg:gap-12 px-6">

        {/* Left Sidebar: The Authority (25-30% Width) */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/40 dark:border-white/5 pb-8 md:pb-0 pr-0 md:pr-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-6 bg-primary" />
            <span className="mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Portfolio</span>
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Selected
            <br />
            <span className="text-brand-gradient">Works.</span>
          </h2>

          <p className="text-[11px] leading-relaxed text-muted-foreground/60 dark:text-muted-foreground/40 mb-8 max-w-[200px]">
            Every deployment is a benchmark in speed, security, and absolute precision.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-strong dark:border-white/5 bg-surface-1 dark:bg-zinc-900/50 w-fit">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="mono text-[9px] font-bold uppercase tracking-widest text-foreground dark:text-zinc-300">{projects.length}+ Active Systems</span>
            </div>

            <Link
              to="/portfolio"
              className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-all w-fit"
            >
              Explore Full Portfolio
              <div className="h-8 w-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Grid: The Proof (70-75% Width) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 h-full py-4">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse h-64 rounded-2xl bg-zinc-100" />
            ))
          ) : (
            projects.map((p, i) => {
              const Icon = iconMap[p.category === 'Mobile Application' ? 'Smartphone' : p.category === 'News Portal' ? 'Newspaper' : 'Globe'] || Globe;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative h-full flex flex-col p-8 rounded-2xl border border-border-strong bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-elevated"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Icon size={22} />
                    </div>
                    {p.project_url && (
                      <a href={p.project_url} target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 text-muted-foreground">
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                  </div>

                  <div className="flex-1">
                    <span className="mono text-[8px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-2 block">{p.category}</span>
                    <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">{p.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground/80 line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-border/40 dark:border-white/5">
                    <span className="mono text-[9px] font-bold text-muted-foreground/40">{p.metrics?.stack || "Custom Build"}</span>
                    <Link to={`/portfolio/${p.slug}`} className="text-[10px] font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors">Case Study</Link>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
