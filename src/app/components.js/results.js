import { BrandingSection } from "@/components/BrandingSection";
import { PressSection } from "@/components/PressSection";
import { InsightsSection } from "@/components/InsightsSection";


export function ResultsSection() {
  

  return (
    <div className="py-16 px-4 md:px-8 space-y-24 max-w-6xl mx-auto">
      {/* Branding Section */}
      <section>
        <BrandingSection
          artistData={artistData}
          branding={promptResults.brandingConsultant.data}
          tagline={promptResults.taglineWriter.data}
          socialMedia={promptResults.socialMediaWriter.data}
          isGenerating={promptResults.brandingConsultant.loading || promptResults.socialMediaWriter.loading}
        />
      </section>

      {/* Press Section */}
      <section>
        <PressSection
          artistData={artistData}
          press={promptResults.pressReleaseWriter.data}
          bio={promptResults.biographyWriter.data}
          loading={promptResults.pressReleaseWriter.loading || promptResults.biographyWriter.loading}
        />
      </section>

      {/* Insights Section */}


     
    </div>
  );
}