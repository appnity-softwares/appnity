import { Process } from "@/components/site/Process";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SEO } from "@/components/site/SEO";

const ProcessPage = () => {
  return (
    <SiteLayout>
      <SEO 
        title="Our Process · Strategy to Shipment" 
        description="High-transparency engineering process designed for speed and precision. Learn how we turn complex ideas into measurable profit."
      />
      <PageHeader
        eyebrow="How we work"
        title={
          <>
            <span className="text-foreground">A process built for</span>{" "}
            <span className="text-brand-gradient">shipping, not slides.</span>
          </>
        }
        description="Every engagement follows the same four-stage rhythm. No discovery theater, no 80-page decks, no waiting for a 'kickoff' that never ends."
      />
      <Process />
    </SiteLayout>
  );
};

export default ProcessPage;
