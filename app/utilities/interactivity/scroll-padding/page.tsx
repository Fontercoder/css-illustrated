"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type ScrollPadding =
  | "scroll-pt-0"
  | "scroll-pt-16"
  | "scroll-pt-24"
  | "scroll-pt-32";

export default function ScrollPaddingPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [padding, setPadding] =
    useState<ScrollPadding>("scroll-pt-0");

  const containerRef = useRef<HTMLDivElement | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const utilities = [
    { className: "scroll-pt-0", desc: "No scroll padding at the top" },
    { className: "scroll-pt-16", desc: "Top padding inside scroll container" },
    { className: "scroll-pt-24", desc: "Larger padding for sticky headers" },
    { className: "scroll-pt-32", desc: "Extra padding for tall toolbars" },
  ];

  const playgroundMarkup = `<div class="scroll-pt-24 overflow-y-auto">
  <!-- scrollable content -->
</div>`;

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Scroll Padding</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control the padding inside a scroll container that offsets where
              content appears when scrolled.
            </p>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Scroll Padding Utilities</h2>

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
                  Scroll padding (top)
                </label>
                <div className="flex gap-2 flex-wrap">
                  {utilities.map((u) => (
                    <button
                      key={u.className}
                      onClick={() =>
                        setPadding(u.className as ScrollPadding)
                      }
                      className={`px-3 py-1 text-sm rounded border ${
                        padding === u.className
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      {u.className.replace("scroll-pt-", "")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="md:col-span-2 space-y-4">
                <div
                  className={`border border-border rounded-lg p-4 bg-card/30 ${padding}`}
                >
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
                    ref={containerRef}
                    className="h-48 overflow-y-auto border rounded p-2 space-y-6"
                  >
                    <button
                      onClick={scrollToTop}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Scroll to top
                    </button>
                    <div className="h-40" />
                    <div className="p-3 bg-green-500 text-white rounded">
                      First item
                    </div>
                    <div className="h-40" />
                    <div className="p-3 bg-purple-500 text-white rounded">
                      Second item
                    </div>
                    <div className="h-40" />
                  </div>

                  <CodeBlock code={playgroundMarkup} language="jsx" />

                  <p className="text-sm text-muted-foreground mt-3">
                    Scroll padding creates internal breathing room when content
                    scrolls into view.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-world examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Sticky header container */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">
                  Scroll container with sticky header
                </h3>

                <div className="border border-border rounded p-3 mb-3 scroll-pt-24 h-32 overflow-y-auto">
                  <div className="sticky top-0 bg-slate-800 text-white p-2">
                    Sticky header
                  </div>
                  <div className="h-40" />
                  <p>Scrollable content</p>
                </div>

                <CodeBlock
                  code={`<div class="scroll-pt-24 overflow-y-auto">
  <div class="sticky top-0">Header</div>
</div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Prevents content from hiding behind sticky headers.
                </p>
              </div>

              {/* Horizontal scroll snapping */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <h3 className="font-semibold mb-3">
                  Carousel / snap container
                </h3>

                <div className="border border-border rounded p-3 mb-3 scroll-pt-16 overflow-x-auto whitespace-nowrap">
                  <div className="inline-block w-48 h-20 bg-blue-500 mr-4" />
                  <div className="inline-block w-48 h-20 bg-green-500 mr-4" />
                  <div className="inline-block w-48 h-20 bg-purple-500 mr-4" />
                </div>

                <CodeBlock
                  code={`<div class="scroll-pt-16 overflow-x-auto"></div>`}
                  language="jsx"
                />

                <p className="text-sm text-muted-foreground mt-2">
                  Useful when combining with scroll snap utilities.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Scroll padding applies to the scroll container.</li>
              <li>Different from scroll margin, which applies to the target.</li>
              <li>Commonly used with sticky headers and snap layouts.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
