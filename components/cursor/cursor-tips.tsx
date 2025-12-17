import React from "react";

export function CursorTips() {
  return (
    <section className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
      <h3 className="font-semibold">Tips & best practices</h3>
      <ul className="space-y-2 text-muted-foreground text-sm">
        <li>
          <strong>Be explicit:</strong> use `cursor-pointer` for clickable
          elements, `cursor-not-allowed` for disabled controls.
        </li>
        <li>
          <strong>Draggable hints:</strong> use `cursor-grab` on handles and
          switch to `cursor-grabbing` while dragging.
        </li>
        <li>
          <strong>Test without cursor:</strong> ensure touch-only users can
          still interact comfortably.
        </li>
        <li>
          <strong>Fallbacks:</strong> for complex custom cursors provide a
          sensible default for browser/platform mismatches.
        </li>
      </ul>
    </section>
  );
}
