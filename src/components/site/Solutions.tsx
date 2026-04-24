import {
  Users, BookOpen, Layers, School, Building2, ShoppingCart,
  ArrowRight, Cpu, ShieldCheck, Zap, BarChart3, Database,
  Layout, Smartphone, Server
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoLoop } from "@/components/ui/LogoLoop";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiPostgresql, SiFramer, SiGo,
  SiDocker, SiGooglecloud, SiOpenai, SiFigma,
  SiVercel, SiSupabase, SiPython, SiRedis
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const solutions = [
  {
    title: "Sales Growth Engine",
    category: "For Sales Teams",
    icon: Users,
    description: "Stop losing leads. Organize your sales process and close deals faster with automated follow-ups.",
    benefit: "Close 3x more deals",
    stack: "Secure • Automated • Fast",
    price: "From ₹85k",
    timeline: "4 Weeks",
    features: ["Lead Organizer", "Auto Follow-ups", "Sales Reports"]
  },
  {
    title: "Knowledge & Training Hub",
    category: "For Education",
    icon: BookOpen,
    description: "Train your employees or students anywhere in the world with a professional learning platform.",
    benefit: "100% Automated Learning",
    stack: "Video • Mobile Ready",
    price: "From ₹95k",
    timeline: "6 Weeks",
    features: ["Video Lessons", "Student Progress", "Mobile App"]
  },
  {
    title: "Subscription Business",
    category: "For Startups",
    icon: Layers,
    description: "Launch your own 'Netflix' or 'Spotify' style business with built-in recurring payments.",
    benefit: "Monthly Recurring Revenue",
    stack: "Billing • Secure Login",
    price: "From ₹45k",
    timeline: "3 Weeks",
    features: ["Easy Payments", "User Accounts", "Growth Ready"]
  },
  {
    title: "Modern School Manager",
    category: "For Institutions",
    icon: School,
    description: "Manage admissions, fees, and results from a single dashboard. No more manual paperwork.",
    benefit: "Save 40+ hours/week",
    stack: "Reliable • Paperless",
    price: "From ₹1.5L",
    timeline: "10 Weeks",
    features: ["Fee Collection", "Smart Reports", "Parent App"]
  },
  {
    title: "Property & Real Estate",
    category: "For Agencies",
    icon: Building2,
    description: "Showcase your properties beautifully and manage inquiries effortlessly on one site.",
    benefit: "Convert 2x more visitors",
    stack: "Maps • Premium UI",
    price: "From ₹85k",
    timeline: "8 Weeks",
    features: ["Property Gallery", "Agent Portal", "Map Search"]
  },
  {
    title: "Vendor Marketplace",
    category: "For E-commerce",
    icon: ShoppingCart,
    description: "Build your own Amazon or Flipkart. Let multiple sellers list products on your platform.",
    benefit: "Scale to Unlimited Sellers",
    stack: "Vendor Tools • Orders",
    price: "From ₹1.2L",
    timeline: "8 Weeks",
    features: ["Seller Dashboard", "Admin Control", "Easy Payouts"]
  },
];


const techRow1 = [
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind" },
  { node: <SiFigma />, title: "Figma" },
  { node: <SiFramer />, title: "Framer" },
  { node: <SiVercel />, title: "Vercel" },
];

const techRow2 = [
  { node: <SiNodedotjs />, title: "Node" },
  { node: <SiGo />, title: "Go" },
  { node: <SiPostgresql />, title: "SQL" },
  { node: <SiPython />, title: "Py" },
  { node: <FaAws />, title: "AWS" },
  { node: <SiGooglecloud />, title: "GCP" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiOpenai />, title: "AI" },
];

