"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type Pointer =
  | "pointer-events-auto"
  | "pointer-events-none";

export default function PointerEventsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    {
      className: "pointer-events-auto",
      desc: "Element responds to mouse and touch interactions",
    },
    {
      className: "pointer-events-none",
      desc: "Element ignores all pointer interactions",
    },
  ];

  const [pointer, setPointer] =
    useState<Pointer>("pointer-events-auto");

  const playgroundMarkup = `<div class="relative">
  <button class="px-4 py-2 bg-blue-600 text-white rounded">
    Base button
  </button>

  <div class="absolute inset-0 pointer-events-none bg-black/10">
    Overlay
  </div>
</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Pointer Events</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control whether an element can receive mouse, touch, and pointer
              interactions.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Pointer Events Utilities</h2>

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
                  Pointer events
                </label>
                <div className="flex gap-2">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() =>
                        setPointer(u.className as Pointer)
                      }
                      className={`px-3 py-1 text-sm rounded border ${
                        pointer === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("pointer-events-", "")}
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

                  <div className="relative inline-block">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">
                      Click me
                    </button>

                    <div
                      className={`absolute inset-0 rounded bg-black/10 ${pointer}`}
                    />
                  </div>

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    When pointer events are disabled, clicks pass through to
                    underlying elements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Disabled overlay */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Disabled card overlay</h3>

                <div className="border border-border rounded p-3 mb-3 relative">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded">
                    Action
                  </button>
                  <div className="absolute inset-0 bg-slate-800/40 pointer-events-none" />
                </div>

                <CodeBlock
                  code={`<div class="relative">
  <button>Action</button>
  <div class="absolute inset-0 pointer-events-none"></div>
</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Prevent overlays from blocking interaction.
                </p>
              </div>

              {/* Icon click-through */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">Clickable icons inside input</h3>

                <div className="border border-border rounded p-3 mb-3 relative">
                  <input
                    className="w-full border rounded px-3 py-2 pr-8"
                    placeholder="Search"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    🔍
                  </span>
                </div>

                <CodeBlock
                  code={`<span class="pointer-events-none">🔍</span>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Decorative icons should not block input focus.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Use <code className="bg-slate-700 px-1 rounded">pointer-events-none</code>{" "}
                for decorative layers.
              </li>
              <li>
                Don’t disable pointer events on focusable elements unless
                intentional.
              </li>
              <li>
                Useful for overlays, icons, and visual effects.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
