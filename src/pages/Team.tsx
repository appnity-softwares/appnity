import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/integrations/supabase/client";

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar_url: string | null;
  links: { twitter?: string; github?: string; linkedin?: string };
}

const Team = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Team · Appnity Softwares";
    
    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .order("sort_order", { ascending: true });
        
        if (error) throw error;
        setMembers((data as unknown as Member[]) || []);
      } catch (err) {
        console.error("Error fetching team members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The people"
        title={
          <>
            <span className="text-foreground">A small team of</span>{" "}
            <span className="text-brand-gradient">senior engineers.</span>
          </>
        }
        description="No account managers. No junior-to-senior pyramid. The person you talk to is the person writing the code."
      />

      <section className="py-20">
        <div className="container-tight">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl border border-border bg-surface-1" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {members.map((m, i) => (
                <motion.article
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-border-strong bg-surface-1 p-6 shadow-card transition-all hover:shadow-elevated"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-semibold text-primary-foreground">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{m.name}</h3>
                  <p className="mono mt-1 text-xs uppercase tracking-widest text-primary">{m.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>

                  <div className="mt-5 flex items-center gap-3">
                    {m.links?.twitter && (
                      <a href={m.links.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground" aria-label="Twitter">
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {m.links?.github && (
                      <a href={m.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {m.links?.linkedin && (
                      <a href={m.links.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground" aria-label="LinkedIn">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <div className="mt-20 rounded-2xl border border-border-strong bg-surface-1 p-10 text-center shadow-card">
            <h2 className="text-2xl font-semibold tracking-tight">We hire rarely. We look for craft.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              If you've shipped distributed systems, designed product surfaces that feel inevitable, or built AI
              pipelines that hold up in production — we'd like to hear from you.
            </p>
            <a
              href="mailto:careers@appnity.softwares"
              className="mono mt-6 inline-block text-xs text-primary underline-offset-4 hover:underline"
            >
              careers@appnity.softwares →
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Team;
