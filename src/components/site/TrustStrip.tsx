import { motion } from "framer-motion";
import { LogoLoop } from "@/components/ui/LogoLoop";

const stats = [
  { label: "Systems Shipped", value: "8+" },
  { label: "Core Engineers", value: "5" },
  { label: "Uptime SLA", value: "99.9%" },
  { label: "Active Partners", value: "4+" },
];

const logos = [
  "Heritage Realty", "Sai Logistics", "Edutech India", "Vertex Solutions", "Nexus Digital",
  "Cloud9 Systems", "Prism Craft", "Horizon Tech", "Core Logistics", "Aura Designs",
];

export const TrustStrip = () => {
  const logoItems = logos.map((name) => ({
    node: (
      <span className="mono whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 hover:text-foreground transition-colors cursor-default">
        {name}
      </span>
    )
  }));

  return (
    <section className="relative border-y border-border bg-surface-1/40 py-12 overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{s.value}</div>
              <div className="mono mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="mt-10">
          <LogoLoop
            logos={logoItems}
            speed={80}
            direction="left"
            gap={60}
            fadeOut={true}
            fadeOutColor="hsl(var(--surface-1) / 0.4)"
            className="opacity-70 grayscale hover:grayscale-0 transition-all"
          />
        </div>
      </div>
    </section>
  );
};
