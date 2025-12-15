"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type ScrollMargin =
  | "scroll-mt-0"
  | "scroll-mt-16"
  | "scroll-mt-24"
  | "scroll-mt-32";

export default function ScrollMarginPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [margin, setMargin] =
    useState<ScrollMargin>("scroll-mt-0");

  const targetRef = useRef<HTMLDivElement | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    { className: "scroll-mt-0", desc: "No scroll margin" },
    { className: "scroll-mt-16", desc: "Adds space from top when scrolled into view" },
    { className: "scroll-mt-24", desc: "Larger offset for fixed headers" },
    { className: "scroll-mt-32", desc: "Extra offset for tall navbars" },
  ];

  const playgroundMarkup = `<div class="scroll-mt-24">
  Target section
</div>`;

  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Scroll Margin</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control the offset when an element is scrolled into view — useful
              for fixed headers and in-page navigation.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Scroll Margin Utilities</h2>

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
                  Scroll margin (top)
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() =>
                        setMargin(u.className as ScrollMargin)
                      }
                      className={`px-3 py-1 text-sm rounded border ${
                        margin === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("scroll-mt-", "")}
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

                  <div className="h-48 overflow-y-auto border rounded p-2 space-y-6 scroll-smooth">
                    <div className="h-40" />
                    <button
                      onClick={scrollToTarget}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Scroll to target
                    </button>
                    <div className="h-40" />
                    <div
                      ref={targetRef}
                      className={`${margin} p-3 bg-green-500 text-white rounded`}
                    >
                      Target section
                    </div>
                    <div className="h-40" />
                  </div>

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    Scroll margin prevents content from hiding behind fixed
                    headers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Docs navigation */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">
                  Documentation anchors
                </h3>

                <div className="border border-border rounded p-3 mb-3 scroll-smooth h-32 overflow-y-auto">
                  <a href="#api" className="text-blue-600 underline">
                    Jump to API
                  </a>
                  <div className="h-40" />
                  <div
                    id="api"
                    className="scroll-mt-24 font-semibold"
                  >
                    API Section
                  </div>
                </div>

                <CodeBlock
                  code={`<h2 id="api" class="scroll-mt-24">API</h2>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Keeps headings visible when navigating with anchor links.
                </p>
              </div>

              {/* Fixed header layout */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">
                  Fixed header offset
                </h3>

                <div className="border border-border rounded p-3 mb-3">
                  <div className="scroll-mt-32 font-semibold">
                    Section title
                  </div>
                </div>

                <CodeBlock
                  code={`<section class="scroll-mt-32">...</section>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Match the offset to your header height.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Use scroll margin for anchor-based navigation.
              </li>
              <li>
                Values should match your fixed header height.
              </li>
              <li>
                Combine with <code className="bg-slate-700 px-1 rounded">scroll-smooth</code> for better UX.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
