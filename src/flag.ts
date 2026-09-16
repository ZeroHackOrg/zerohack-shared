import { createHash, randomBytes, randomInt } from "node:crypto";

export const DEFAULT_FLAG_PATTERN = /^zhctf\{[A-Za-z0-9_-]{4,64}\}$/;

const FLAG_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";

export function randomFlag(prefix = "zhctf", length = 16): string {
  const body = Array.from({ length }, () => FLAG_CHARS[randomInt(0, FLAG_CHARS.length)]).join("");
  return `${prefix}{${body}}`;
}

export function looksLikeFlag(s: string): boolean {
  return DEFAULT_FLAG_PATTERN.test(String(s ?? "").trim());
}

export function parseFlags(text: string): string[] {
  if (!text) return [];
  return Array.from(new Set((String(text).match(/[A-Za-z0-9_-]+\{[A-Za-z0-9_-]{2,64}\}/g) || []).map((f) => f.trim())));
}

export function shaHex(payload: string): string {
  return createHash("sha256").update(String(payload ?? "")).digest("hex");
}

export function fingerprint(): string {
  return randomBytes(16).toString("hex");
}