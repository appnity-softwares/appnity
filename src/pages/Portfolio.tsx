import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Filter, Smartphone, Newspaper, Globe, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

const realProjects = [
  {
    id: "1",
    slug: "chhattisgarh-shadi",
    title: "Chhattisgarh Shadi",
    tagline: "Dedicated matrimonial platform for Chhattisgarh state.",
    client: "CG Shadi",
    industry: "Consumer App",
    year: 2023,
    stack: ["React Native CLI", "Node.js", "PostgreSQL"],
    icon: Smartphone,
    outcomes: [
      { metric: "10k+", label: "Registrations" },
      { metric: "Real-time", label: "Matchmaking" },
      { metric: "99.9%", label: "Uptime" }
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "mitaan-express",
    title: "Mitaan Express",
    tagline: "High-performance news portal for real-time journalism.",
    client: "Shri Dhar Rao",
    industry: "News & Media",
    year: 2024,
    stack: ["React", "Express", "MongoDB", "Redis"],
    icon: Newspaper,
    outcomes: [
      { metric: "50k+", label: "Monthly Users" },
      { metric: "<1s", label: "Load Time" },
      { metric: "Mobile", label: "Optimized" }
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "shri-dhar-rao",
    title: "Shri Dhar Rao",
    tagline: "Official personal portfolio and achievement showcase.",
    client: "Shri Dhar Rao",
    industry: "Personal Brand",
    year: 2023,
    stack: ["React", "Framer Motion", "Tailwind CSS"],
    icon: Globe,
    outcomes: [
      { metric: "100%", label: "Responsive" },
      { metric: "Clean", label: "Architecture" },
      { metric: "SEO", label: "Optimized" }
    ],
    featured: false,
  },
  {
    id: "4",
    slug: "crova-in",
    title: "Crova",
    tagline: "Premium boutique for handcrafted embroidery apparel.",
    client: "Crova",
    industry: "E-commerce",
    year: 2024,
    stack: ["Next.js", "Shopify", "Tailwind"],
    icon: ShoppingBag,
    outcomes: [
      { metric: "Shopify", label: "Integration" },
      { metric: "Seamless", label: "Checkout" },
      { metric: "Design", label: "Handcrafted" }
    ],
    featured: false,
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
      <PageHeader
        eyebrow="Portfolio · High-performance systems"
        title={
          <>
            <span className="text-foreground">Proven architectures,</span>
            <br />
            <span className="text-brand-gradient">built for growth.</span>
          </>
        }
        description="We don't build projects; we build equity. Every system here is a case study in scalability, security, and strategic engineering."
      />

      <section className="pb-32">
        <div className="container-tight">
          {/* Filters */}
          <div className="mb-12 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveFilter("All")}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                activeFilter === "All" 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "bg-surface-2 text-muted-foreground hover:bg-surface-3"
              }`}
            >
              All
            </button>
            {industries.filter(i => i !== "All").map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveFilter(ind)}
                className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
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
            className="grid gap-8 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="group relative block h-full overflow-hidden rounded-[2rem] border border-border-strong bg-surface-1 p-10 shadow-card transition-all hover:shadow-elevated">
                    {p.featured && (
                      <div className="absolute top-0 right-0 px-6 py-2 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl border-b border-l border-primary/20">
                        Featured Case Study
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between gap-4">
                      <div className="p-3 rounded-xl bg-primary/5 text-primary">
                        <p.icon size={24} />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight leading-tight">{p.title}</h2>
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed">{p.tagline}</p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="mono rounded-lg border border-border-strong bg-surface-2 px-3 py-1 text-[11px] font-medium text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-10 grid grid-cols-3 divide-x divide-border-strong rounded-2xl border border-border-strong bg-background/60 p-1">
                      {p.outcomes.map((o) => (
                        <div key={o.label} className="px-4 py-5 text-center">
                          <div className="text-xl font-bold tracking-tight text-foreground">{o.metric}</div>
                          <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{o.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Engagement Section */}
          <div className="mt-32 rounded-[3rem] border border-border-strong bg-gradient-to-b from-surface-1 to-background p-16 text-center shadow-elevated">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Don't just ship features. 
              <br />
              <span className="text-brand-gradient">Ship business outcomes.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Every project above started with a problem and ended with a measurable improvement. Ready to be our next success story?
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/contact" className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                Start your journey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Portfolio;
