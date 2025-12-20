"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageHero } from "@/components/shared/page-hero"
import { UtilityGrid } from "@/components/shared/utility-grid"
import { UtilityPlayground } from "@/components/shared/utility_playground"
import { ExampleSection, ExampleCard } from "@/components/shared/example-section"
import { TipsSection } from "@/components/shared/tips-section"
import { CommonMistakesSection } from "@/components/shared/common-mistakes-section"
import { MentalModelSection } from "@/components/shared/mental-model-section"
import { ComparisonTable } from "@/components/shared/comparison-table"
import { RealWorldExamples } from "@/components/shared/real-world-examples"
import CodeBlock from "@/app/utilities/components/code-block"

export default function FontLayoutPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
            <PageHero 
              title="Font Utilities Overview"
              description="Complete guide to CSS font utilities for modern web development. Master typography through family, size, and weight properties to create readable and visually appealing interfaces."
            />

            <MentalModelSection
              title="Understanding Font Architecture"
              description="Typography is the foundation of readable interfaces. Font properties control how text renders, affecting readability, visual hierarchy, and user experience across all devices and screen sizes."
              features={[
                "Font family determines the typeface and visual personality",
                "Font size controls readability and visual hierarchy",
                "Font weight establishes emphasis and information structure",
                "Line height affects vertical rhythm and reading comfort",
                "Letter spacing improves legibility and brand consistency"
              ]}
              layerAssignment="Typography Layer - Controls text rendering and visual communication"
              browserBehavior="Browser renders text using system fonts or downloaded web fonts, calculating metrics based on font file and CSS properties"
            />

            <ComparisonTable
              title="Font Properties Comparison"
              columns={["Property", "What It Controls", "Common Use Cases", "Visual Impact"]}
              rows={[
                {
                  feature: "Family",
                  values: ["Typeface selection", "Brand identity", "Readability", "Visual personality"]
                },
                {
                  feature: "Size", 
                  values: ["Text scale", "Hierarchy", "Readability", "Responsive design"]
                },
                {
                  feature: "Weight", 
                  values: ["Text thickness", "Emphasis", "Visual weight", "Information structure"]
                },
                {
                  feature: "Line Height", 
                  values: ["Vertical spacing", "Reading rhythm", "Density", "Visual comfort"]
                }
              ]}
            />

            <UtilityGrid
              title="Font Utilities Overview"
              items={[
                { cls: "font-sans", desc: "System sans-serif (default)" },
                { cls: "font-serif", desc: "System serif font" },
                { cls: "font-mono", desc: "Monospace font" },
                { cls: "text-xs", desc: "Extra small text (12px)" },
                { cls: "text-sm", desc: "Small text (14px)" },
                { cls: "text-base", desc: "Base text (16px)" },
                { cls: "text-lg", desc: "Large text (18px)" },
                { cls: "text-xl", desc: "Extra large text (20px)" },
                { cls: "text-2xl", desc: "2X large text (24px)" },
                { cls: "text-3xl", desc: "3X large text (30px)" },
                { cls: "font-thin", desc: "100 weight" },
                { cls: "font-light", desc: "300 weight" },
                { cls: "font-normal", desc: "400 weight (default)" },
                { cls: "font-medium", desc: "500 weight" },
                { cls: "font-semibold", desc: "600 weight" },
                { cls: "font-bold", desc: "700 weight" }
              ]}
            />

            <section className="space-y-6 border-t pt-8">
              <h2 className="text-3xl font-bold">Interactive Playground</h2>
              <p className="text-muted-foreground">Experiment with different font combinations and see how they affect readability and visual hierarchy.</p>

              <UtilityPlayground
                title="Font Playground"
                description="Test font properties and see real-time effects on text rendering and readability."
                options={["font-sans", "font-serif", "font-mono"]}
                defaultValue="font-sans"
                buildMarkup={(value, customClasses = "") => {
                  const classes = [value, customClasses].filter(Boolean).join(" ")
                  return `<p class="${classes}">The quick brown fox jumps over the lazy dog</p>`
                }}
                renderPreview={(value, customClasses = "") => {
                  return (
                    <p className={`${value} ${customClasses} text-white text-lg`}>
                      The quick brown fox jumps over the lazy dog
                    </p>
                  )
                }}
              />
            </section>

            <ExampleSection title="Real-World Examples">
              <ExampleCard
                title="Article Heading"
                description="Large bold heading with serif font for editorial content"
                code={`<h1 class="font-serif text-4xl font-bold text-gray-900">
  Article Title
</h1>`}
              >
                <h1 className="font-serif text-4xl font-bold text-gray-900">
                  Article Title
                </h1>
              </ExampleCard>

              <ExampleCard
                title="Navigation Menu"
                description="Clean navigation with consistent font weight and hover states"
                code={`<nav class="flex gap-6">
  <a href="#" class="font-medium text-gray-700 hover:text-blue-600 transition-colors">Home</a>
  <a href="#" class="font-medium text-gray-700 hover:text-blue-600 transition-colors">About</a>
</nav>`}
              >
                <nav className="flex gap-6 p-4">
                  <a href="#" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                  <a href="#" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">About</a>
                  <a href="#" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Features</a>
                </nav>
              </ExampleCard>

              <ExampleCard
                title="Code Block"
                description="Monospace font with appropriate sizing for code snippets"
                code={`<pre class="font-mono text-sm bg-gray-900 text-green-400 p-4 rounded">
  <code>console.log('Hello, World!');</code>
</pre>`}
              >
                <pre className="font-mono text-sm bg-gray-900 text-green-400 p-4 rounded max-w-md">
                  <code>console.log('Hello, World!');</code>
                </pre>
              </ExampleCard>

              <ExampleCard
                title="Card Component"
                description="Typography hierarchy in a card layout"
                code={`<div class="bg-white p-6 rounded-lg shadow">
  <h3 class="font-semibold text-lg text-gray-900">Card Title</h3>
  <p class="text-gray-600 mt-2">Card description text</p>
  <p class="text-sm text-gray-500 mt-4">Metadata or date</p>
</div>`}
              >
                <div className="bg-white p-6 rounded-lg shadow max-w-md">
                  <h3 className="font-semibold text-lg text-gray-900">Card Title</h3>
                  <p className="text-gray-600 mt-2">Card description text</p>
                  <p className="text-sm text-gray-500 mt-4">Metadata or date</p>
                </div>
              </ExampleCard>
            </ExampleSection>

            <CommonMistakesSection
              mistakes={[
                {
                  title: "Using too many font families",
                  reason: "Multiple typefaces create visual noise and inconsistency, reducing readability and brand cohesion.",
                  example: "font-serif font-mono font-sans",
                  level: "critical"
                },
                {
                  title: "Insufficient contrast between sizes",
                  reason: "Text sizes that are too similar create unclear hierarchy and make content difficult to scan.",
                  example: "text-base text-lg text-xl",
                  level: "warning"
                },
                {
                  title: "Accessibility issues with small text",
                  reason: "Text smaller than 16px can be difficult to read, especially for users with visual impairments.",
                  example: "text-xs text-xs leading-none",
                  level: "critical"
                },
                {
                  title: "Ignoring system font preferences",
                  reason: "Not respecting user's font preferences can make content harder to read for users with specific needs.",
                  example: "font-custom absolute settings",
                  level: "info"
                }
              ]}
            />

            <TipsSection 
              tips={[
                { bold: "Establish hierarchy:", text: "Use consistent size and weight combinations for headers, body, and metadata" },
                { bold: "Consider readability:", text: "Ensure sufficient contrast and size for comfortable reading" },
                { bold: "Limit font families:", text: "Use 2-3 typefaces maximum for cohesive design" },
                { bold: "Responsive typography:", text: "Scale text appropriately across different screen sizes" },
                { bold: "Performance:", text: "Use system fonts for faster loading and better performance" }
              ]}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}