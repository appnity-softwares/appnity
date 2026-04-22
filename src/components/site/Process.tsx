import { motion } from "framer-motion";
import { Lightbulb, Layout, Code2, ShieldCheck, Rocket, LineChart } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Lightbulb,
    title: "Understanding Your Vision",
    body: "We start by listening to your goals and business needs. We create a clear technical roadmap so you know exactly how we'll build your success.",
    highlights: ["Clear Goals", "Project Roadmap"],
  },
  {
    n: "02",
    icon: Layout,
    title: "Building the Blueprint",
    body: "Before we write a single line of code, we design the inner workings to ensure your system is fast, secure, and ready for growth.",
    highlights: ["Safety First", "Smart Logic"],
  },
  {
    n: "03",
    icon: Code2,
    title: "Expert Development",
    body: "Our senior engineers build your product using the best modern tools. You'll see live progress every week as we bring your idea to life.",
    highlights: ["Weekly Updates", "Clean Code"],
  },
  {
    n: "04",
    icon: ShieldCheck,
    title: "Rigorous Testing",
    body: "We don't just hope it works—we prove it. We test everything multiple times so your customers get a smooth, glitch-free experience.",
    highlights: ["Zero Bugs", "High Speed"],
  },
  {
    n: "05",
    icon: Rocket,
    title: "Smooth Launch",
    body: "We handle the entire launch process for you. Your platform goes live with zero downtime, ensuring a perfect start for your users.",
    highlights: ["Easy Go-Live", "Safe Migration"],
  },
  {
    n: "06",
    icon: LineChart,
    title: "Continuous Growth",
    body: "After launch, we stay as your technical partners. We help you add new features and keep your system running perfectly as you grow.",
    highlights: ["Scalability", "Expert Support"],
  },
];

export const Process = () => {
  return (
    <section id="process" className="relative flex h-screen flex-col justify-center bg-surface-1/30 py-10 overflow-hidden">
      <div className="container-tight h-full flex flex-col justify-center">
        <div className="mb-10 max-w-2xl">
          <span className="badge-dot mb-3">Our Workflow</span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            A proven process for
            <br />
            <span className="text-brand-gradient">exceptional digital products.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group relative flex flex-col rounded-2xl border border-border-strong bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-surface-1/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={20} />
                  </div>
                  <span className="mono text-xs font-bold text-primary/40 group-hover:text-primary transition-colors">STEP {s.n}</span>
                </div>
                
                <h3 className="text-base font-bold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">{s.body}</p>
                
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  {s.highlights.map((h) => (
                    <span key={h} className="rounded-full bg-surface-2 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground border border-border-strong">
                      {h}
                    </span>
                  ))}
                </div>
                
                {/* Subtle Progress Indicator Line */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border-strong lg:block" />
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
