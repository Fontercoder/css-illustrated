"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type Direction =
  | "flex-row"
  | "flex-col"
  | "flex-row-reverse"
  | "flex-col-reverse";

export default function FlexDirectionPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const utilities = [
    { className: "flex-row", desc: "Row direction (left to right)" },
    { className: "flex-col", desc: "Column direction (top to bottom)" },
    { className: "flex-row-reverse", desc: "Row reverse (right to left)" },
    { className: "flex-col-reverse", desc: "Column reverse (bottom to top)" },
  ];

  // Playground controls
  const [playDirection, setPlayDirection] = useState<Direction>("flex-row");
  const [gapSize, setGapSize] = useState("gap-4");
  const [alignItems, setAlignItems] = useState("items-center");
  const [justify, setJustify] = useState("justify-start");

  const playgroundMarkup = `<div class="flex ${playDirection} ${gapSize} ${alignItems} ${justify}">
  <div class="px-4 py-2 bg-slate-700 rounded text-white">Item 1</div>
  <div class="px-4 py-2 bg-slate-700 rounded text-white">Item 2</div>
  <div class="px-4 py-2 bg-slate-700 rounded text-white">Item 3</div>
</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* readable text color applied site-wide for the page */}
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Flex Direction</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control the direction flex items are laid out — and learn how that
              affects real UI patterns.
            </p>
          </div>

          {/* Utilities Grid */}
          <div className="space-y-6 border-t border-border pt-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Flex Direction Utilities</h2>
              <p className="text-muted-foreground">
                Click a utility to copy it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {utilities.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => copyToClipboard(item.className)}
                  className="text-left border border-border rounded-lg p-4 hover:bg-card/50 transition cursor-pointer flex flex-col group"
                  aria-label={`Copy ${item.className}`}
                >
                  <div className="flex items-center justify-between">
                    <code className="text-black text-sm font-mono text-accent font-semibold">
                      {item.className}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      {copied === item.className ? "Copied" : "Copy"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Playground */}
          <div className="space-y-4 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Interactive Playground</h2>
            <p className="text-muted-foreground">
              Try different directions + alignment to see how direction
              interacts with layout, order, and alignment.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Controls */}
              <div className="space-y-3 md:col-span-1">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Direction
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {(
                      [
                        "flex-row",
                        "flex-col",
                        "flex-row-reverse",
                        "flex-col-reverse",
                      ] as Direction[]
                    ).map((d) => (
                      <button
                        key={d}
                        onClick={() => setPlayDirection(d)}
                        className={`px-3 py-1 rounded border cursor-pointer ${
                          playDirection === d
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        } text-sm`}
                      >
                        {d.replace("flex-", "")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Gap
                  </label>
                  <div className="flex gap-2">
                    {["gap-2", "gap-4", "gap-6"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGapSize(g)}
                        className={`px-3 py-1 rounded border cursor-pointer ${
                          gapSize === g
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        } text-sm`}
                      >
                        {g.replace("gap-", "")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Align items (cross-axis)
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { label: "start", cls: "items-start" },
                      { label: "center", cls: "items-center" },
                      { label: "end", cls: "items-end" },
                      { label: "stretch", cls: "items-stretch" },
                    ].map((a) => (
                      <button
                        key={a.cls}
                        onClick={() => setAlignItems(a.cls)}
                        className={`px-3 py-1 rounded border cursor-pointer ${
                          alignItems === a.cls
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        } text-sm`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Justify (main-axis)
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { label: "start", cls: "justify-start" },
                      { label: "center", cls: "justify-center" },
                      { label: "end", cls: "justify-end" },
                      { label: "between", cls: "justify-between" },
                    ].map((j) => (
                      <button
                        key={j.cls}
                        onClick={() => setJustify(j.cls)}
                        className={`px-3 py-1 rounded border cursor-pointer ${
                          justify === j.cls
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        } text-sm`}
                      >
                        {j.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Playground demo */}
              <div className="md:col-span-2 space-y-3">
                <div className="border border-border rounded-lg p-4 bg-card/30">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Playground</div>
                      <div className="text-xs text-muted-foreground">
                        Live preview of selected direction + alignment
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(playgroundMarkup)}
                      className="text-xs px-3 py-1 rounded bg-muted/10 hover:bg-muted/20 cursor-pointer"
                    >
                      Copy markup
                    </button>
                  </div>

                  <div
                    className={`flex ${playDirection} ${gapSize} ${alignItems} ${justify} h-50 rounded p-4 bg-slate-800`}
                    aria-live="polite"
                    role="group"
                  >
                    <div className="px-4 py-2 bg-slate-700 rounded text-white flex items-center justify-center">
                      DOM 1
                    </div>
                    <div className="px-4 py-2 bg-slate-700 rounded text-white flex items-center justify-center">
                      DOM 2
                    </div>
                    <div className="px-4 py-2 bg-slate-700 rounded text-white flex items-center justify-center">
                      DOM 3
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Tip:</strong> reverse utilities only change visual
                    order — DOM order stays the same (important for keyboard &
                    screen reader users).
                  </p>

                  <CodeBlock code={playgroundMarkup} language="jsx" />
                </div>
              </div>
            </div>
          </div>

          {/* Demos with explanations */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Direction Demos (annotated)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Row demo */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-2 flex items-baseline justify-between">
                  <code className="text-black text-sm font-mono text-accent font-semibold">
                    flex-row
                  </code>
                  <button
                    onClick={() => copyToClipboard("flex-row")}
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex gap-4 h-28 bg-slate-800 rounded p-3 items-center">
                  <div className="px-4 py-2 bg-blue-500 rounded text-white">
                    Item A
                  </div>
                  <div className="px-4 py-2 bg-blue-400 rounded text-white">
                    Item B
                  </div>
                  <div className="px-4 py-2 bg-blue-300 rounded text-white">
                    Item C
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Default horizontal flow: good for navs, toolbars, and rows of
                  cards. Use{" "}
                  <code className="bg-slate-700 px-1 rounded">flex-row</code>{" "}
                  when main content flows left→right.
                </p>
              </div>

              {/* Column demo */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-2 flex items-baseline justify-between">
                  <code className="text-black text-sm font-mono text-accent font-semibold">
                    flex-col
                  </code>
                  <button
                    onClick={() => copyToClipboard("flex-col")}
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
                <div
                  className="flex flex-col gap-3 bg-slate-800 rounded p-3"
                  style={{ minHeight: 120 }}
                >
                  <div className="px-4 py-2 bg-green-500 rounded text-white">
                    Profile
                  </div>
                  <div className="px-4 py-2 bg-green-400 rounded text-white">
                    Settings
                  </div>
                  <div className="px-4 py-2 bg-green-300 rounded text-white">
                    Logout
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Stack content vertically — useful for sidebars, forms, and
                  stacked lists. Combine with responsive variants (e.g.{" "}
                  <code className="bg-slate-700 px-1 rounded">md:flex-row</code>
                  ) for mobile-first layouts.
                </p>
              </div>

              {/* Row reverse demo */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-2 flex items-baseline justify-between">
                  <code className="text-black text-sm font-mono text-accent font-semibold">
                    flex-row-reverse
                  </code>
                  <button
                    onClick={() => copyToClipboard("flex-row-reverse")}
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex flex-row-reverse gap-4 h-28 bg-slate-800 rounded p-3 items-center">
                  <div className="px-4 py-2 bg-purple-300 rounded text-white">
                    A
                  </div>
                  <div className="px-4 py-2 bg-purple-400 rounded text-white">
                    B
                  </div>
                  <div className="px-4 py-2 bg-purple-500 rounded text-white">
                    C
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Visually reverses the main-axis. Good when you want a visual
                  order that differs from DOM order (be cautious — keep keyboard
                  order & accessibility in mind).
                </p>
              </div>

              {/* Column reverse demo */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-2 flex items-baseline justify-between">
                  <code className="text-black text-sm font-mono text-accent font-semibold">
                    flex-col-reverse
                  </code>
                  <button
                    onClick={() => copyToClipboard("flex-col-reverse")}
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
                <div
                  className="flex flex-col-reverse gap-3 bg-slate-800 rounded p-3"
                  style={{ minHeight: 120 }}
                >
                  <div className="px-4 py-2 bg-rose-300 rounded text-white text-center">
                    1
                  </div>
                  <div className="px-4 py-2 bg-rose-400 rounded text-white text-center">
                    2
                  </div>
                  <div className="px-4 py-2 bg-rose-500 rounded text-white text-center">
                    3
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Reverses vertical stacking. Useful for chat UIs or timelines
                  where newest content should appear at the top visually while
                  preserving DOM order.
                </p>
              </div>
            </div>
          </div>

          {/* Real-world annotated examples with reasons */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">
              Real-World Examples — explained
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Responsive navigation</h3>
              <CodeBlock
                code={`<nav class="flex md:flex-row flex-col items-center gap-4 p-4">
  <div class="font-bold">Logo</div>
  <div class="flex gap-4 flex-1 justify-center"> ... </div>
  <button>Sign In</button>
