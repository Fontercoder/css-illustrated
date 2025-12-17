"use client";

import React from "react";
import CodeBlock from "@/app/utilities/components/code-block";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

// --- Helper Component to keep the main file clean ---
interface ExampleCardProps {
  title: string;
  copyText: string;
  description: React.ReactNode;
  children: React.ReactNode; // The visual preview
  code: string;
}

function ExampleCard({
  title,
  copyText,
  description,
  children,
  code,
}: ExampleCardProps) {
  const { copy } = useCopyToClipboard();
  return (
    <article className="border border-border rounded-lg p-4 bg-card/20">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={() => copy(copyText)}
          className="text-xs px-2 py-1 rounded cursor-pointer bg-muted/10 hover:bg-muted/20"
        >
          Copy
        </button>
      </div>

      <div className="bg-slate-800 rounded p-3 text-white">
        <div className="text-sm text-muted-foreground mb-2">{description}</div>
        {children}
      </div>

      <div className="mt-3">
        <CodeBlock language="jsx" code={code} />
      </div>
    </article>
  );
}

export function RealWorldExamples() {
  return (
    <section className="space-y-6 border-t border-border pt-8">
      <h2 className="text-3xl font-bold">Real-World Examples</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        
        <ExampleCard
          title="Clickable link / CTA"
          copyText={`<a class="cursor-pointer underline" role="link" aria-label="Open item">Open</a>`}
          code={`<a class="cursor-pointer underline" role="link" aria-label="Open item">Open</a>\n/* Ensure keyboard activation and :focus styles for accessibility */`}
          description={
            <>
              Use <code className="bg-slate-700 px-1 rounded">cursor-pointer</code>{" "}
              for interactive controls — always pair it with visible focus and
              hover states and correct semantics (<code>role</code>, keyboard
              handlers).
            </>
          }
        >
          <a
            className="cursor-pointer text-blue-400 underline focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            role="link"
            tabIndex={0}
          >
            Open
          </a>
        </ExampleCard>

        <ExampleCard
          title="Draggable list (grab / grabbing)"
          copyText={`\n<div draggable="true" class="cursor-grab"\n    ondragstart="this.classList.replace('cursor-grab','cursor-grabbing')"\n    ondragend="this.classList.replace('cursor-grabbing','cursor-grab')">Drag me</div>`}
          code={`<div class="cursor-grab" draggable="true">Drag handle</div>\n/* Toggle to cursor-grabbing on dragstart and back on dragend; update aria-grabbed or live region */`}
          description={
            <>
              Use <code className="bg-slate-700 px-1 rounded">cursor-grab</code>{" "}
              for handles and switch to{" "}
              <code className="bg-slate-700 px-1 rounded">cursor-grabbing</code>{" "}
              during the interaction. Announce state with{" "}
              <code>aria-grabbed</code> or a live region for assistive tech.
            </>
          }
        >
          <div
            className="cursor-grab rounded p-2 bg-slate-700 inline-block"
            draggable
            onDragStart={(e) => {
               const target = e.currentTarget as HTMLElement;
               if(target.classList.contains("cursor-grab")) {
                 target.classList.replace("cursor-grab", "cursor-grabbing");
               }
            }}
            onDragEnd={(e) => {
               const target = e.currentTarget as HTMLElement;
                if(target.classList.contains("cursor-grabbing")) {
                 target.classList.replace("cursor-grabbing", "cursor-grab");
               }
            }}
          >
            Drag handle
          </div>
        </ExampleCard>

        <ExampleCard
          title="Image — zoom affordance"
          copyText={`<img src="/photo.jpg" class="cursor-zoom-in" alt="Product photo" role="button" tabindex="0" />`}
          code={`<img src="/photo.jpg" class="cursor-zoom-in" alt="Product photo" role="button" tabindex="0" />\n/* Provide keyboard activation and visible controls for touch */`}
          description={
            <>
              <code className="bg-slate-700 px-1 rounded">cursor-zoom-in</code>{" "}
              signals a zoom/lightbox. For keyboard and touch users, expose an
              explicit control (button) and support pinch/gesture or an on-screen
              zoom button.
            </>
          }
        >
          <div className="cursor-zoom-in w-full h-28 bg-slate-600 rounded flex items-center justify-center text-sm">
             [Image Placeholder]
          </div>
        </ExampleCard>

        <ExampleCard
          title="Disabled affordance (aria-disabled)"
          copyText={`<button class="cursor-not-allowed opacity-50" aria-disabled="true">Save</button>`}
          code={`<button class="cursor-not-allowed opacity-50" disabled>Save</button>\n/* Or for custom controls: role="button" aria-disabled="true" and a visible explanation */`}
          description={
            <>
              Prefer semantic disabling (<code>disabled</code> or{" "}
              <code>aria-disabled</code>) plus{" "}
              <code className="bg-slate-700 px-1 rounded">cursor-not-allowed</code>. 
              Also expose the reason (tooltip or helper text) for better UX.
            </>
          }
        >
          <button
            className="cursor-not-allowed opacity-50 rounded-md px-4 py-2 bg-slate-700 text-slate-400"
            disabled
          >
            Save
          </button>
        </ExampleCard>

        <ExampleCard
          title="Precision tool (crosshair)"
          copyText={`<div class="cursor-crosshair">Pick</div>`}
          code={`<div class="cursor-crosshair">Pick</div>\n/* For consistent precision, draw a 1px reticle at the mouse position inside the canvas */`}
          description={
            <>
              <code className="bg-slate-700 px-1 rounded">cursor-crosshair</code>{" "}
              is ideal for drawing or pixel-precise selection. Because system
              crosshairs vary, also render a small reticle inside your canvas for
              consistent precision across platforms.
            </>
          }
        >
          <div className="text-white cursor-crosshair w-48 p-3 rounded bg-slate-700">
            Precision canvas
          </div>
        </ExampleCard>

        <ExampleCard
          title="Resize handles (col / row)"
          copyText={`<div class="cursor-col-resize">Resize</div>`}
          code={`<div class="cursor-col-resize">Resize</div>\n/* Provide keyboard equivalents and aria-labels for each handle */`}
          description="Use directional resize cursors and provide keyboard alternatives for resizing (± keys or accessible handles)."
        >
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 cursor-col-resize rounded bg-slate-700" />
            <div className="w-8 h-8 cursor-row-resize rounded bg-slate-700" />
          </div>
        </ExampleCard>

        <ExampleCard
          title="Map / pan — move cursor"
          copyText={`<div class="cursor-move">Map canvas (drag to pan)</div>`}
          code={`<div class="cursor-move">Map area (pan)</div>\n/* Provide touch fallbacks and keyboard pan controls */`}
          description={
            <>
              <code className="bg-slate-700 px-1 rounded">cursor-move</code>{" "}
              signals panning. For touch add a visible grab affordance, on-screen
              pan controls or two-finger gestures. Expose a brief hint for
              keyboard users (e.g., arrow keys to pan).
            </>
          }
        >
          <div className="text-white cursor-move w-full h-28 rounded bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center">
            Map area (pan)
          </div>
        </ExampleCard>

        <ExampleCard
          title="Drawing / Editor — crosshair + reticle"
          copyText={`<canvas class="cursor-crosshair"></canvas>`}
          code={`<canvas class="cursor-crosshair"></canvas>\n/* Draw a small reticle at the pointer position in JS for consistent UX */`}
          description="Combine the system crosshair with a drawn reticle inside your canvas so precision remains consistent on all platforms and at different DPIs."
        >
          <div className="text-white cursor-crosshair w-full h-28 rounded bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center">
            Canvas (draw)
          </div>
        </ExampleCard>

        <ExampleCard
          title="Custom image cursor (branding) — fallbacks"
          copyText={`<div style="cursor: url('/cursor.png') 12 12, auto;">Custom cursor</div>`}
          code={`<div style={{ cursor: "url('/cursor.png') 12 12, auto" }}>Custom cursor</div>\n/* Provide fallback cursors and retina versions */`}
          description={
            <>
              Use hotspot coordinates and a generic fallback (e.g.,{" "}
              <code>auto</code>). Keep custom images small (≤32×32) and provide
              retina variants; test on multiple browsers — some ignore large or
              SVG cursors.
            </>
          }
        >
          <div
            className="text-white w-full h-28 rounded bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center text-sm"
            style={{ cursor: "url('/cursor.png') 12 12, auto" }}
          >
            Custom cursor preview
          </div>
        </ExampleCard>

        <ExampleCard
          title="Rotate / transform handle — grab"
          copyText={`<div class="cursor-grab">Rotate handle</div>`}
          code={`<div class="cursor-grab">Rotate handle</div>\n/* Toggle to cursor-grabbing on mousedown/dragstart */`}
          description={
            <>
              For rotation/transform handles use{" "}
              <code className="bg-slate-700 px-1 rounded">cursor-grab</code>.
              Programmatically switch to{" "}
              <code className="bg-slate-700 px-1 rounded">cursor-grabbing</code>{" "}
              during interaction and provide keyboard rotate alternatives.
            </>
          }
        >
          <div className="w-48 h-28 rounded bg-slate-700 flex items-center justify-center cursor-grab text-white">
            Handle
          </div>
        </ExampleCard>

        <div className="md:col-span-2 text-sm text-muted-foreground mt-4">
          <strong>Accessibility & UX notes:</strong>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              Cursor is a visual hint — never be the only signal for important
              state. Add visible labels, focus styles and semantic attributes (
              <code>role</code>, <code>aria-*</code>).
            </li>
            <li>
              Touch devices don't show cursors — ensure touch affordances (tap
              targets) are large and include on-screen controls or gestures.
            </li>
            <li>
              For drag interactions, update the DOM state (e.g.,{" "}
              <code>aria-grabbed</code>) or use live regions to announce changes
              for assistive tech.
            </li>
            <li>
              Some cursors (zoom-in/out, grab/grabbing) behave slightly
              differently across OSes — test on Windows, macOS, Linux and mobile.
              Provide graceful fallbacks.
            </li>
            <li>
              Custom image cursors need hotspot coords and fallbacks; keep images
              small and supply retina variants for crispness.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}