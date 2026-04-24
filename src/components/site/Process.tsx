import { motion } from "framer-motion";
import { Lightbulb, Layout, Code, ShieldCheck, Rocket, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Strategic Discovery",
    description: "We don't just take orders. We dive deep into your business goals to ensure the tech solves a real problem.",
    highlight: "Outcome: Detailed Roadmap",
  },
  {
    icon: Layout,
    title: "Architecture & UX",
    description: "Designing the blueprint for speed and scale. We build for the next 100,000 users, not just the first 10.",
    highlight: "Interactive Prototypes",
  },
  {
    icon: MessageSquare,
    title: "Transparent Sprints",
    description: "You'll never wonder what we're doing. Weekly demos and a dedicated Slack channel keep you in the loop.",
    highlight: "Real-time Visibility",
  },
  {
    icon: Code,
    title: "Precision Engineering",
    description: "Clean, maintainable code written by senior experts. No technical debt. No 'Frankenstein' systems.",
    highlight: "100% Code Ownership",
  },
  {
    icon: ShieldCheck,
    title: "Stress Testing",
    description: "Automated tests and manual QA to ensure every button and payment works perfectly on every device.",
    highlight: "Zero-Bug Guarantee",
  },
  {
    icon: Rocket,
    title: "Global Launch",
    description: "Deployment to the cloud with 24/7 monitoring. We don't just ship and leave; we support your growth.",
    highlight: "Ready to Scale",
  },
];

export const Process = () => {
  return (
    <section id="process" className="section-container border-b border-border bg-surface-1/40">
      <div className="container-tight">
        <div className="mb-10 max-w-2xl">
          <span className="label-high-contrast">How we work</span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            A high-transparency process
            <br />
            <span className="text-brand-gradient">built on trust and results.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative flex flex-col rounded-2xl border border-border-strong bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={20} />
                  </div>
                  <span className="mono text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Step 0{i + 1}</span>
                </div>

                <h3 className="text-base font-bold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.description}</p>

                <div className="mt-4 pt-4 border-t border-border/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {s.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
