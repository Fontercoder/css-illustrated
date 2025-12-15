"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type SnapStop = "snap-normal" | "snap-always";

export default function ScrollSnapStopPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [stop, setStop] = useState<SnapStop>("snap-normal");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    {
      className: "snap-normal",
      desc: "Allows scrolling to skip snap points when scrolling fast",
    },
    {
      className: "snap-always",
      desc: "Forces the scroll to stop at every snap point",
    },
  ];

  const playgroundMarkup = `<div class="snap-x snap-mandatory overflow-x-auto flex gap-4">
  <div class="snap-center snap-always">Item</div>
</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Scroll Snap Stop</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control whether scrolling must stop at each snap point or can skip
              past items when scrolling quickly.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Scroll Snap Stop Utilities</h2>

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
                  Snap stop behavior
                </label>
                <div className="flex gap-2">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() => setStop(u.className as SnapStop)}
                      className={`px-3 py-1 text-sm rounded border ${
                        stop === u.className
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
                        className={`snap-center ${stop} w-64 h-32 flex-shrink-0 rounded bg-indigo-600 text-white flex items-center justify-center`}
                      >
                        Item {i}
                      </div>
                    ))}
                  </div>

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    With <code className="bg-slate-700 px-1 rounded">snap-always</code>,
                    the scroll will stop at every item, even with fast swipes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Product carousel */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">
                  Product carousel (precise)
                </h3>

                <div className="border border-border rounded p-3 mb-3 snap-x snap-mandatory overflow-x-auto flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="snap-center snap-always w-56 h-28 bg-slate-700 rounded flex-shrink-0"
                    />
                  ))}
                </div>

                <CodeBlock
                  code={`<div class="snap-x snap-mandatory">
  <div class="snap-center snap-always"></div>
</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Ideal when users should view every item sequentially.
                </p>
              </div>

              {/* Media scrubber */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">
                  Media scrubber / timeline
                </h3>

                <div className="border border-border rounded p-3 mb-3 snap-x snap-proximity overflow-x-auto flex gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="snap-start snap-normal w-32 h-20 bg-green-600 rounded flex-shrink-0"
                    />
                  ))}
                </div>

                <CodeBlock
                  code={`<div class="snap-start snap-normal"></div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Allows faster navigation across long timelines.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Use <code className="bg-slate-700 px-1 rounded">snap-always</code>{" "}
                when each item is important.
              </li>
              <li>
                Prefer <code className="bg-slate-700 px-1 rounded">snap-normal</code>{" "}
                for fast navigation.
              </li>
              <li>
                Works best on touch and trackpad devices.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
