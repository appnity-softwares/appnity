import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  client: string;
  industry: string;
  year: number;
  problem: string;
  approach: string[];
  outcomes: { metric: string; label: string }[];
  stack: string[];
}

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        setProject(data as unknown as Project | null);
        setLoading(false);
        if (data) document.title = `${(data as { title: string }).title} · Appnity`;
      });
  }, [slug]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="container-tight pt-44 pb-32">
          <div className="h-8 w-32 animate-pulse rounded bg-surface-2" />
          <div className="mt-6 h-12 w-2/3 animate-pulse rounded bg-surface-2" />
        </div>
      </SiteLayout>
    );
  }

  if (!project) {
    return (
      <SiteLayout>
        <div className="container-tight pt-44 pb-32 text-center">
          <h1 className="text-3xl font-semibold">Case study not found</h1>
          <Link to="/portfolio" className="mono mt-6 inline-block text-sm text-primary hover:underline">
            ← Back to portfolio
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article className="relative pt-36 pb-24 md:pt-44 noise">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
        <div className="container-tight relative">
          <Link
            to="/portfolio"
            className="mono inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All work
          </Link>

          <div className="mt-8 max-w-3xl">
            <span className="mono text-xs uppercase tracking-widest text-primary">
              {project.industry} · {project.year}
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{project.title}</h1>
            <p className="mt-4 text-xl text-muted-foreground">{project.tagline}</p>
            <p className="mono mt-2 text-xs text-muted-foreground">Client: {project.client}</p>
          </div>
        </div>
      </article>

      <section className="py-12">
        <div className="container-tight grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="mono text-xs uppercase tracking-widest text-muted-foreground">The problem</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">{project.problem}</p>

            <h3 className="mono mt-10 text-xs uppercase tracking-widest text-muted-foreground">Stack</h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="mono rounded-md border border-border-strong bg-surface-2 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-2xl border border-border-strong bg-surface-1 p-6 md:p-8 shadow-card">
              <p className="mono text-xs uppercase tracking-widest text-muted-foreground">Architecture</p>
              <ul className="mt-4 space-y-3">
                {project.approach.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-2 h-1 w-3 shrink-0 bg-primary" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid grid-cols-3 divide-x divide-border-strong rounded-2xl border border-border-strong bg-background">
              {project.outcomes.map((o) => (
                <div key={o.label} className="px-4 py-6 text-center">
                  <div className="text-2xl font-semibold tracking-tight md:text-3xl">{o.metric}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{o.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-tight">
          <div className="rounded-2xl border border-border-strong bg-surface-1 p-10 text-center shadow-card">
            <h2 className="text-3xl font-semibold tracking-tight">Have a similar system to build?</h2>
            <p className="mt-3 text-muted-foreground">A senior engineer will reply within one business day.</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform"
            >
              Start a project →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default CaseStudy;
