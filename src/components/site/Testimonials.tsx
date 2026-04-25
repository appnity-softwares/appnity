import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { publicApi } from "@/services/api";

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await publicApi.getTestimonials();
        setTestimonials(data || []);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="relative min-h-screen flex flex-col justify-center overflow-hidden border-t border-border/50 bg-background py-16 md:py-24">
      {/* Precision Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] grid-bg" />

      <div className="container-tight relative z-10 px-6">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="h-px w-6 bg-primary/30" />
            <span className="mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary/70">Social Proof</span>
            <div className="h-px w-6 bg-primary/30" />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-foreground">
            Success stories from
            <br />
            <span className="text-brand-gradient">partners who trust us.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse h-48 rounded-2xl bg-zinc-100" />
            ))
          ) : (
            testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col rounded-2xl border border-border-strong dark:border-white/5 bg-white/70 dark:bg-zinc-900/30 backdrop-blur-sm p-6 transition-all hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-elevated h-full"
              >
                <Quote className="absolute -top-3 left-6 h-6 w-6 text-primary/20 fill-primary/10 transition-colors group-hover:text-primary/40" />
                <p className="relative z-10 text-[11px] leading-relaxed text-foreground/80 dark:text-zinc-300 italic flex-1">
                  "{t.quote}"
                </p>
                <div className="mt-6 border-t border-border/40 dark:border-white/5 pt-4 flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-[12px] text-foreground dark:text-zinc-200">{t.name}</div>
                    <div className="text-[8px] uppercase tracking-widest text-primary/70 font-bold">{t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
            Real Proof. Real People. Real Results.
          </p>
        </div>
      </div>
    </section>
  );
};
