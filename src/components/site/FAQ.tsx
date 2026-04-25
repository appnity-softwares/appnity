import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { publicApi } from "@/services/api";

export const FAQ = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await publicApi.getFAQs();
        setFaqs(data || []);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <section className="py-24 bg-surface-1/30">
      <div className="container-tight">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="label-high-contrast">Common Questions</span>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Everything you need to
              <br />
              <span className="text-brand-gradient">know before starting.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We believe in radical transparency. If you have a question that isn't answered here, feel free to reach out directly.
            </p>
          </div>

          <div className="rounded-3xl border border-border-strong bg-card p-8 shadow-sm">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse h-12 bg-zinc-100 rounded mb-4" />
              ))
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={faq.id} value={`item-${i}`} className="border-border/50">
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
