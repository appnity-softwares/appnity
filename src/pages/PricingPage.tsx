import { Pricing } from "@/components/site/Pricing";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { SEO } from "@/components/site/SEO";
import { CTA } from "@/components/site/CTA";
import { FAQ } from "@/components/site/FAQ";

const PricingPage = () => {
  return (
    <SiteLayout>
      <SEO 
        title="Pricing · Transparent Investment" 
        description="Learn about our engagement models, from fixed-project MVPs to monthly engineering retainers. Predictable costs for senior-grade output."
      />
      <PageHeader
        eyebrow="Pricing & Engagements"
        title={
          <>
            <span className="text-foreground">Predictable investment.</span>{" "}
            <br />
            <span className="text-brand-gradient">Senior engineering.</span>
          </>
        }
        description="We don't sell hours. We sell outcomes. Choose the model that fits your product stage and velocity requirements."
      />
      
      {/* Replaced PricingDetailed (Calculator) with simplified Pricing (INR) */}
      <Pricing />

      <div className="section-container bg-surface-1/40">
        <div className="container-tight">
          <FAQ />
        </div>
      </div>

      <CTA />
    </SiteLayout>
  );
};

export default PricingPage;
