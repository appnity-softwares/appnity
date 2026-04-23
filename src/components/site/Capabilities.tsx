import { motion } from "framer-motion";
import { Globe, Database, Cpu, Smartphone, Workflow, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Globe,
    title: "High-Performance Platforms",
    description: "We build websites that don't just look good—they load instantly and rank higher on search engines.",
    benefit: "Turn visitors into customers without technical glitches.",
    idealFor: "SaaS, E-commerce, & Marketing",
    stack: ["Speed Optmized", "SEO Ready", "Conversion Focused"],
  },
  {
    icon: Database,
    title: "Scalable Business Backends",
    description: "Custom internal systems designed to handle your growth without crashing or slowing down.",
    benefit: "Focus on your business while the tech handles the scale.",
    idealFor: "FinTech & Data Management",
    stack: ["Cloud Native", "Real-time Sync", "Secure APIs"],
  },
  {
    icon: Cpu,
    title: "Practical AI Integration",
    description: "Automate repetitive tasks and gain insights from your data using custom AI tools.",
    benefit: "Save hundreds of hours by letting AI handle the heavy lifting.",
    idealFor: "Process Automation & Analysis",
    stack: ["LLM Workflows", "Smart Search", "Data Mining"],
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Mobile",
    description: "Engage your customers anywhere with high-quality apps for both iOS and Android.",
    benefit: "One high-quality app for all devices, saving time and cost.",
    idealFor: "Consumer Apps & Portals",
    stack: ["iOS & Android", "Native Feel", "Offline Ready"],
  },
  {
    icon: Workflow,
    title: "Managed Cloud Ops",
    description: "We set up and manage your cloud infrastructure so your systems are always online.",
    benefit: "Peace of mind with 24/7 stability and security.",
    idealFor: "Enterprise & High-Traffic",
    stack: ["AWS/Cloudflare", "CI/CD", "Auto-scaling"],
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description: "Protect your business and customer data with industry-leading security practices.",
    benefit: "Build trust with users by securing their information.",
    idealFor: "HealthTech & Legal Systems",
    stack: ["Encryption", "Audit Ready", "Access Control"],
  },
];

export const Capabilities = () => {
  return (
    <section id="capabilities" className="section-container border-b border-border bg-surface-1/30">
      <div className="container-tight">
        <div className="mb-8 max-w-2xl">
          <span className="label-high-contrast">Our Expertise</span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Technical mastery applied
            <br />
            <span className="text-brand-gradient">to your specific industry.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative flex flex-col rounded-2xl border border-border-strong bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-surface-1/50"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/5 rounded-full">
                    {item.idealFor}
                  </span>
                </div>
                
                <h3 className="text-base font-bold tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">{item.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-1">
                  {item.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-surface-2/50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground border border-border/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border/40">
                  <p className="text-[10px] text-foreground font-medium">
                    <span className="text-primary font-bold">Benefit:</span> {item.benefit}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
