import { motion } from "framer-motion";
import { ArrowUpRight, Smartphone, Globe, ShoppingBag, Newspaper } from "lucide-react";

const projects = [
  {
    title: "Chhattisgarh Shadi",
    category: "Mobile Application",
    stack: "React Native CLI",
    description: "A community-focused matrimonial platform built for Chhattisgarh. Features real-time matching, profile verification, and secure chat.",
    icon: Smartphone,
    color: "bg-rose-50",
    textColor: "text-rose-600",
    url: "https://chhattisgarhshadi.com",
  },
  {
    title: "Mitaan Express",
    category: "News Portal",
    stack: "React / Node.js",
    description: "High-performance news website for Shri Dhar Rao. Real-time content updates, intuitive categorization, and optimized for speed.",
    icon: Newspaper,
    color: "bg-blue-50",
    textColor: "text-blue-600",
    url: "https://mitaanexpress.com",
  },
  {
    title: "Shri Dhar Rao Portfolio",
    category: "Personal Brand",
    stack: "React / Tailwind",
    description: "Official professional portfolio for Shri Dhar Rao. A minimal, authority-driven design showcasing personal and political achievements.",
    icon: Globe,
    color: "bg-slate-50",
    textColor: "text-slate-700",
    url: "https://shridharrao.com",
  },

  {
    title: "Crova",
    category: "Premium Showcase",
    stack: "React / Tailwind",
    description: "A high-end boutique showcase for handcrafted embroidery and apparel. Built with a focus on minimal design and heritage craftsmanship.",
    icon: ShoppingBag,
    color: "bg-amber-50",
    textColor: "text-amber-700",
    url: "https://crova.in",
  },

];

export const CaseStudies = () => {
  return (
    <section id="portfolio" className="relative h-screen flex items-center overflow-hidden border-b border-border/50 bg-background">
      {/* Precision Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06] grid-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.02),transparent_70%)]" />
      
      <div className="container-tight relative z-10 w-full flex flex-col md:flex-row gap-8 lg:gap-12 px-6">
        
        {/* Left Sidebar: The Authority (25-30% Width) */}
        <div className="md:w-1/3 lg:w-1/4 flex flex-col justify-center border-r border-border/40 dark:border-white/5 pr-8">
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

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-strong dark:border-white/5 bg-surface-1 dark:bg-zinc-900/50 w-fit">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="mono text-[9px] font-bold uppercase tracking-widest text-foreground dark:text-zinc-300">6+ Active Systems</span>
            </div>
          </div>
        </div>

        {/* Right Grid: The Proof (70-75% Width) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 h-full py-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col rounded-xl border border-border-strong dark:border-white/5 bg-white/70 dark:bg-zinc-900/30 backdrop-blur-sm p-4 lg:p-5 transition-all hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-elevated dark:hover:bg-zinc-900/50 overflow-hidden"
            >
              {/* Compact Card Header */}
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${p.color} ${p.textColor} dark:bg-opacity-10 dark:text-opacity-90 border border-black/5 dark:border-white/5`}>
                  <p.icon size={18} strokeWidth={2} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="mono text-[7px] font-bold uppercase tracking-widest text-muted-foreground/40 dark:text-muted-foreground/30 bg-surface-2 dark:bg-white/5 px-2 py-0.5 rounded border border-border-strong/40 dark:border-white/5">
                    {p.stack}
                  </span>
                  <a 
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border-strong dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm transition-all hover:bg-primary hover:text-white"
                  >
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>

              <div className="flex-1">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-0.5 block italic">
                  {p.category}
                </span>
                <h3 className="text-[15px] font-bold tracking-tight text-foreground dark:text-zinc-200 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground/80 dark:text-muted-foreground/50 line-clamp-2">
                  {p.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 dark:border-white/5 flex items-center justify-between">
                <a 
                  href={p.url}
                  className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-foreground dark:text-zinc-300 hover:text-primary transition-colors"
                >
                  View Case
                  <ArrowUpRight size={10} className="opacity-40" />
                </a>
                <div className="flex items-center gap-1">
                  <div className="h-1 w-1 rounded-full bg-green-500" />
                  <span className="mono text-[7px] font-bold text-muted-foreground/40 dark:text-muted-foreground/30 uppercase">Production Ready</span>
                </div>
              </div>

              {/* Decorative Accent */}
              <div className={`absolute -bottom-4 -right-4 w-12 h-12 ${p.color} opacity-[0.05] dark:opacity-[0.1] rounded-full blur-xl group-hover:opacity-10 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
};


