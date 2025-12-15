"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type Cursor =
  | "cursor-auto"
  | "cursor-default"
  | "cursor-pointer"
  | "cursor-text"
  | "cursor-move"
  | "cursor-not-allowed"
  | "cursor-wait";

export default function CursorPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    { className: "cursor-auto", desc: "Browser decides the cursor" },
    { className: "cursor-default", desc: "Default arrow cursor" },
    { className: "cursor-pointer", desc: "Indicates clickable elements" },
    { className: "cursor-text", desc: "Text selection cursor" },
    { className: "cursor-move", desc: "Indicates draggable content" },
    { className: "cursor-not-allowed", desc: "Action is disabled" },
    { className: "cursor-wait", desc: "Background process running" },
  ];

  const [cursor, setCursor] = useState<Cursor>("cursor-pointer");

  const playgroundMarkup = `<button class="cursor-pointer px-4 py-2 rounded border">
  Hover me
</button>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Cursor</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control the mouse cursor style to communicate interactivity and
              system states.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Cursor Utilities</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {utilities.map((u) => (
                <button
                  key={u.className}
                  onClick={() => copyToClipboard(u.className)}
                  className={`border border-border rounded-lg p-4 text-left hover:bg-card/50 transition ${u.className}`}
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
                  Cursor type
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() => setCursor(u.className as Cursor)}
                      className={`px-3 py-1 text-sm rounded border ${
                        cursor === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("cursor-", "")}
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

                  <button
                    className={`${cursor} px-4 py-2 rounded border bg-background`}
                  >
                    Hover me
                  </button>

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    Cursor styles help users understand what actions are
                    available.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Disabled button */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Disabled action</h3>

                <div className="border border-border rounded p-3 mb-3">
                  <button
                    disabled
                    className="cursor-not-allowed px-4 py-2 rounded border opacity-60"
                  >
                    Submit
                  </button>
                </div>

                <CodeBlock
                  code={`<button disabled class="cursor-not-allowed opacity-60">
  Submit
</button>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Communicate disabled states clearly.
                </p>
              </div>

              {/* Draggable item */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Draggable element</h3>

                <div className="border border-border rounded p-3 mb-3">
                  <div className="cursor-move px-4 py-2 border rounded w-fit">
                    Drag me
                  </div>
                </div>

                <CodeBlock
                  code={`<div class="cursor-move">Drag me</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Indicates elements that can be repositioned.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Use <code className="bg-slate-700 px-1 rounded">cursor-pointer</code>{" "}
                for clickable elements.
              </li>
              <li>
                Avoid misleading cursors that don’t match behavior.
              </li>
              <li>
                Cursor styles are hints, not replacements for accessibility.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
