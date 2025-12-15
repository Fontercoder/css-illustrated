"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type Appearance = "appearance-none" | "appearance-auto";

export default function AppearancePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    {
      className: "appearance-none",
      desc: "Remove default browser styling from form elements",
    },
    {
      className: "appearance-auto",
      desc: "Use browser default appearance (reset override)",
    },
  ];

  const [appearance, setAppearance] =
    useState<Appearance>("appearance-none");

  const playgroundMarkup = `<select class="appearance-none border rounded px-3 py-2">
  <option>Option A</option>
  <option>Option B</option>
</select>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Appearance</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control whether form elements use native browser styling or are
              stripped down for full custom design.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Appearance Utilities</h2>

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
            <p className="text-muted-foreground">
              Toggle appearance to see how native UI styling is removed.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Controls */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-muted-foreground">
                  Appearance
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() =>
                        setAppearance(u.className as Appearance)
                      }
                      className={`px-3 py-1 text-sm rounded border ${
                        appearance === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("appearance-", "")}
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

                  <div className="space-y-4">
                    <select
                      className={`${appearance} border rounded px-3 py-2 w-48 bg-background`}
                    >
                      <option>Option A</option>
                      <option>Option B</option>
                    </select>

                    <input
                      type="checkbox"
                      className={`${appearance}`}
                      defaultChecked
                    />
                  </div>

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Note:</strong> Using{" "}
                    <code className="bg-slate-700 px-1 rounded">
                      appearance-none
                    </code>{" "}
                    removes OS-specific UI like dropdown arrows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Custom select */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Custom select dropdown</h3>

                <div className="border border-border rounded p-3 mb-3">
                  <div className="relative w-48">
                    <select className="appearance-none w-full border rounded px-3 py-2 pr-8 bg-background">
                      <option>India</option>
                      <option>USA</option>
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      ▼
                    </span>
                  </div>
                </div>

                <CodeBlock
                  code={`<div class="relative">
  <select class="appearance-none w-full border px-3 py-2 pr-8">
    <option>India</option>
    <option>USA</option>
  </select>
  <span class="absolute right-2 top-1/2 -translate-y-1/2">▼</span>
</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Remove native arrows and replace them with custom icons.
                </p>
              </div>

              {/* Custom checkbox */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Fully custom checkbox</h3>

                <div className="border border-border rounded p-3 mb-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="appearance-none w-4 h-4 border rounded checked:bg-blue-600"
                      defaultChecked
                    />
                    Remember me
                  </label>
                </div>

                <CodeBlock
                  code={`<input
  type="checkbox"
  class="appearance-none w-4 h-4 border rounded checked:bg-blue-600"
/>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Appearance removal is the foundation for fully custom form
                  controls.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Use <code className="bg-slate-700 px-1 rounded">appearance-none</code>{" "}
                to remove browser styling.
              </li>
              <li>
                Always replace removed affordances (arrows, checks) visually.
              </li>
              <li>
                Test across browsers — default styles vary by OS.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
