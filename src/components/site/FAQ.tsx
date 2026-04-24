import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Most MVP systems ship within 6-8 weeks. Larger enterprise platforms can take 3-5 months. We work in 2-week sprints so you see progress constantly.",
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes. We offer managed cloud maintenance and 'Fractional CTO' services to ensure your systems remain secure and scalable as you grow.",
  },
  {
    question: "Will I own the code?",
    answer: "Absolutely. Once the final payment is made, you own 100% of the IP and the source code. No vendor lock-in, ever.",
  },
  {
    question: "How do we communicate during development?",
    answer: "We set up a dedicated Slack channel for your team and conduct weekly video demos. You'll have direct access to the senior engineers working on your project.",
  },
  {
    question: "Can you help me migrate from a legacy system?",
    answer: "Yes, we specialize in legacy modernization—moving your old systems to modern, cloud-native architectures without losing data or causing downtime.",
  },
];

export const FAQ = () => {
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
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
