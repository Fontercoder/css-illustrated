"use client";

import { useState } from "react";

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 1400);
    } catch (error) {
      console.error("Failed to copy:", error);
      setCopiedText(null);
    }
  };

  return { copiedText, copy };
}
