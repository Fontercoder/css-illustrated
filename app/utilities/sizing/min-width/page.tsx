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
  MIN_WIDTH_HERO,
  MIN_WIDTH_UTILITIES,
  MIN_WIDTH_TIPS,
  MIN_WIDTH_EXAMPLES,
  MIN_WIDTH_PLAYGROUND,
} from "./data";

const minWidthCommonMistakes = [
  {
    title: "Not using min-w-0 in flex containers",
    reason: "Flex items have min-width: auto by default, preventing them from shrinking smaller than their content.",
    example: "<div class=\"flex\"><div class=\"flex-1\">Long text...</div></div> // Won't shrink",
    level: "critical" as const
  },
  {
    title: "Setting min-width larger than available space",
    reason: "When min-width exceeds available space, it causes overflow or breaks responsive layouts.",
    example: "<div class=\"min-w-screen w-full\">...</div> // Always causes overflow",
    level: "warning" as const
  },
  {
    title: "Confusing min-width with width",
    reason: "min-width sets a lower bound, not the actual width. Elements can still grow larger.",
    example: "<div class=\"min-w-48 w-full\">...</div> // Width = full, min = 48",
    level: "info" as const
  }
];

const minWidthMentalModel = {
  title: "Understanding Min-Width in CSS",
  description: "Min-width utilities establish a lower boundary for element width, preventing excessive shrinking while allowing growth.",
  features: [
    "Sets minimum width constraint but allows growth",
    "Flex items default to min-width: auto",
    "Prevents content from becoming unreadable",
    "Works with width, max-width, and responsive prefixes"
  ],
  layerAssignment: "Constraint-based layout properties that define minimum space requirements",
  browserBehavior: "Browsers enforce minimum width during layout calculations and flex/grid distribution."
};

const minWidthComparisonTable = {
  title: "Width Constraints Comparison",
  columns: ["Property", "Behavior", "Use Case", "Typical Values"],
  rows: [
    {
      feature: "width",
      values: ["Fixed size", "Consistent dimensions", "w-48, w-64", "Pixels, rem, %"]
    },
    {
      feature: "min-width",
      values: ["Minimum boundary", "Prevents shrinking", "min-w-48, min-w-0", "Same as width"]
    },
    {
      feature: "max-width",
      values: ["Maximum boundary", "Prevents overflow", "max-w-xl, max-w-full", "Same as width"]
    },
    {
      feature: "Combined",
      values: ["Range constraint", "Flexible but bounded", "min-w-32 max-w-64", "All of above"]
    }
  ]
};

export default function MinWidthPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Hero */}
          <PageHero {...MIN_WIDTH_HERO} />

          {/* Mental Model */}
          <MentalModelSection {...minWidthMentalModel} />

          {/* Utilities */}
          <UtilityGrid
            title="Min-width utilities"
            items={MIN_WIDTH_UTILITIES}
          />

          {/* Comparison Table */}
          <ComparisonTable {...minWidthComparisonTable} />

          {/* Playground */}
          <UtilityPlayground {...MIN_WIDTH_PLAYGROUND} />

          {/* Common Mistakes */}
          <CommonMistakesSection 
            title="❌ Common Min-Width Mistakes"
            mistakes={minWidthCommonMistakes}
          />

          {/* Real World Examples */}
          <div data-testid="Real World Examples">
            <ExampleSection title="Real-World Examples">
              {MIN_WIDTH_EXAMPLES.map((ex) => (
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
          <TipsSection tips={MIN_WIDTH_TIPS} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