</nav>`}
                language="jsx"
              />
              <p className="text-sm text-muted-foreground">
                Use <code className="bg-slate-700 px-1 rounded">flex-col</code>{" "}
                on small screens and switch to{" "}
                <code className="bg-slate-700 px-1 rounded">md:flex-row</code>{" "}
                for desktop to stack nav on mobile and lay it out horizontally
                on larger screens.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Sidebar + content</h3>
              <CodeBlock
                code={`<div class="flex">
  <aside class="flex-shrink-0 w-56 flex flex-col p-4"> ... </aside>
  <main class="flex-1 p-6">Main content</main>
</div>`}
                language="jsx"
              />
              <p className="text-sm text-muted-foreground">
                The sidebar uses{" "}
                <code className="bg-slate-700 px-1 rounded">flex-col</code> so
                links stack vertically. Mark the sidebar as{" "}
                <code className="bg-slate-700 px-1 rounded">flex-shrink-0</code>{" "}
                (or fixed width) so it doesn't compress unexpectedly.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Chat / Timeline (newest on top)
              </h3>
              <CodeBlock
                code={`<!-- Keep DOM order chronological, use flex-col-reverse to show newest at top -->
<div class="flex flex-col-reverse gap-3" aria-live="polite" role="log">
  <div class="p-3 rounded bg-slate-700 text-white">Newest message</div>
  <div class="p-3 rounded bg-slate-700/90 text-white">Older message</div>
  <div class="p-3 rounded bg-slate-700/80 text-white">Oldest message</div>
