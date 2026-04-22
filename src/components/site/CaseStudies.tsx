import { motion } from "framer-motion";

const cases = [
  {
    tag: "Fintech · Series B",
    client: "A B2B payments platform processing $2.1B/yr",
    problem:
      "Dashboard rendering 60k+ rows froze the UI; webhook ingestion lost ~0.4% of events under burst load.",
    solution: [
      "Replaced client-side aggregation with server-streamed virtualized tables",
      "Rebuilt webhook ingest as an idempotent, partitioned queue with replay",
      "Introduced p95/p99 SLOs wired into PagerDuty",
    ],
    stack: ["Next.js", "Postgres", "Kafka", "Go", "Grafana"],
    outcomes: [
      ["98%", "faster dashboard load"],
      ["0", "webhook events lost (90d)"],
      ["3.1×", "throughput per worker"],
    ],
  },
  {
    tag: "Vertical SaaS · Seed",
    client: "Operations platform for healthcare clinics",
    problem:
      "12-week build cycles. New features required schema migrations that broke staging weekly.",
    solution: [
      "Modular monolith with versioned API contracts and typed SDK",
      "Migration framework with shadow tables + automated rollback",
      "Preview environments per PR with seeded production-like data",
    ],
    stack: ["TypeScript", "Postgres", "tRPC", "Terraform", "AWS"],
    outcomes: [
      ["4 days", "new feature → production"],
      ["0", "broken deploys in Q1"],
      ["62%", "cut in infra cost"],
    ],
  },
  {
    tag: "AI · Pre-seed",
    client: "Legal research copilot for litigation teams",
    problem:
      "Generic GPT-4 answers cited cases that didn't exist. Trust collapsed after week one.",
    solution: [
      "RAG over 4.2M case documents with hybrid BM25 + vector retrieval",
      "Citation grounding layer rejecting any unverified claim",
      "Eval harness running 1,200 golden queries on every model change",
    ],
    stack: ["Python", "pgvector", "OpenAI", "LangGraph", "Ragas"],
    outcomes: [
      ["0%", "hallucinated citations"],
      ["91%", "answer relevance score"],
      ["$0.04", "avg cost per query"],
    ],
  },
];

export const CaseStudies = () => {
  return (
    <section id="work" className="relative flex h-screen flex-col justify-center overflow-hidden py-10">
      <div className="container-tight h-full flex flex-col justify-center">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="badge-dot mb-3">Selected work</span>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Engineering decisions,<br />
              <span className="text-muted-foreground">not screenshots.</span>
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.client}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-xl border border-border-strong bg-surface-1 p-5 shadow-sm md:p-6"
            >
              <div className="grid gap-6 md:grid-cols-12 items-center">
                <div className="md:col-span-4">
                  <span className="mono text-[10px] uppercase tracking-widest text-primary">{c.tag}</span>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight">{c.client}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">{c.problem}</p>
                </div>

                <div className="md:col-span-5">
                  <div className="rounded-lg border border-border-strong bg-background/60 p-3">
                    <ul className="space-y-1.5">
                      {c.solution.slice(0, 2).map((s) => (
                        <li key={s} className="flex gap-2 text-xs text-foreground/90">
                          <span className="mt-1.5 h-0.5 w-2 shrink-0 bg-primary" />
                          <span className="truncate">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="grid grid-cols-3 divide-x divide-border-strong rounded-lg border border-border-strong bg-background/40">
                    {c.outcomes.map(([n, l]) => (
                      <div key={l} className="px-2 py-2 text-center">
                        <div className="text-sm font-semibold tracking-tight">{n}</div>
                        <div className="mt-0.5 text-[9px] text-muted-foreground truncate">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
