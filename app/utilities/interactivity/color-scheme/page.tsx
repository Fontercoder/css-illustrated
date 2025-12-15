"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type Scheme = "scheme-light" | "scheme-dark" | "scheme-normal";

export default function ColorSchemePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    {
      className: "scheme-light",
      desc: "Forces light color scheme for native UI",
    },
    {
      className: "scheme-dark",
      desc: "Forces dark color scheme for native UI",
    },
    {
      className: "scheme-normal",
      desc: "Uses browser / OS default color scheme",
    },
  ];

  const [scheme, setScheme] = useState<Scheme>("scheme-normal");

  const playgroundMarkup = `<div class="scheme-dark p-4 border rounded">
  <input type="text" class="border rounded px-3 py-2" placeholder="Input" />
  <input type="checkbox" checked />
</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Color Scheme</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control whether native UI elements render in light or dark mode,
              independent of your site theme.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Color Scheme Utilities</h2>

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
              Color scheme affects native controls like inputs, scrollbars, and
              form UI.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Controls */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-muted-foreground">
                  Color scheme
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() =>
                        setScheme(u.className as Scheme)
                      }
                      className={`px-3 py-1 text-sm rounded border ${
                        scheme === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("scheme-", "")}
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
                    className={`${scheme} p-4 rounded border space-y-3`}
                  >
                    <input
                      type="text"
                      className="border rounded px-3 py-2 w-full"
                      placeholder="Text input"
                    />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      Checkbox
                    </label>
                  </div>

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    Try switching schemes to see how native UI adapts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Forced dark widgets */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">
                  Dark widgets inside light UI
                </h3>

                <div className="border border-border rounded p-3 mb-3 scheme-dark">
                  <input
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Dark input"
                  />
                </div>

                <CodeBlock
                  code={`<div class="scheme-dark">
  <input class="border px-3 py-2" />
</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Useful for embedding dark widgets in otherwise light pages.
                </p>
              </div>

              {/* Respect system preference */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">
                  Respect system preference
                </h3>

                <div className="border border-border rounded p-3 mb-3 scheme-normal">
                  <input
                    className="border rounded px-3 py-2 w-full"
                    placeholder="System-based input"
                  />
                </div>

                <CodeBlock
                  code={`<div class="scheme-normal">
  <input class="border px-3 py-2" />
</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Let the OS decide light or dark mode automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Color scheme affects only native UI, not custom components.
              </li>
              <li>
                Use sparingly — forcing schemes can surprise users.
              </li>
              <li>
                Test on multiple browsers and OS themes.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
