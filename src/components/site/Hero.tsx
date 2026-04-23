import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section id="top" className="relative flex flex-col items-center justify-center overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24 noise">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 bg-gradient-radial blur-2xl" aria-hidden />

      <div className="container-tight relative flex -translate-y-5 flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <span className="badge-dot">Your strategic technology partner</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl text-center text-5xl font-semibold tracking-tight md:text-7xl"
        >
          <span className="text-foreground">We build the software</span>
          <br />
          <span className="text-brand-gradient">that scales your business.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground"
        >
          Forget technical debt and broken promises. We partner with ambitious founders 
          to ship bulletproof systems that turn complex ideas into measurable profit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            Schedule a strategy call
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full hairline px-8 py-4 text-sm font-medium text-foreground hover:bg-surface-2 transition-colors"
          >
            Explore our systems
          </a>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60"
        >
          Trusted by founders across FinTech, HealthTech, and E-commerce
        </motion.p>
      </div>
    </section>
  );
};
