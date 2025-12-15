"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type FieldSizing = "field-sizing-content" | "field-sizing-fixed";

export default function FieldSizingPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    {
      className: "field-sizing-content",
      desc: "Input width adapts to its content",
    },
    {
      className: "field-sizing-fixed",
      desc: "Input keeps a fixed width",
    },
  ];

  const [sizing, setSizing] =
    useState<FieldSizing>("field-sizing-content");

  const playgroundMarkup = `<input
  type="text"
  class="field-sizing-content border rounded px-3 py-2"
  placeholder="Type here..."
/>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Field Sizing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control how form fields calculate their inline size — either
              adapting to content or staying fixed.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Field Sizing Utilities</h2>

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
                  Field sizing
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() =>
                        setSizing(u.className as FieldSizing)
                      }
                      className={`px-3 py-1 text-sm rounded border ${
                        sizing === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("field-sizing-", "")}
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
                    className={`${sizing} border rounded px-3 py-2`}
                    placeholder="Type and watch width"
                  />

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    Content-based sizing works best for short inputs like tags
                    or tokens.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Tag input */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Tag / token input</h3>

                <div className="border border-border rounded p-3 mb-3 space-x-2">
                  <input
                    className="field-sizing-content border rounded px-2 py-1"
                    defaultValue="react"
                  />
                  <input
                    className="field-sizing-content border rounded px-2 py-1"
                    defaultValue="tailwind"
                  />
                </div>

                <CodeBlock
                  code={`<input class="field-sizing-content" value="react" />
<input class="field-sizing-content" value="tailwind" />`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Automatically fit tag inputs to their content length.
                </p>
              </div>

              {/* Fixed layout form */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Consistent form layout</h3>

                <div className="border border-border rounded p-3 mb-3">
                  <input
                    className="field-sizing-fixed w-64 border rounded px-3 py-2"
                    placeholder="Email address"
                  />
                </div>

                <CodeBlock
                  code={`<input class="field-sizing-fixed w-64" />`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Keep alignment predictable in structured forms.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Use content sizing for short, dynamic values.
              </li>
              <li>
                Prefer fixed sizing in traditional forms.
              </li>
              <li>
                Combine with width utilities for best control.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
