"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type SnapType =
  | "snap-none"
  | "snap-x"
  | "snap-y"
  | "snap-both"
  | "snap-mandatory"
  | "snap-proximity";

export default function ScrollSnapTypePage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [type, setType] = useState<SnapType>("snap-x");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    { className: "snap-none", desc: "Disable scroll snapping" },
    { className: "snap-x", desc: "Enable horizontal snapping" },
    { className: "snap-y", desc: "Enable vertical snapping" },
    { className: "snap-both", desc: "Enable snapping on both axes" },
    { className: "snap-mandatory", desc: "Force snapping to snap points" },
    { className: "snap-proximity", desc: "Snap when close to a snap point" },
  ];

  const playgroundMarkup = `<div class="snap-x snap-mandatory overflow-x-auto flex gap-4">
  <div class="snap-center">Item</div>
</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Scroll Snap Type</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Define the scroll snapping behavior of a container — direction and
              strictness of snapping.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Scroll Snap Type Utilities</h2>

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
                  Snap type
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() => setType(u.className as SnapType)}
                      className={`px-3 py-1 text-sm rounded border ${
                        type === u.className
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

                  <div
                    className={`${type} overflow-x-auto flex gap-4 p-2`}
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="snap-center w-64 h-32 flex-shrink-0 rounded bg-blue-600 text-white flex items-center justify-center"
                      >
                        Item {i}
                      </div>
                    ))}
                  </div>

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    Snap type is applied on the scroll container, not on items.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Horizontal carousel */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">
                  Horizontal carousel
                </h3>

                <div className="border border-border rounded p-3 mb-3 snap-x snap-mandatory overflow-x-auto flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="snap-center w-56 h-28 bg-slate-700 rounded flex-shrink-0"
                    />
                  ))}
                </div>

                <CodeBlock
                  code={`<div class="snap-x snap-mandatory overflow-x-auto">
  <div class="snap-center"></div>
</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Forces each slide to snap fully into view.
                </p>
              </div>

              {/* Vertical sections */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">
                  Full-screen sections
                </h3>

                <div className="border border-border rounded p-3 mb-3 snap-y snap-proximity h-40 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <section
                      key={i}
                      className="snap-start h-32 bg-green-600 mb-4 text-white flex items-center justify-center"
                    >
                      Section {i}
                    </section>
                  ))}
                </div>

                <CodeBlock
                  code={`<div class="snap-y snap-proximity overflow-y-auto">
  <section class="snap-start"></section>
</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Creates smooth section-by-section scrolling layouts.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Use <code className="bg-slate-700 px-1 rounded">snap-mandatory</code>{" "}
                when every item must be visited.
              </li>
              <li>
                Prefer <code className="bg-slate-700 px-1 rounded">snap-proximity</code>{" "}
                for natural scrolling.
              </li>
              <li>
                Combine with <code className="bg-slate-700 px-1 rounded">scroll-padding</code>{" "}
                for better spacing.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
