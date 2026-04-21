import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}

export const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-24 noise">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 bg-gradient-radial blur-2xl" aria-hidden />

      <div className="container-tight relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-dot">{eyebrow}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};
