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
  WIDTH_HERO,
  WIDTH_UTILITIES,
  WIDTH_TIPS,
  WIDTH_EXAMPLES,
  WIDTH_PLAYGROUND,
} from "./data";

const widthCommonMistakes = [
  {
    title: "Using fixed widths on responsive layouts",
    reason: "Fixed widths don't adapt to different screen sizes and can cause overflow or unwanted whitespace.",
    example: "<div class=\"w-96\">...</div> // Breaks on mobile",
    level: "critical" as const
  },
  {
    title: "Not considering content overflow",
    reason: "Fixed width containers can clip content when it exceeds the defined width.",
    example: "<div class=\"w-32\">Very long text that will overflow...</div>",
    level: "warning" as const
  },
  {
    title: "Mixing width with padding incorrectly",
    reason: "Adding padding to an element with w-full makes it wider than its container due to the box model.",
    example: "<div class=\"w-full p-4\">...</div> // Total width = 100% + 32px",
    level: "warning" as const
  }
];

const widthMentalModel = {
  title: "Understanding Width in CSS",
  description: "Width utilities control the horizontal dimension of elements, affecting layout flow and content behavior.",
  features: [
    "Width sets the content area width (excluding padding, border, margin)",
    "Block elements default to 100% of parent width",
    "Inline elements ignore width unless changed to inline-block or block",
    "Percentage widths are calculated relative to the containing block"
  ],
  layerAssignment: "Layout properties that affect element positioning and space allocation",
  browserBehavior: "Browsers apply width based on the CSS box model and available horizontal space in the layout context."
};

const widthComparisonTable = {
  title: "Width Approaches Comparison",
  columns: ["Method", "Use Case", "Responsive", "Content Adapt"],
  rows: [
    {
      feature: "Fixed (w-48)",
      values: ["Consistent sizing", "Requires breakpoints", "No", "May overflow"]
    },
    {
      feature: "Fractional (w-1/2)",
      values: ["Relative layout", "Inherently responsive", "Yes", "Adapts with container"]
    },
    {
      feature: "Full (w-full)",
      values: ["Fill container", "Responsive by default", "Yes", "Grows with container"]
    },
    {
      feature: "Auto (w-auto)",
      values: ["Content-based", "Responsive to content", "Yes", "Perfect fit"]
    }
  ]
};

export default function WidthPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Hero */}
          <PageHero {...WIDTH_HERO} />

          {/* Mental Model */}
          <MentalModelSection {...widthMentalModel} />

          {/* Utilities */}
          <UtilityGrid
            title="Width utilities"
            items={WIDTH_UTILITIES}
          />

          {/* Comparison Table */}
          <ComparisonTable {...widthComparisonTable} />

          {/* Playground */}
          <UtilityPlayground {...WIDTH_PLAYGROUND} />

          {/* Common Mistakes */}
          <CommonMistakesSection 
            title="❌ Common Width Mistakes"
            mistakes={widthCommonMistakes}
          />

          {/* Real World Examples */}
          <div data-testid="Real World Examples">
            <ExampleSection title="Real-World Examples">
              {WIDTH_EXAMPLES.map((ex) => (
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
          <TipsSection tips={WIDTH_TIPS} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
