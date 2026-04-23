import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Appnity didn't just build our platform; they built our business foundation. Their strategic insight into the Indian market was as valuable as their code.",
    author: "Rajesh Gupta",
    role: "Founder, Heritage Realty",
  },
  {
    quote: "Building a custom ERP seemed impossible until we met this team. They delivered a system that scales with our growth and handles thousands of daily orders.",
    author: "Ananya Sharma",
    role: "Managing Director, Shri Sai Logistics",
  },
  {
    quote: "The transparency in their process is unmatched. Finding a partner in India who delivers 'absolute precision' without constant supervision is a rare find.",
    author: "Vikram Singh",
    role: "Director, Edutech India",
  },
];

export const Testimonials = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden border-t border-border/50 bg-background py-20">
      {/* Precision Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] grid-bg" />
      
      <div className="container-tight relative z-10 px-6">
        <div className="mb-16 text-center">
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

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border-strong dark:border-white/5 bg-white/70 dark:bg-zinc-900/30 backdrop-blur-sm p-8 transition-all hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-elevated"
            >
              <Quote className="absolute -top-3 left-6 h-8 w-8 text-primary/20 fill-primary/10 transition-colors group-hover:text-primary/40" />
              <p className="relative z-10 text-sm italic leading-relaxed text-foreground/80 dark:text-zinc-300">
                "{t.quote}"
              </p>
              <div className="mt-8 border-t border-border/40 dark:border-white/5 pt-6 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {t.author[0]}
                </div>
                <div>
                  <div className="font-bold text-sm text-foreground dark:text-zinc-200">{t.author}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        <div className="mt-16 text-center">
          <p className="mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
            Trusted by 12+ Companies across India
          </p>
        </div>
      </div>
    </section>
  );
};

