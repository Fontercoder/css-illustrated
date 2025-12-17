export type CursorClass =
  | "cursor-auto"
  | "cursor-default"
  | "cursor-pointer"
  | "cursor-wait"
  | "cursor-text"
  | "cursor-move"
  | "cursor-help"
  | "cursor-not-allowed"
  | "cursor-grab"
  | "cursor-grabbing"
  | "cursor-crosshair"
  | "cursor-zoom-in"
  | "cursor-zoom-out"
  | "cursor-col-resize"
  | "cursor-row-resize";

export const CURSOR_UTILITIES: { cls: CursorClass; desc: string }[] = [
  { cls: "cursor-auto", desc: "Browser decides" },
  { cls: "cursor-default", desc: "Default arrow" },
  { cls: "cursor-pointer", desc: "Clickable target" },
  { cls: "cursor-wait", desc: "Waiting / busy" },
  { cls: "cursor-text", desc: "Text input / selectable" },
  { cls: "cursor-move", desc: "Move / drag" },
  { cls: "cursor-help", desc: "Help / hint" },
  { cls: "cursor-not-allowed", desc: "Disabled / forbidden" },
  { cls: "cursor-grab", desc: "Draggable (grab)" },
  { cls: "cursor-grabbing", desc: "Dragging (grabbing)" },
  { cls: "cursor-crosshair", desc: "Precise selection" },
  { cls: "cursor-zoom-in", desc: "Zoom-in affordance" },
  { cls: "cursor-zoom-out", desc: "Zoom-out affordance" },
  { cls: "cursor-col-resize", desc: "Horizontal resize" },
  { cls: "cursor-row-resize", desc: "Vertical resize" },
];