export const Solutions = () => {
  return (
    <section id="solutions" className="relative min-h-screen flex flex-col overflow-hidden border-b border-border/50 bg-background py-12 md:py-24">
      {/* 1. Background System - "The Digital Drafting Table" */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] grid-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />
      </div>

      <div className="container-tight relative z-10 h-full flex flex-col px-6">

        {/* 2. Header Area - Benefit Driven */}
        <div className="text-center mb-8 flex-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <div className="h-px w-8 bg-primary/30" />
            <span className="mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary/70">Our Expertise • Your Growth</span>
            <div className="h-px w-8 bg-primary/30" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-3">
            Business solutions,
            <br />
            <span className="text-brand-gradient">built for your success.</span>
          </h2>

          <p className="text-xs md:text-sm text-muted-foreground/60 dark:text-muted-foreground/40 max-w-xl mx-auto leading-relaxed">
            We help you automate manual work and grow your revenue with professional,
            high-performance software tailored to your specific industry.
          </p>
        </div>

        {/* 3. The Blueprint Grid - Maximum Clarity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {solutions.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative flex flex-col rounded-2xl border border-border-strong dark:border-white/5 bg-white/70 dark:bg-zinc-900/30 backdrop-blur-sm p-5 transition-all duration-300 hover:shadow-elevated dark:hover:bg-zinc-900/50 hover:border-primary/40 dark:hover:border-primary/30 hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-primary/5 dark:bg-primary/10 text-primary ring-1 ring-primary/10">
                  <s.icon size={20} strokeWidth={2} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground/50 dark:text-muted-foreground/30">{s.category}</span>
                  <div className="mt-1 flex flex-col items-end gap-1">
                    <span className="text-[12px] font-bold text-foreground tracking-tight dark:text-zinc-100">{s.price}</span>
                    <span className="mono text-[7px] font-bold uppercase text-primary/60 dark:text-primary/70 tracking-wider bg-primary/5 dark:bg-primary/10 px-1.5 py-0.5 rounded border border-primary/10">
                      {s.timeline} setup
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-[16px] font-bold tracking-tight text-foreground dark:text-zinc-200 group-hover:text-primary transition-colors">{s.title}</h3>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50/50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[9px] font-bold mb-4 border border-green-100/50 dark:border-green-500/20 italic">
                  <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                  {s.benefit}
                </div>

                <p className="text-[11px] leading-snug text-muted-foreground/80 dark:text-muted-foreground/50 mb-4">
                  {s.description}
                </p>

                <div className="space-y-2.5 border-t border-border/40 dark:border-white/5 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {s.features.map(f => (
                      <span key={f} className="text-[9px] font-bold text-foreground/60 dark:text-zinc-400 bg-surface-2 dark:bg-white/5 px-2.5 py-1 rounded-md border border-border/20 dark:border-white/5">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Action / Footer */}
              <div className="mt-4 pt-3 border-t border-border/40 dark:border-white/5 flex items-center justify-between">
                <span className="mono text-[8px] font-bold uppercase text-muted-foreground/40 dark:text-muted-foreground/30 tracking-[0.2em]">Full Ownership</span>
                <button className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:gap-2 transition-all">
                  Get Started <ArrowRight size={14} />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* 4. The Ecosystem Proof - Dual-Row Subtle Marquee */}
        <div className="flex-none pt-4 border-t border-border/40 dark:border-white/5">
          <div className="flex flex-col gap-3">
            <LogoLoop
              logos={techRow1.map(t => ({
                node: (
                  <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-lg border border-border-strong/40 dark:border-white/5 bg-white/40 dark:bg-white/5 text-muted-foreground/40 hover:text-primary transition-all">
                    <div className="text-sm grayscale hover:grayscale-0">{t.node}</div>
                    <span className="text-[8px] font-bold uppercase tracking-widest mono">{t.title}</span>
                  </div>
                )
              }))}
              speed={45}
              direction="left"
              gap={12}
              logoHeight={32}
              className="opacity-50 hover:opacity-100 transition-opacity"
            />
            <LogoLoop
              logos={techRow2.map(t => ({
                node: (
                  <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-lg border border-border-strong/40 dark:border-white/5 bg-white/40 dark:bg-white/5 text-muted-foreground/40 hover:text-primary transition-all">
                    <div className="text-sm grayscale hover:grayscale-0">{t.node}</div>
                    <span className="text-[8px] font-bold uppercase tracking-widest mono">{t.title}</span>
                  </div>
                )
              }))}
              speed={35}
              direction="right"
              gap={12}
              logoHeight={32}
              className="opacity-50 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