</div>`}
                language="jsx"
              />
              <p className="text-sm text-muted-foreground">
                Use{" "}
                <code className="bg-slate-700 px-1 rounded">
                  flex-col-reverse
                </code>{" "}
                to place newest messages at the top visually while preserving
                chronological DOM order. This keeps keyboard/screen-reader order
                predictable while showing latest content first. Add{" "}
                <code className="bg-slate-700 px-1 rounded">
                  aria-live="polite"
                </code>{" "}
                for polite updates.
              </p>
            </div>

            {/* Image gallery (wrap horizontally) */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Image gallery (wrapping row)
              </h3>
              <CodeBlock
                code={`<!-- Gallery: horizontal flow that wraps to next line -->
<div class="flex flex-row flex-wrap gap-3">
  <img class="w-48 h-32 object-cover rounded" src="/img/1.jpg" alt="..." />
  <img class="w-48 h-32 object-cover rounded" src="/img/2.jpg" alt="..." />
  <img class="w-48 h-32 object-cover rounded" src="/img/3.jpg" alt="..." />
  <!-- more items -->
</div>`}
                language="jsx"
              />
              <p className="text-sm text-muted-foreground">
                A wrapping row is perfect for photo galleries or tag clouds —
                use{" "}
                <code className="bg-slate-700 px-1 rounded">
                  flex-row flex-wrap
                </code>{" "}
                so items flow left→right then wrap to the next line. Combine
                with fixed basis sizes for consistent rows.
              </p>
            </div>

            {/* Product card (responsive: column on mobile, row on desktop) */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Product card (responsive media position)
              </h3>
              <CodeBlock
                code={`<!-- Image above on mobile, left on desktop -->
