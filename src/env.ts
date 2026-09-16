import { createHash } from "node:crypto";

const DEFAULT_MIN_LENGTH = 8;
const DEFAULT_MAX_LENGTH = 400;

export function splitTokens(raw: string | undefined): string[] {
  if (!raw) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(/[,;\s]+/)) {
    const t = part.trim();
    if (t && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}

export function parseEnvList(
  raw: string | undefined,
  minLength = DEFAULT_MIN_LENGTH,
  maxLength = DEFAULT_MAX_LENGTH
): string[] {
  return splitTokens(raw).filter((t) => t.length >= minLength && t.length <= maxLength);
}

export function maskSecret(secret: unknown, keep = 4): string {
  const t = String(secret ?? "").trim();
  if (!t) return "";
  if (t.length <= keep + 2) return "•".repeat(Math.min(t.length, 8));
  return `${t.slice(0, 2)}${"•".repeat(Math.min(6, t.length - keep))}${t.slice(-keep)}`;
}

export function keyRefHex(secret: string): string {
  return createHash("sha256").update(String(secret ?? "")).digest("hex").slice(0, 12);
}

export function isProbablySecret(s: string): boolean {
  const t = String(s ?? "").trim();
  if (t.length < 16) return false;
  if (/\s/.test(t)) return false;
  const chars = new Set(t).size;
  return chars / t.length > 0.5;
}

export function dedupeStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of values) {
    const t = v.trim();
    if (t && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}