import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Fixed Project",
    price: "from $18k",
    cadence: "one-time",
    best: "MVPs, redesigns, scoped builds with a clear deliverable.",
    features: [
      "Written technical brief & estimate (±15%)",
      "2–10 week timeline",
      "Production deployment + handover",
      "30 days post-launch support",
    ],
    cta: "Scope a project",
    accent: false,
  },
  {
    name: "Monthly Retainer",
    price: "from $9.5k",
    cadence: "/ month",
    best: "Live products needing continuous engineering capacity.",
    features: [
      "Dedicated 0.5 FTE senior engineer",
      "Weekly demo + roadmap sync",
      "Quarterly architecture review",
      "Pause or cancel monthly",
    ],
    cta: "Book a call",
    accent: true,
  },
  {
    name: "Dedicated Team",
    price: "from $32k",
    cadence: "/ month",
    best: "Companies replacing or augmenting an in-house team.",
    features: [
      "2–5 senior engineers + tech lead",
      "Embedded in your tools (Slack, Linear, Git)",
      "SLA-backed delivery cadence",
      "Direct hire option after 6 months",
    ],
    cta: "Talk to a partner",
    accent: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="relative flex min-h-screen flex-col justify-center py-28">
      <div className="container-tight">
        <div className="mb-14 max-w-2xl">
          <span className="badge-dot mb-5">Engagement</span>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Three ways to work
            <br />
            <span className="text-muted-foreground">with us. Priced openly.</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                t.accent
                  ? "border-primary/40 bg-surface-1 shadow-glow"
                  : "border-border-strong bg-surface-1"
              }`}
            >
              {t.accent && (
                <span className="mono absolute -top-2.5 left-7 rounded-full bg-primary px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-primary-foreground">
                  Most picked
                </span>
              )}
              <h3 className="text-lg font-semibold tracking-tight">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.best}</p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.cadence}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 border-t border-border-strong pt-6">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-foreground/90">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02] ${
                  t.accent
                    ? "bg-primary text-primary-foreground"
                    : "hairline text-foreground hover:bg-surface-2"
                }`}
              >
                {t.cta} <span>→</span>
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mono mt-8 text-center text-xs text-muted-foreground">
          All engagements include source code ownership, IaC, and complete documentation.
        </p>
      </div>
    </section>
  );
};
