"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type Caret =
  | "caret-blue-500"
  | "caret-green-500"
  | "caret-rose-500"
  | "caret-purple-500"
  | "caret-slate-500";

export default function CaretColorPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    { className: "caret-blue-500", desc: "Blue text cursor" },
    { className: "caret-green-500", desc: "Green caret for success states" },
    { className: "caret-rose-500", desc: "Rose caret for warnings/errors" },
    { className: "caret-purple-500", desc: "Purple caret for branded inputs" },
    { className: "caret-slate-500", desc: "Neutral slate caret" },
  ];

  const [caret, setCaret] = useState<Caret>("caret-blue-500");

  const playgroundMarkup = `<input
  type="text"
  class="caret-blue-500 border rounded px-3 py-2 w-full"
  placeholder="Start typing..."
/>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Caret Color</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control the color of the text insertion cursor (caret) inside
              inputs and textareas.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Caret Color Utilities</h2>

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
                  Caret color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() => setCaret(u.className as Caret)}
                      className={`px-3 py-1 text-sm rounded border ${
                        caret === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("caret-", "")}
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

                  <input
                    type="text"
                    className={`${caret} border rounded px-3 py-2 w-full bg-background`}
                    placeholder="Click here and start typing…"
                  />

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    The caret color is visible only when the input is focused.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Brand input */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Brand-colored input</h3>

                <div className="border border-border rounded p-3 mb-3">
                  <input
                    className="caret-purple-500 border rounded px-3 py-2 w-full"
                    placeholder="Brand search"
                  />
                </div>

                <CodeBlock
                  code={`<input
  class="caret-purple-500 border px-3 py-2"
  placeholder="Brand search"
/>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Subtle branding detail that improves polish without
                  overwhelming the UI.
                </p>
              </div>

              {/* Error input */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Error / warning state</h3>

                <div className="border border-border rounded p-3 mb-3">
                  <input
                    className="caret-rose-500 border border-rose-400 rounded px-3 py-2 w-full"
                    placeholder="Invalid value"
                  />
                </div>

                <CodeBlock
                  code={`<input
  class="caret-rose-500 border border-rose-400 px-3 py-2"
/>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Reinforce error states with consistent visual signals.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Caret color only appears when an input is focused.
              </li>
              <li>
                Best used subtly for branding or state indication.
              </li>
              <li>
                Avoid low-contrast caret colors for accessibility.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
