import { Process } from "@/components/site/Process";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

const ProcessPage = () => {
  return (
    <SiteLayout>
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
