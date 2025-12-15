"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type Accent =
  | "accent-blue-500"
  | "accent-green-500"
  | "accent-rose-500"
  | "accent-purple-500"
  | "accent-slate-500";

export default function AccentColorPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    { className: "accent-blue-500", desc: "Blue accent for form controls" },
    { className: "accent-green-500", desc: "Green accent for checkboxes & radios" },
    { className: "accent-rose-500", desc: "Rose accent for destructive actions" },
    { className: "accent-purple-500", desc: "Purple accent for branded UI" },
    { className: "accent-slate-500", desc: "Neutral slate accent" },
  ];

  const [accent, setAccent] = useState<Accent>("accent-blue-500");

  const playgroundMarkup = `<div class="space-y-2 ${accent}">
  <label class="flex items-center gap-2">
    <input type="checkbox" checked />
    Checkbox
  </label>

  <label class="flex items-center gap-2">
    <input type="radio" name="demo" checked />
    Radio
  </label>

  <input type="range" />
</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Accent Color</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control the highlight color of native form controls like checkboxes,
              radio buttons, and range inputs.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Accent Color Utilities</h2>

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
                  Accent color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() => setAccent(u.className as Accent)}
                      className={`px-3 py-1 text-sm rounded border ${
                        accent === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("accent-", "")}
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

                  <div className={`space-y-3 ${accent}`}>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      Checkbox
                    </label>

                    <label className="flex items-center gap-2">
                      <input type="radio" name="accent-demo" defaultChecked />
                      Radio
                    </label>

                    <input type="range" />
                  </div>

                  <CodeBlock code={playgroundMarkup} language="jsx" />
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Brand forms */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Brand-colored forms</h3>

                <div className="border border-border rounded p-3 mb-3 accent-indigo-500">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    Subscribe
                  </label>
                  <label className="flex items-center gap-2 mt-2">
                    <input type="radio" name="plan" defaultChecked />
                    Monthly
                  </label>
                </div>

                <CodeBlock
                  code={`<form class="accent-indigo-500 space-y-2">
  <input type="checkbox" /> Subscribe
  <input type="radio" /> Monthly
</form>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Match native inputs with your brand color without custom CSS.
                </p>
              </div>

              {/* Status based */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Status-based UI</h3>

                <div className="border border-border rounded p-3 mb-3 accent-rose-500">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Delete account
                  </label>
                </div>

                <CodeBlock
                  code={`<input type="checkbox" class="accent-rose-500" /> Delete`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Use red accents for destructive or irreversible actions.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Accent color affects only native browser controls.</li>
              <li>Use semantic colors for better UX.</li>
              <li>No effect on fully custom components.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