<div class="flex flex-col md:flex-row gap-4 p-4 border rounded">
  <img class="w-full md:w-48 h-40 object-cover rounded" src="/product.jpg" alt="Product" />
  <div class="flex-1">
    <h4 class="font-semibold">Product title</h4>
    <p class="text-sm text-muted-foreground">Short description...</p>
    <div class="mt-3 flex gap-2">
      <button class="px-3 py-1 rounded bg-blue-600 text-white">Buy</button>
      <button class="px-3 py-1 rounded border">Details</button>
    </div>
  </div>
</div>`}
                language="jsx"
              />
              <p className="text-sm text-muted-foreground">
                Use{" "}
                <code className="bg-slate-700 px-1 rounded">
                  flex-col md:flex-row
                </code>{" "}
                to stack the image above the content on mobile and place it left
                on larger screens — great for cards that must remain compact on
                phones but horizontal on desktop.
              </p>
            </div>

            {/* Form layout (labels + inputs horizontally on wide screens) */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Form layout (row labels on wide screens)
              </h3>
              <CodeBlock
                code={`<!-- Label left, input right on desktop; stacked on mobile -->
<form class="space-y-4">
  <div class="flex flex-col md:flex-row md:items-center md:gap-4">
    <label class="md:w-40 text-sm">Full name</label>
    <input class="flex-1 px-3 py-2 rounded border" />
  </div>

  <div class="flex flex-col md:flex-row md:items-center md:gap-4">
    <label class="md:w-40 text-sm">Email</label>
    <input class="flex-1 px-3 py-2 rounded border" />
  </div>
</form>`}
                language="jsx"
              />
              <p className="text-sm text-muted-foreground">
                Stack labels above inputs on small screens with{" "}
                <code className="bg-slate-700 px-1 rounded">flex-col</code>,
                then switch to a horizontal label+field with{" "}
                <code className="bg-slate-700 px-1 rounded">md:flex-row</code>{" "}
                to save vertical space on desktop.
              </p>
            </div>

            {/* Toolbar / actions (row-reverse for RTL or action alignment) */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Toolbar / Actions (position primary action)
              </h3>
              <CodeBlock
                code={`<!-- Put primary action visually on the right while keeping DOM order for accessibility -->
<div class="flex flex-row-reverse gap-2">
  <button class="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
  <button class="px-3 py-1 border rounded">Cancel</button>
</div>`}
                language="jsx"
              />
              <p className="text-sm text-muted-foreground">
                <code className="bg-slate-700 px-1 rounded">
                  flex-row-reverse
                </code>{" "}
                can visually place the primary button on the right while keeping
                the DOM order logical (Cancel → Save). This is handy for RTL
                layouts or when visual emphasis differs from DOM order — but
                test keyboard focus order.
              </p>
            </div>

            {/* Breadcrumbs (row, wrap if too long) */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Breadcrumbs (row & wrap)
              </h3>
              <CodeBlock
                code={`<!-- Breadcrumbs: keep horizontal but allow wrapping -->
<nav aria-label="Breadcrumb">
  <ol class="flex flex-row gap-2 flex-wrap items-center text-sm">
    <li>Home</li>
    <li>/</li>
    <li>Products</li>
    <li>/</li>
    <li>Cool sneakers</li>
  </ol>
</nav>`}
                language="jsx"
              />
              <p className="text-sm text-muted-foreground">
                Breadcrumbs usually read left→right — use{" "}
                <code className="bg-slate-700 px-1 rounded">
                  flex-row flex-wrap
                </code>{" "}
                so they stay on a single line when possible but wrap gracefully
                on narrow screens.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Accessibility note</h3>
              <p className="text-sm text-muted-foreground">
                Reversing visual order (
                <code className="bg-slate-700 px-1 rounded">*-reverse</code>)
                doesn't change DOM order — keyboard and screen reader users
                still navigate the original DOM order. If visual order must
                match keyboard order, rearrange DOM instead of relying only on
                reverse utilities.
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Summary tips</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                Use <code className="bg-slate-700 px-1 rounded">flex-row</code>{" "}
                for horizontal UI,{" "}
                <code className="bg-slate-700 px-1 rounded">flex-col</code> for
                stacked UI.
              </li>
              <li>
                Prefer responsive switches (e.g.,{" "}
                <code className="bg-slate-700 px-1 rounded">md:flex-row</code>)
                for mobile-first design.
              </li>
              <li>
                Use reverse utilities sparingly — remember accessibility
                implications.
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
