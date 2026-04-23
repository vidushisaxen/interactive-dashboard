import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getTrendDirection(value) {
  if (value === null || value === undefined) return "neutral";

  if (typeof value === "number") {
    if (value > 0) return "up";
    if (value < 0) return "down";
    return "neutral";
  }

  const text = String(value).trim();
  if (!text) return "neutral";

  if (text.startsWith("+") || text.includes("▲") || text.includes("↑")) return "up";
  if (text.startsWith("-") || text.includes("▼") || text.includes("↓")) return "down";

  const match = text.match(/-?\\d+(?:\\.\\d+)?/);
  if (!match) return "neutral";

  const parsed = Number(match[0]);
  if (!Number.isFinite(parsed)) return "neutral";
  if (parsed > 0) return "up";
  if (parsed < 0) return "down";
  return "neutral";
}
