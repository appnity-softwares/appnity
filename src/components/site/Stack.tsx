import { motion } from "framer-motion";

const groups = [
  {
    label: "Frontend",
    items: [
      ["Next.js", "App Router, RSC, edge rendering — SEO and TTI in one tool."],
      ["React + TypeScript", "Strict mode, exhaustive types, no any in production."],
      ["Tailwind", "Design tokens, no CSS-in-JS runtime cost."],
    ],
  },
  {
    label: "Backend",
    items: [
      ["Node.js", "Mature ecosystem; ideal for I/O-heavy APIs and BFFs."],
      ["Go", "When throughput, concurrency, or memory ceiling matters."],
      ["Python", "Data, ML pipelines, and anywhere the libraries already live."],
    ],
  },
  {
    label: "Mobile",
    items: [
      ["React Native + Expo", "Single codebase, OTA updates, native modules where needed."],
      ["Flutter", "Pixel-perfect UI when brand fidelity is non-negotiable."],
    ],
  },
  {
    label: "AI",
    items: [
      ["OpenAI / Anthropic", "Frontier capability when accuracy beats cost."],
      ["Local LLMs (Llama, Qwen)", "Data residency, predictable latency, zero per-token bill."],
      ["RAG + pgvector", "Grounded answers with citations your users can verify."],
    ],
  },
  {
    label: "DevOps",
    items: [
      ["Docker + Terraform", "Reproducible infra; environments described, not clicked."],
      ["AWS / Cloudflare", "Whichever fits your data, latency, and cost envelope."],
      ["GitHub Actions", "CI/CD that's actually fast and actually debuggable."],
    ],
  },
];

export const Stack = () => {
  return (
    <section id="stack" className="relative flex h-screen flex-col justify-center py-10 overflow-hidden">
      <div className="container-tight h-full flex flex-col justify-center">
        <div className="mb-8 max-w-2xl">
          <span className="badge-dot mb-3">Stack</span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            We pick tools for reasons.
            <br />
            <span className="text-muted-foreground">Then we write them down.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-xl border border-border-strong bg-surface-1 p-5 shadow-sm"
            >
              <div className="mono mb-3 text-[10px] uppercase tracking-widest text-primary">
                {g.label}
              </div>
              <ul className="space-y-3">
                {g.items.map(([name, why]) => (
                  <li key={name} className="flex flex-col gap-1">
                    <span className="text-sm font-semibold tracking-tight">{name}</span>
                    <span className="text-[11px] leading-snug text-muted-foreground line-clamp-1">{why}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
