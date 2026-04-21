import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  client: string;
  industry: string;
  year: number;
  stack: string[];
  outcomes: { metric: string; label: string }[];
  featured: boolean;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Portfolio · Appnity Softwares";
    supabase
      .from("projects")
      .select("id,slug,title,tagline,client,industry,year,stack,outcomes,featured")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setProjects((data as unknown as Project[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Portfolio · 12 systems shipped"
        title={
          <>
            <span className="text-foreground">Systems we've built,</span>
            <br />
            <span className="text-brand-gradient">measured in production.</span>
          </>
        }
        description="Each project is anonymized where required, but the architecture decisions and the numbers are real. Click any project for the full case study."
      />

      <section className="py-20">
        <div className="container-tight">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl border border-border bg-surface-1" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link
                    to={`/work/${p.slug}`}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-border-strong bg-surface-1 p-8 shadow-card transition-all hover:shadow-elevated"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                    <div className="flex items-start justify-between gap-4">
                      <span className="mono text-xs uppercase tracking-widest text-primary">
                        {p.industry} · {p.year}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold tracking-tight">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 5).map((s) => (
                        <span
                          key={s}
                          className="mono rounded-md border border-border-strong bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-3 divide-x divide-border-strong rounded-xl border border-border-strong bg-background/40">
                      {p.outcomes.slice(0, 3).map((o) => (
                        <div key={o.label} className="px-3 py-3 text-center">
                          <div className="text-base font-semibold tracking-tight">{o.metric}</div>
                          <div className="mt-0.5 text-[10px] text-muted-foreground">{o.label}</div>
                        </div>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}

              {projects.length === 0 && (
                <p className="col-span-2 text-center text-sm text-muted-foreground">
                  No projects yet. Add one from the admin panel.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Portfolio;
