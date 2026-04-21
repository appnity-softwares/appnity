import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const CTA = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({ email, message });
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't send your brief. Try emailing us directly.");
      return;
    }
    setSubmitted(true);
    setEmail("");
    setMessage("");
    toast.success("Brief received. We'll reply within one business day.");
  };

  return (
    <section id="contact" className="relative flex min-h-screen flex-col justify-center py-32">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface-1 p-10 md:p-16 noise"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-80" aria-hidden />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 bg-gradient-radial blur-2xl" aria-hidden />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="badge-dot">2 build slots open · Q2</span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              <span className="text-gradient">Have a system</span>
              <br />
              <span className="text-foreground">worth getting right?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Send us a paragraph about what you're building. You'll hear back from a senior
              engineer within one business day — not a sales rep, not a form letter.
            </p>

            {submitted ? (
              <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border-strong bg-background/60 p-8 text-left shadow-elevated">
                <p className="mono text-xs text-primary">// brief received</p>
                <p className="mt-3 text-lg text-foreground">
                  Thanks — your message is in. A senior engineer will reply within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mono mt-4 text-xs text-muted-foreground underline-offset-4 hover:underline"
                >
                  Send another brief
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="mx-auto mt-10 max-w-xl rounded-2xl border border-border-strong bg-background/60 p-2 text-left shadow-elevated"
              >
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="We're a Series A fintech. Our payments dashboard is slow and our webhook ingestion drops events under load…"
                  className="w-full resize-none rounded-xl bg-transparent p-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />
                <div className="flex flex-col gap-3 border-t border-border-strong p-3 sm:flex-row sm:items-center sm:justify-between">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 rounded-lg bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending
                      </>
                    ) : (
                      <>
                        Send brief <span>→</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <p className="mono mt-5 text-xs text-muted-foreground">
              Or email <a className="text-foreground underline-offset-4 hover:underline" href="mailto:hello@appnity.softwares">hello@appnity.softwares</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
