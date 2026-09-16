export function shannonEntropy(s: string): number {
  const t = String(s ?? "");
  if (!t.length) return 0;
  const counts = new Map<string, number>();
  for (const ch of t) counts.set(ch, (counts.get(ch) || 0) + 1);
  let e = 0;
  const len = t.length;
  for (const c of counts.values()) {
    const p = c / len;
    e -= p * Math.log2(p);
  }
  return e;
}

export function toSlug(s: string): string {
  return String(s ?? "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isBase64(s: string): boolean {
  const t = String(s ?? "").trim();
  if (!t || t.length % 4 !== 0) return false;
  return /^[A-Za-z0-9+/]*={0,2}$/.test(t) && t.length > 8;
}

export function looksHex(s: string): boolean {
  const t = String(s ?? "").trim();
  return t.length >= 6 && t.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(t);
}

export function looksUrlEncoded(s: string): boolean {
  return /%[0-9a-fA-F]{2}/.test(String(s ?? ""));
}