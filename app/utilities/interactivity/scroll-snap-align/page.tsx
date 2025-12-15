"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type SnapAlign =
  | "snap-start"
  | "snap-center"
  | "snap-end"
  | "snap-align-none";

export default function ScrollSnapAlignPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [align, setAlign] = useState<SnapAlign>("snap-center");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    { className: "snap-start", desc: "Snap item to start of container" },
    { className: "snap-center", desc: "Snap item to center of container" },
    { className: "snap-end", desc: "Snap item to end of container" },
    { className: "snap-align-none", desc: "Disable snapping for this item" },
  ];

  const playgroundMarkup = `<div class="snap-x snap-mandatory overflow-x-auto flex gap-4">
  <div class="snap-center w-64 h-32">Item</div>
</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Scroll Snap Align</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control how individual elements align within a scroll snap
              container.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Scroll Snap Align Utilities</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {utilities.map((u) => (
                <button
                  key={u.className}
                  onClick={() => copyToClipboard(u.className)}
                  className="border border-border rounded-lg p-4 text-left hover:bg-card/50 transition"
                >
                  <div className="flex justify-between items-center">
                    <code className="font-mono text-sm font-semibold text-foreground bg-muted/40 px-2 py-0.5 rounded">
                      {u.className}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      {copied === u.className ? "Copied" : "Copy"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {u.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Playground */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Interactive Playground</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Controls */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-muted-foreground">
                  Snap alignment
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() => setAlign(u.className as SnapAlign)}
                      className={`px-3 py-1 text-sm rounded border ${
                        align === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("snap-", "")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="md:col-span-2 space-y-4">
                <div className="border border-border rounded-lg p-4 bg-card/30">
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-semibold text-sm">Live preview</div>
                    <button
                      onClick={() => copyToClipboard(playgroundMarkup)}
                      className="text-xs px-3 py-1 rounded bg-muted/10"
                    >
                      Copy markup
                    </button>
                  </div>

                  <div className="snap-x snap-mandatory overflow-x-auto flex gap-4 p-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`${align} w-64 h-32 flex-shrink-0 rounded bg-blue-500 text-white flex items-center justify-center`}
                      >
                        Item {i}
                      </div>
                    ))}
                  </div>

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    Scroll snapping works only when the container defines a snap
                    axis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Carousel */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Image carousel</h3>

                <div className="border border-border rounded p-3 mb-3 snap-x snap-mandatory overflow-x-auto flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="snap-center w-64 h-32 bg-slate-700 rounded flex-shrink-0"
                    />
                  ))}
                </div>

                <CodeBlock
                  code={`<div class="snap-x snap-mandatory">
  <img class="snap-center" />
</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Ensures each slide snaps neatly into view.
                </p>
              </div>

              {/* Timeline */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Horizontal timeline</h3>

                <div className="border border-border rounded p-3 mb-3 snap-x snap-proximity overflow-x-auto flex gap-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="snap-start w-48 h-24 bg-green-600 rounded flex-shrink-0 flex items-center justify-center text-white"
                    >
                      Step {i}
                    </div>
                  ))}
                </div>

                <CodeBlock
                  code={`<div class="snap-x snap-proximity">
  <div class="snap-start">Step</div>
</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Aligns items predictably in scroll-based timelines.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Snap alignment applies to individual children.
              </li>
              <li>
                Must be used with a snap-enabled container.
              </li>
              <li>
                Choose center for carousels, start for lists.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
