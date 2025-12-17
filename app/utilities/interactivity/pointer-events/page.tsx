"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageTitle from "@/components/otherComponents/pageTitle"
import UtilityCard from "@/components/otherComponents/utilityClassCard"
import UtilityExaButtons from "@/components/otherComponents/utilityExaBtn"
import PreviewPanel from "@/components/otherComponents/previewPanel"
import ExampleCard from "@/components/otherComponents/realWorldExampleCard"
import SummaryTips from "@/components/otherComponents/summaryTips"

const utilities = [
  {
    className: "pointer-events-auto",
    desc: "Element responds to mouse and touch interactions",
  },
  {
    className: "pointer-events-none",
    desc: "Element ignores all pointer interactions",
  },
]

export default function PointerEventsPage() {
  const utilityOptions = utilities.map((u) => u.className)
  const [activeUtility, setActiveUtility] = useState(utilityOptions[0])
  const [code, setCode] = useState("")

  useEffect(() => {
    setCode(
      `
  <div class="relative inline-block group">
  <button
    type="button"
    class="px-6 py-6 rounded bg-black/10 text-white
           focus:outline-none focus:ring-2 focus:ring-blue-400"
    aria-haspopup="true"
  >
    Background content
  </button>
  <div
    class="absolute inset-0 z-20 flex items-center justify-center
           rounded border bg-blue-300/50 text-green-900
           opacity-0 ${activeUtility}
           transition-opacity duration-200
           group-hover:opacity-100
           group-hover:${activeUtility}
           group-focus-within:opacity-100
           group-focus-within:${activeUtility}"
    role="dialog"
  >
    <div class="rounded border bg-white px-4 py-2 shadow">
      Popup
    </div>
  </div>
</div>
      `.trim()
    )
  }, [activeUtility])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          <PageTitle
            title="Pointer Events"
            description="Control whether an element can receive mouse, touch, and pointer interactions."
          />

          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Pointer Events Utilities</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {utilities.map((u) => (
                <UtilityCard
                  key={u.className}
                  classNameValue={u.className}
                  description={u.desc}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Interactive Playground</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="space-y-4">
                <UtilityExaButtons
                  label="Pointer Events"
                  options={utilityOptions}
                  activeValue={activeUtility}
                  onSelect={setActiveUtility}
                />
              </div>

              <div className="md:col-span-2">
                <PreviewPanel
                  title="Live Preview"
                  code={code}
                  onCodeChange={setCode}
                  previewClass="p-4"
                  description="Toggle pointer events to see how clicks pass through overlays."
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">

              <ExampleCard
                title="Input icons"
                code={`<div class="relative bg-black/10 rounded">
  <input
    class="w-full border rounded px-3 py-2 pr-8"
    placeholder="Search"
  />
  <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
    🔍
  </span>
</div>`}
                description="Ensure decorative icons do not interfere with input focus."
              >
                
              </ExampleCard>

              <ExampleCard
                title="Disabled premium features"
                code={`<div
  class="relative rounded border bg-card p-4 opacity-60 pointer-events-none"
  aria-disabled="true"
>
  <h4 class="mb-2 text-sm font-semibold text-muted-foreground">
    Premium Feature
  </h4>

  <button
    type="button"
    class="rounded bg-green-600 px-3 py-1 text-white
           cursor-pointer pointer-events-auto hover:bg-green-500 opacity-100"
  >
    Upgrade Subscription Plan
  </button>
</div>

`}
                description="Prevent users to use premium features without premium subscription."
              >
              </ExampleCard>

              <ExampleCard
                title="Popup overlay"
                code={`<div class="relative h-40 rounded bg-slate-900 text-slate-200 p-4">
  <span class="px-4 py-2 rounded text-sm">
    Page content is not interactable due to Popup
  </span>

  <div class="absolute inset-0 bg-black/40 pointer-events-none flex items-center justify-center">
    <div class="bg-slate-800 rounded-lg px-5 py-4 w-48 pointer-events-auto">
      <p class="text-sm mb-3">Popup content</p>

      <button
        class="px-3 py-1 w-full rounded text-sm bg-green-600
               cursor-pointer
               transition-colors duration-200
               hover:bg-green-500
               focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Confirm
      </button>
    </div>
  </div>
</div>
`}
              description="Popup allows interaction inside while preventing background clicks."
            />
            {/* new added */}
            

            <ExampleCard
              title="Decorative overlay"
              description="Purely decorative layers should never block underlying controls."
              code={`<div class="relative h-40 overflow-hidden rounded bg-slate-800 p-4 text-white">
  <p class="mb-1 text-xs text-slate-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <p class="mb-1 text-xs text-slate-300">Sed do eiusmod tempor incididunt ut labore et dolore.</p>
  <p class="mb-1 text-xs text-slate-300">Ut enim ad minim veniam, quis nostrud exercitation.</p>
  <p class="mb-3 text-xs text-slate-300">Duis aute irure dolor in reprehenderit in voluptate.</p>

  <button
    type="button"
    class="rounded bg-blue-700 px-4 py-2 text-sm
           cursor-pointer transition-colors
           hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    Action
  </button>

  <!-- Decorative overlay -->
  <div
    class="pointer-events-none absolute inset-0
           bg-gradient-to-br from-pink-500/40 to-yellow-400/40"
    aria-hidden="true"
  ></div>
</div>`}
>
            </ExampleCard>

  
  <ExampleCard
    title="Enlarged hit area (invisible)"
    code={`<div class="relative h-40 rounded bg-slate-800 flex items-center justify-center text-white">
      <div class="relative px-6 py-4 bg-slate-700 rounded text-sm">
        Target
        <span class="absolute inset-0 pointer-events-auto" />
      </div>
    </div>`}
    description="Increase clickable area without changing visual size."
  >

  </ExampleCard>

             
            </div>
          </div>

          <SummaryTips
            items={[
              "1. pointer-events-none allows clicks to pass through elements.",
              "2. Commonly used for overlays, icons, and visual effects.",
              "3. Avoid disabling pointer events on interactive elements.",
              "4. pointer-events-auto restores default behavior.",
              "5. Useful for layered UI designs.",
              "6. Does not affect keyboard focus behavior.",
              "7. Combine with opacity for disabled-looking UI.",
              "8. Test carefully when stacking multiple layers.",
            ]}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
