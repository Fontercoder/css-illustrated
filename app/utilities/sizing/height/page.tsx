"use client"
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { UtilityGrid } from "@/components/shared/utility-grid";
import { TipsSection } from "@/components/shared/tips-section";
import { PageHero } from "@/components/shared/page-hero";
import { ExampleCard, ExampleSection } from "@/components/shared/example-section";
import { UtilityPlayground } from "@/components/shared/utility_playground";
import { CommonMistakesSection } from "@/components/shared/common-mistakes-section";
import { MentalModelSection } from "@/components/shared/mental-model-section";
import { ComparisonTable } from "@/components/shared/comparison-table";
import {
  HEIGHT_HERO,
  HEIGHT_UTILITIES,
  HEIGHT_TIPS,
  HEIGHT_EXAMPLES,
  HEIGHT_PLAYGROUND,
} from "./data";

const heightCommonMistakes = [
  {
    title: "Using h-full without parent height",
    reason: "h-full requires the parent element to have an explicit height set, otherwise it won't work.",
    example: "<div class=\"h-full\">Won't work</div> // Parent has no height",
    level: "critical" as const
  },
  {
    title: "Fixed heights causing content overflow",
    reason: "Fixed heights can clip content when it exceeds the defined height without proper overflow handling.",
    example: "<div class=\"h-32\">Very long content that gets clipped...</div>",
    level: "warning" as const
  },
  {
    title: "Using h-screen for mobile",
    reason: "h-screen includes browser UI height on mobile, making content taller than the visible area.",
    example: "<div class=\"h-screen\">Too tall on mobile due to browser UI</div>",
    level: "warning" as const
  }
];

const heightMentalModel = {
  title: "Understanding Height in CSS",
  description: "Height utilities control the vertical dimension of elements, affecting layout flow and content behavior.",
  features: [
    "Height sets the content area height (excluding padding, border, margin)",
    "Block elements default to auto height based on content",
    "h-full requires parent to have explicit height",
    "h-screen uses 100vh which includes browser UI on mobile"
  ],
  layerAssignment: "Layout properties that affect element positioning and vertical space allocation",
  browserBehavior: "Browsers calculate height based on content, parent constraints, and viewport dimensions."
};

const heightComparisonTable = {
  title: "Height Approaches Comparison",
  columns: ["Method", "Use Case", "Responsive", "Content Flow"],
  rows: [
    {
      feature: "Fixed (h-64)",
      values: ["Consistent sizing", "Requires breakpoints", "No", "May need overflow"]
    },
    {
      feature: "Auto (h-auto)",
      values: ["Content-based", "Responsive to content", "Yes", "Natural flow"]
    },
    {
      feature: "Full (h-full)",
      values: ["Fill parent", "Depends on parent", "Yes", "Constrained"]
    },
    {
      feature: "Screen (h-screen)",
      values: ["Full viewport", "Viewport-relative", "Yes", "Fixed to viewport"]
    }
  ]
};

export default function HeightPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Hero */}
          <PageHero {...HEIGHT_HERO} />

          {/* Mental Model */}
          <MentalModelSection {...heightMentalModel} />

          {/* Utilities */}
          <UtilityGrid
            title="Height utilities"
            items={HEIGHT_UTILITIES}
          />

          {/* Comparison Table */}
          <ComparisonTable {...heightComparisonTable} />

          {/* Playground */}
          <UtilityPlayground {...HEIGHT_PLAYGROUND} />

          {/* Common Mistakes */}
          <CommonMistakesSection 
            title="❌ Common Height Mistakes"
            mistakes={heightCommonMistakes}
          />

          {/* Real World Examples */}
          <div data-testid="Real World Examples">
            <ExampleSection title="Real-World Examples">
              {HEIGHT_EXAMPLES.map((ex) => (
                <ExampleCard
                  key={ex.title}
                  title={ex.title}
                  description={ex.description}
                  code={ex.code}
                >
                  {ex.preview}
                </ExampleCard>
              ))}
            </ExampleSection>
          </div>

          {/* Tips */}
          <TipsSection tips={HEIGHT_TIPS} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
