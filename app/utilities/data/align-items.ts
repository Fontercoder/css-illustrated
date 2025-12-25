// app/utilities/data/align-items.ts
import type { UtilityContent } from "./utilities";

export const alignItems: Record<string, UtilityContent> = {
  "align-items": {
    navigationGroup: "align",

    title: "Align Items",
    description:
      "When to reach for align-items utilities: When you need to control how individual flex or grid items are aligned along the cross axis within a single line or row.",

    mentalModelFeatures: [
      "Works on a single line or row of items",
      "Aligns items themselves, not lines",
      "Acts on the cross axis (opposite of flex-direction)",
      "Does not require wrapping to have effect",
    ],

    layerAssignment:
      "Layout layer - controls cross-axis alignment of items inside a container",

    comparisonTable: {
      title: "Item Alignment Behavior Comparison",
      columns: ["Utility", "When It Works", "What It Does"],
      rows: [
        {
          feature: "items-start/items-end",
          values: ["Flex or grid container", "Aligns items to start/end of cross axis"],
        },
        {
          feature: "items-center",
          values: ["Flex or grid container", "Centers items in cross axis"],
        },
        {
          feature: "items-baseline",
          values: ["Flex container", "Aligns items based on text baseline"],
        },
        {
          feature: "items-stretch",
          values: ["Flex or grid container", "Stretches items to fill cross axis"],
        },
      ],
    },

    types: [
      "items-start",
      "items-center",
      "items-end",
      "items-baseline",
      "items-stretch",
    ],

    diagrams: {
      "items-start": {
        title: "Items aligned to start",
        description: "Items are aligned to the start of the cross axis",
        classes: "flex items-start h-24 bg-slate-800 rounded p-2 gap-2",
      },
      "items-center": {
        title: "Items centered",
        description: "Items are centered along the cross axis",
        classes: "flex items-center h-24 bg-slate-800 rounded p-2 gap-2",
      },
      "items-end": {
        title: "Items aligned to end",
        description: "Items are aligned to the end of the cross axis",
        classes: "flex items-end h-24 bg-slate-800 rounded p-2 gap-2",
      },
      "items-baseline": {
        title: "Items aligned by baseline",
        description: "Items align based on text baseline",
        classes: "flex items-baseline h-24 bg-slate-800 rounded p-2 gap-2",
      },
      "items-stretch": {
        title: "Items stretched",
        description: "Items stretch to fill the container height",
        classes: "flex items-stretch h-24 bg-slate-800 rounded p-2 gap-2",
      },
    },

    benefits: {
      "items-start": [
        "Aligns items consistently at the top",
        "Useful for predictable layouts",
      ],
      "items-center": [
        "Creates visually balanced layouts",
        "Common for UI components and cards",
      ],
      "items-end": [
        "Aligns items at the bottom",
        "Helpful for footer or baseline layouts",
      ],
      "items-baseline": [
        "Aligns text naturally across items",
        "Ideal for typography-heavy rows",
      ],
      "items-stretch": [
        "Fills available vertical space",
        "Good for equal-height layouts",
      ],
    },

    commonUseCases: {
      "items-start": ["Top-aligned navigation bars", "Header layouts"],
      "items-center": ["Buttons with icons", "Card layouts"],
      "items-end": ["Bottom-aligned controls", "Footer toolbars"],
      "items-baseline": ["Text with different font sizes", "Form labels and inputs"],
      "items-stretch": ["Equal-height columns", "Dashboard layouts"],
    },

    examples: {
      "items-start": [
        {
          title: "Start Aligned Items",
          note: "Items align to the start of the cross axis",
          code: `<div class="flex items-start h-24 gap-2">
  <div class="bg-slate-600 text-white px-3 py-2 rounded">Item A</div>
  <div class="bg-slate-600 text-white px-3 py-4 rounded">Item B</div>
  <div class="bg-slate-600 text-white px-3 py-6 rounded">Item C</div>
</div>`,
          demoItems: ["Item A", "Item B", "Item C"],
        },
      ],
      "items-center": [
        {
          title: "Centered Items",
          note: "Items are centered along the cross axis",
          code: `<div class="flex items-center h-24 gap-2">
  <div class="bg-slate-600 text-white px-3 py-2 rounded">Item A</div>
  <div class="bg-slate-600 text-white px-3 py-4 rounded">Item B</div>
  <div class="bg-slate-600 text-white px-3 py-6 rounded">Item C</div>
</div>`,
          demoItems: ["Item A", "Item B", "Item C"],
        },
      ],
      "items-end": [
        {
          title: "End Aligned Items",
          note: "Items align to the end of the cross axis",
          code: `<div class="flex items-end h-24 gap-2">
  <div class="bg-slate-600 text-white px-3 py-2 rounded">Item A</div>
  <div class="bg-slate-600 text-white px-3 py-4 rounded">Item B</div>
  <div class="bg-slate-600 text-white px-3 py-6 rounded">Item C</div>
</div>`,
          demoItems: ["Item A", "Item B", "Item C"],
        },
      ],
      "items-baseline": [
        {
          title: "Baseline Aligned Items",
          note: "Items align based on text baseline",
          code: `<div class="flex items-baseline h-24 gap-2">
  <div class="bg-slate-600 text-white text-sm px-3 py-2 rounded">Small</div>
  <div class="bg-slate-600 text-white text-base px-3 py-2 rounded">Medium</div>
  <div class="bg-slate-600 text-white text-xl px-3 py-2 rounded">Large</div>
</div>`,
          demoItems: ["Small", "Medium", "Large"],
        },
      ],
      "items-stretch": [
        {
          title: "Stretched Items",
          note: "Items stretch to fill the container height",
          code: `<div class="flex items-stretch h-24 gap-2">
  <div class="bg-slate-600 text-white px-3 rounded">Item A</div>
  <div class="bg-slate-600 text-white px-3 rounded">Item B</div>
  <div class="bg-slate-600 text-white px-3 rounded">Item C</div>
</div>`,
          demoItems: ["Item A", "Item B", "Item C"],
        },
      ],
    },

    commonMistakes: {
      "items-center": [
        {
          title: "Confusing align-items with justify-content",
          reason:
            "Align-items works on the cross axis, while justify-content works on the main axis.",
          example: `<div class="flex items-center"> // Vertical alignment, not horizontal
  <div>Item</div>
</div>`,
          level: "warning",
        },
      ],
      "items-baseline": [
        {
          title: "Using baseline without text",
          reason:
            "Baseline alignment only makes sense when items contain text.",
          example: `<div class="flex items-baseline">
  <div class="h-8 w-8 bg-slate-600"></div>
  <div class="h-12 w-12 bg-slate-600"></div>
</div>`,
          level: "info",
        },
      ],
    },

    additionalSections: [],
  },
};
