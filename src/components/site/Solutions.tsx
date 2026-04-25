import { useEffect, useState } from "react";
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
import { publicApi } from "@/services/api";

const iconMap: any = {
  Users: Users,
  BookOpen: BookOpen,
  Layers: Layers,
  School: School,
  Building2: Building2,
  ShoppingCart: ShoppingCart,
};

export const Solutions = () => {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const data = await publicApi.getServices();
        setSolutions(data || []);
      } catch (error) {
        console.error("Failed to fetch solutions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSolutions();
  }, []);

  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="container-tight">
        <div className="mb-20">
          <span className="mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary bg-primary/5 px-3 py-1 rounded">Our Expertise</span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl text-foreground">
            Architecture for
            <br />
            <span className="text-brand-gradient">Modern Enterprise.</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We don't just build apps; we engineer scalable systems that power growth. From distributed backends to high-conversion frontends.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse h-64 rounded-2xl bg-zinc-100" />
            ))
          ) : (
            solutions.map((s, i) => {
              const Icon = iconMap[s.icon] || Layers;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-border-strong bg-surface-1 p-8 transition-all hover:border-primary/20 hover:shadow-elevated"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground/80">
                    {s.description}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {s.features?.map((f: string) => (
                      <li key={f} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-foreground/60">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
