import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Starter / Fixed",
    price: "₹18,000",
    cadence: "starting",
    desc: "Perfect for high-quality landing pages, UI designs, or specific bug fixes.",
    features: [
      "Rapid UI/UX Prototyping",
      "Landing Page development",
      "Performance optimization",
      "Bug fixes & Small features",
      "24-48 hour turnaround",
    ],
    cta: "Scope a task",
    accent: false,
  },
  {
    name: "Growth Retainer",
    price: "₹45,000",
    cadence: "/ month",
    desc: "Consistent engineering support to keep your startup moving fast.",
    features: [
      "Dedicated Frontend/Backend dev",
      "Direct Slack/Discord access",
      "Weekly progress syncs",
      "Regular feature updates",
      "Emergency support (24/7)",
    ],
    cta: "Book a slot",
    accent: true,
  },
  {
    name: "Pro / Dedicated",
    price: "₹1,20,000",
    cadence: "/ month",
    desc: "Accelerate your product roadmap with a focused engineering unit.",
    features: [
      "Full-stack team support",
      "Tech Lead supervision",
      "QA & Architecture review",
      "Deep integration in your team",
      "Monthly roadmap strategy",
    ],
    cta: "Talk to us",
    accent: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="section-container bg-background">
      <div className="container-tight">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl text-center md:text-left">
            <span className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/5 px-3 py-1 rounded">Commercials</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl text-foreground">
              Accessible pricing. 
              <br />
              <span className="text-muted-foreground">Engineering for everyone.</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="rounded-lg border border-border-strong bg-surface-1 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              GST 18% as applicable
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
              className={`relative flex flex-col rounded-2xl border border-border-strong bg-surface-1 p-8 transition-all hover:border-border hover:shadow-sm group ${
                t.accent ? "border-primary/40 bg-white shadow-sm ring-1 ring-primary/10" : ""
              }`}
            >
              {t.accent && (
                <div className="absolute -top-3 left-6 rounded-md bg-primary px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-primary-foreground shadow-sm">
                  Best Value
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold tracking-tight text-foreground">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed h-10 opacity-80">{t.desc}</p>
              </div>
              
              <div className="mb-10 border-b border-border/50 pb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-foreground">{t.price}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{t.cadence}</span>
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
                className={`mt-10 flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold transition-all ${
                  t.accent 
                    ? "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90" 
                    : "border border-border-strong bg-white hover:bg-surface-2"
                }`}
              >
                {t.cta}
                <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
            Scaling a big idea? <a href="#contact" className="text-primary hover:underline underline-offset-4 decoration-primary/30">Custom enterprise plans available</a>
          </p>
        </div>
      </div>
    </section>
  );
};
