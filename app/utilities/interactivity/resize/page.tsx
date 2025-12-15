"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type Resize =
  | "resize"
  | "resize-none"
  | "resize-x"
  | "resize-y";

export default function ResizePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    { className: "resize", desc: "Resize both horizontally and vertically" },
    { className: "resize-x", desc: "Resize horizontally only" },
    { className: "resize-y", desc: "Resize vertically only" },
    { className: "resize-none", desc: "Disable resizing" },
  ];

  const [resize, setResize] = useState<Resize>("resize");

  const playgroundMarkup = `<textarea
  class="resize border rounded px-3 py-2 w-full h-28"
  placeholder="Try resizing me..."
></textarea>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Resize</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control whether and how elements like textareas can be resized by the user.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Resize Utilities</h2>

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
                  Resize behavior
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() => setResize(u.className as Resize)}
                      className={`px-3 py-1 text-sm rounded border ${
                        resize === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("resize-", "") || "both"}
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

                  <textarea
                    className={`${resize} border rounded px-3 py-2 w-full h-28 bg-background`}
                    placeholder="Try resizing me..."
                  />

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    Resizing is most commonly applied to textareas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Chat input */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Chat message input</h3>

                <div className="border border-border rounded p-3 mb-3">
                  <textarea
                    className="resize-y border rounded px-3 py-2 w-full h-24"
                    placeholder="Type a message…"
                  />
                </div>

                <CodeBlock
                  code={`<textarea class="resize-y h-24"></textarea>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Allow vertical growth without breaking horizontal layout.
                </p>
              </div>

              {/* Fixed form field */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Fixed form textarea</h3>

                <div className="border border-border rounded p-3 mb-3">
                  <textarea
                    className="resize-none border rounded px-3 py-2 w-full h-24"
                    placeholder="Feedback"
                  />
                </div>

                <CodeBlock
                  code={`<textarea class="resize-none h-24"></textarea>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Prevent layout shifts in structured forms.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Use vertical resizing for long-form text.</li>
              <li>Disable resizing when layout stability matters.</li>
              <li>Resize utilities apply mostly to textarea elements.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
