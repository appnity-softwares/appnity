import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section id="top" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-32 noise">
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
          <span className="badge-dot">Now building the future with Appnity Softwares</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl text-center text-5xl font-semibold tracking-tight md:text-7xl"
        >
          <span className="text-foreground">Transforming bold visions</span>
          <br />
          <span className="text-brand-gradient">into engineering reality.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground"
        >
          We architect and build the web platforms, intelligence layers, and systems that 
          turn high-stakes ideas into bulletproof digital leverage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            Start a project
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full hairline px-6 py-3 text-sm font-medium text-foreground hover:bg-surface-2"
          >
            View work
          </a>
        </motion.div>
      </div>
    </section>
  );
};
