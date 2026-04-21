import { Pricing } from "@/components/site/Pricing";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

const PricingPage = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Engagements"
        title={
          <>
            <span className="text-foreground">Fixed scope.</span>{" "}
            <span className="text-brand-gradient">Predictable price.</span>
          </>
        }
        description="Three engagement shapes. No retainers that quietly grow. No discovery fees. No surprise change orders."
      />
      <Pricing />
    </SiteLayout>
  );
};

export default PricingPage;
