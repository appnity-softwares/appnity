import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const CTA = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("leads")
        .insert([{ email, message, source: "footer_cta" }]);

      if (error) throw error;
      
      setSuccess(true);
      toast({
        title: "Message sent",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-container border-t border-border bg-background">
      <div className="container-tight relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="badge-dot mb-4">Let's talk business</span>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Ready to turn your vision into 
              <br />
              <span className="text-brand-gradient">measurable profit?</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Whether you're looking to build a new system or fix an existing one, 
              we're here to provide the strategic engineering you need.
            </p>
            
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Direct access to senior engineers</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Zero-obligation strategy session</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-accent/5 to-transparent blur-2xl" />
            
            <form 
              onSubmit={handleSubmit}
              className="relative rounded-2xl border border-border-strong bg-card p-8 shadow-xl"
            >
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Strategy call scheduled!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Check your inbox. We'll be in touch shortly to finalize the time.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Business Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-border-strong bg-surface-1 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your goals or challenges..."
                      className="min-h-[120px] w-full resize-none rounded-xl border border-border-strong bg-surface-1 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Request a strategy session"}
                    <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <p className="text-center text-[10px] text-muted-foreground">
                    No spam. Just engineering-grade strategic advice.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
