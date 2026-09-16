export function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v >= 100 || i === 0 ? v.toFixed(0) : v.toFixed(1)} ${units[i]}`;
}

export function formatMs(ms: number): string {
  if (!Number.isFinite(ms)) return "—";
  if (ms < 1) return "<1ms";
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function humanizeSeconds(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "—";
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = Math.floor(s % 60);
  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);
  return parts.join(" ");
}

export function pct(part: number, total: number): string {
  if (!Number.isFinite(total) || total <= 0) return "0%";
  return `${Math.round((part / total) * 1000) / 10}%`;
}

export function formatP95(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.95) - 1);
  return sorted[idx];
}

export function mean(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export interface TableOptions {
  headers: string[];
  rows: (string | number)[][];
  indent?: number;
}

export function table(opts: TableOptions): string {
  const widths: number[] = opts.headers.map((h, i) =>
    Math.max(h.length, ...opts.rows.map((r) => String(r[i] ?? "").length))
  );
  const pad = (v: unknown, i: number) => String(v ?? "").padEnd(widths[i]);
  const line = (cells: string[]) => `  ${cells.join("  ").trimEnd()}`;
  const sep = `  ${widths.map((w) => "-".repeat(w)).join("  ")}`;
  const out: string[] = [];
  if (opts.indent) out.push("");
  out.push(line(opts.headers.map((h, i) => pad(h, i))));
  out.push(sep);
  for (const row of opts.rows) out.push(line(row.map((c, i) => pad(c, i))));
  out.push("");
  return out.join("\n");
}

export function truncate(s: string, max = 80): string {
  if (!s || s.length <= max) return s ?? "";
  return `${s.slice(0, Math.max(0, max - 1))}…`;
}

export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}