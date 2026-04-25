import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Digital Presence",
    price: "₹25,000",
    cadence: "starting at",
    desc: "Premium static websites and high-performance landing pages for elite brands.",
    features: [
      "Custom UI/UX Design",
      "Next.js Static Export",
      "Perfect Lighthouse Score",
      "SEO & Metadata Hardening",
      "CMS Integration (Optional)",
      "CDN Global Deployment",
    ],
    cta: "Start a project",
    accent: false,
  },
  {
    name: "Dynamic Systems",
    price: "₹85,000",
    cadence: "starting at",
    desc: "Full-stack digital products, SaaS MVPs, and complex web applications.",
    features: [
      "Custom Web Application",
      "Database Architecture",
      "Auth & Security Protocols",
      "API Development (REST/GraphQL)",
      "Cloud Infrastructure Setup",
      "3 Months Post-Launch Support",
    ],
    cta: "Build a product",
    accent: true,
  },
  {
    name: "Enterprise Solutions",
    price: "Custom",
    cadence: "quote based",
    desc: "Custom engineering for large-scale distributed systems and AI pipelines.",
    features: [
      "Distributed Architecture",
      "Legacy System Migration",
      "AI & Data Engineering",
      "Security Audits & Hardening",
      "Dedicated Engineering Unit",
      "On-prem / Hybrid Deployment",
    ],
    cta: "Consult with us",
    accent: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="section-container bg-background">
      <div className="container-tight">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl text-center md:text-left">
            <span className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/5 px-3 py-1 rounded">Engagement Models</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Software Engineering,
              <br />
              <span className="text-muted-foreground">Tailored for Impact.</span>
            </h2>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="rounded-lg border border-border-strong bg-surface-1 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground shadow-sm">
              GST 18% AS APPLICABLE
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Open for Q2 Projects
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex flex-col rounded-2xl border border-border-strong bg-surface-1 p-8 transition-all hover:border-primary/20 hover:shadow-elevated group ${t.accent ? "border-primary/40 bg-white shadow-elevated ring-1 ring-primary/5" : ""
                }`}
            >
              {t.accent && (
                <div className="absolute -top-3 left-6 rounded-md bg-primary px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-primary-foreground shadow-sm">
                  Most Requested
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{t.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground h-10 line-clamp-2 opacity-80">{t.desc}</p>
              </div>

              <div className="mb-10 border-b border-border/50 pb-8">
                <div className="flex flex-col gap-1">
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">{t.cadence}</span>
                   <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold tracking-tight text-foreground">{t.price}</span>
                  </div>
                </div>
              </div>

              <ul className="flex-1 space-y-4">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-xs text-foreground/80 font-medium">
                    <Check size={14} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-10 flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold transition-all ${t.accent
                    ? "bg-primary text-primary-foreground shadow-glow hover:translate-y-[-2px]"
                    : "border border-border-strong bg-white hover:bg-surface-2 hover:border-primary/20"
                  }`}
              >
                {t.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
            Scaling a massive infrastructure? <a href="#contact" className="text-primary hover:underline underline-offset-8 decoration-primary/30">Custom SLA & Enterprise Consulting</a>
          </p>
        </div>
      </div>
    </section>
  );
};
