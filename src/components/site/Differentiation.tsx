import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  {
    point: "Team Expertise",
    them: "Junior developers learning on your project.",
    us: "Only senior experts with 7+ years of experience.",
  },
  {
    point: "Speed & Quality",
    them: "Build fast now, fix bugs and slow speed later.",
    us: "Built for speed and high quality from day one.",
  },
  {
    point: "Project Control",
    them: "You're locked in and don't own the 'secret' code.",
    us: "Full ownership of your code and documentation.",
  },
  {
    point: "Pricing Honesty",
    them: "Hidden costs and quotes that double mid-way.",
    us: "Fixed, honest pricing with zero hidden surprises.",
  },
  {
    point: "Collaboration",
    them: "They say 'yes' to everything, even bad ideas.",
    us: "We guide you on what works best for your business.",
  },
];

export const Differentiation = () => {
  return (
    <section className="section-container bg-surface-1/40">
      <div className="container-tight">
        <div className="mb-10 max-w-2xl">
          <span className="label-high-contrast">Why Appnity</span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Why smart businesses
            <br />
            <span className="text-brand-gradient">choose Appnity Softwares.</span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-border-strong bg-card shadow-xl">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 border-b border-border-strong bg-surface-2 px-6 py-5 label-high-contrast text-muted-foreground mb-0">
            <div className="col-span-4">Feature</div>
            <div className="col-span-4 px-4">Other Agencies</div>
            <div className="col-span-4 px-4 text-primary">Appnity Advantage</div>
          </div>

          {/* Rows */}
          {rows.map((r, i) => (
            <motion.div
              key={r.point}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="grid grid-cols-12 border-b border-border-strong bg-background transition-colors hover:bg-surface-1/50 last:border-b-0 md:items-center"
            >
              <div className="col-span-12 px-6 py-5 text-sm font-bold tracking-tight md:col-span-4 border-r border-border-strong/50">
                {r.point}
              </div>

              <div className="col-span-12 px-10 py-5 text-xs text-muted-foreground/70 md:col-span-4 md:border-r border-border-strong/50 flex flex-col items-start gap-1 md:flex-row md:gap-3 italic">
                <div className="flex items-start gap-3">
                  <X size={14} className="mt-0.5 shrink-0 text-red-500/50" />
                  <div>
                    <span className="md:hidden font-bold uppercase tracking-widest text-[8px] mb-1 block not-italic">Other Agencies</span>
                    {r.them}
                  </div>
                </div>
              </div>

              <div className="col-span-12 px-10 py-5 text-xs font-medium text-foreground md:col-span-4 flex flex-col items-start gap-1 md:flex-row md:gap-3">
                <div className="flex items-start gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <span className="md:hidden font-bold uppercase tracking-widest text-[8px] mb-1 block text-primary">Appnity Advantage</span>
                    {r.us}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
          We focus on building long-term value, not just short-term fixes.
        </p>
      </div>
    </section>
  );
};
