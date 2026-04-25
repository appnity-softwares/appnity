import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Smartphone, Newspaper, Globe, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SEO } from "@/components/site/SEO";

const realProjects = [
  {
    id: "1",
    title: "Chhattisgarh Shadi",
    category: "Mobile Application",
    tagline: "Dedicated matrimonial platform for Chhattisgarh state.",
    industry: "Consumer App",
    stack: "React Native CLI",
    icon: Smartphone,
    color: "bg-rose-50",
    textColor: "text-rose-600",
    url: "https://chhattisgarhshadi.com",
    outcomes: [
      { metric: "10k+", label: "Registrations" },
      { metric: "99.9%", label: "Uptime" }
    ],
  },
  {
    id: "2",
    title: "Mitaan Express",
    category: "News Portal",
    tagline: "High-performance news portal for real-time journalism.",
    industry: "News & Media",
    stack: "React / Node.js",
    icon: Newspaper,
    color: "bg-blue-50",
    textColor: "text-blue-600",
    url: "https://mitaanexpress.com",
    outcomes: [
      { metric: "50k+", label: "Monthly Users" },
      { metric: "<1s", label: "Load Time" }
    ],
  },
  {
    id: "3",
    title: "Shri Dhar Rao Portfolio",
    category: "Personal Brand",
    tagline: "Official professional portfolio and achievement showcase.",
    industry: "Personal Brand",
    stack: "React / Tailwind",
    icon: Globe,
    color: "bg-slate-50",
    textColor: "text-slate-700",
    url: "https://shridharrao.com",
    outcomes: [
      { metric: "100%", label: "Responsive" },
      { metric: "SEO", label: "Optimized" }
    ],
  },
  {
    id: "4",
    title: "Crova",
    category: "Premium Showcase",
    tagline: "Premium boutique for handcrafted embroidery apparel.",
    industry: "E-commerce",
    stack: "React / Tailwind",
    icon: ShoppingBag,
    color: "bg-amber-50",
    textColor: "text-amber-700",
    url: "https://crova.in",
    outcomes: [
      { metric: "Shopify", label: "Sync" },
      { metric: "Design", label: "Handcrafted" }
    ],
  },
];

const industries = ["All", "Consumer App", "News & Media", "Personal Brand", "E-commerce"];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? realProjects 
    : realProjects.filter(p => p.industry === activeFilter);

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
          <div className="mb-16 flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <button
              onClick={() => setActiveFilter("All")}
              className={`rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeFilter === "All" 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "bg-surface-2 text-muted-foreground hover:bg-surface-3"
              }`}
            >
              All Systems
            </button>
            {industries.filter(i => i !== "All").map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveFilter(ind)}
                className={`rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeFilter === ind 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "bg-surface-2 text-muted-foreground hover:bg-surface-3"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="group relative flex flex-col h-full rounded-2xl border border-border-strong dark:border-white/5 bg-white/70 dark:bg-zinc-900/30 backdrop-blur-sm p-6 lg:p-8 transition-all hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-elevated dark:hover:bg-zinc-900/50 overflow-hidden">
                    {/* Compact Card Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-xl ${p.color} ${p.textColor} dark:bg-opacity-10 dark:text-opacity-90 border border-black/5 dark:border-white/5`}>
                        <p.icon size={24} strokeWidth={2} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40 dark:text-muted-foreground/30 bg-surface-2 dark:bg-white/5 px-3 py-1 rounded border border-border-strong/40 dark:border-white/5">
                          {p.stack}
                        </span>
                        <a
                          href={p.url}
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
                        {p.tagline}
                      </p>
                    </div>

                    {/* Outcome Badges */}
                    <div className="mt-8 grid grid-cols-2 gap-2">
                      {p.outcomes.map((o) => (
                        <div key={o.label} className="bg-surface-2 dark:bg-white/5 rounded-xl px-4 py-3 border border-border-strong/50">
                           <div className="text-sm font-bold text-foreground">{o.metric}</div>
                           <div className="text-[9px] uppercase tracking-widest text-muted-foreground/60">{o.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/40 dark:border-white/5 flex items-center justify-between">
                      <a
                        href={p.url}
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

                    {/* Decorative Accent */}
                    <div className={`absolute -bottom-8 -right-8 w-24 h-24 ${p.color} opacity-[0.05] dark:opacity-[0.1] rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

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
