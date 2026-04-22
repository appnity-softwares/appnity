import { motion } from "framer-motion";
import { Globe, Database, Cpu, Smartphone, Workflow, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Globe,
    title: "Fast & High-Performance Websites",
    description: "We build websites that don't just look good—they load instantly and rank higher on search engines.",
    benefit: "Perfect for businesses that need to turn visitors into customers without technical glitches.",
    stack: ["E-commerce", "Dashboards", "Marketing Sites", "Speed Optimization"],
  },
  {
    icon: Database,
    title: "Powerful Business Systems",
    description: "Custom backend systems designed to handle your growth without crashing or slowing down.",
    benefit: "Ensures your business runs smoothly even as you scale to thousands of users.",
    stack: ["Database Design", "API Development", "Cloud Systems", "Real-time Data"],
  },
  {
    icon: Cpu,
    title: "Smart AI Solutions",
    description: "Automate repetitive tasks and gain insights from your data using custom AI tools.",
    benefit: "Save hundreds of hours every month by letting AI handle the heavy lifting for your team.",
    stack: ["GPT-4 Integration", "Smart Search", "Data Analysis", "Chatbots"],
  },
  {
    icon: Smartphone,
    title: "Custom Mobile Apps",
    description: "Engage your customers anywhere with high-quality apps for both iOS and Android.",
    benefit: "One high-quality app that works perfectly on all devices, saving you time and cost.",
    stack: ["iOS & Android", "User Experience", "App Store Launch", "Fast Performance"],
  },
  {
    icon: Workflow,
    title: "Reliable Cloud Setup",
    description: "We set up and manage your cloud infrastructure so your systems are always online.",
    benefit: "Peace of mind knowing your digital platform is stable, secure, and ready for anything.",
    stack: ["AWS/Cloudflare", "Automated Deploys", "24/7 Uptime", "Scalability"],
  },
  {
    icon: ShieldCheck,
    title: "Data Security & Trust",
    description: "Protect your business and customer data with industry-leading security practices.",
    benefit: "Build trust with your users by ensuring their information is handled with the highest care.",
    stack: ["Encryption", "Privacy Compliance", "Secure Login", "Risk Audit"],
  },
];

export const Capabilities = () => {
  return (
    <section id="capabilities" className="relative flex h-screen flex-col justify-center overflow-hidden bg-surface-1/30 py-8">
      <div className="container-tight h-full flex flex-col justify-center">
        <div className="mb-8 max-w-2xl">
          <span className="badge-dot mb-3">Our Services</span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            We don't just write code.
            <br />
            <span className="text-brand-gradient">We solve business problems.</span>
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
                  <span className="text-2xl font-bold opacity-10 transition-opacity group-hover:opacity-20">0{i + 1}</span>
                </div>
                
                <h3 className="text-base font-bold tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">{item.description}</p>
                <p className="mt-3 text-xs font-medium text-foreground/80 bg-surface-2/50 p-2 rounded-lg border border-border/50">
                  <span className="text-primary font-bold">Benefit:</span> {item.benefit}
                </p>
                
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-surface-2 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground border border-border-strong"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
