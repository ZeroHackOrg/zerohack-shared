import { randomInt } from "node:crypto";

export function randomPort(min = 1024, max = 49151): number {
  if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1 || max > 65535 || min > max) {
    throw new Error(`Invalid port range ${min}-${max}`);
  }
  return randomInt(min, max + 1);
}

export function assertPort(port: number, min = 1, max = 65535): void {
  if (!Number.isInteger(port) || port < min || port > max) {
    throw new Error(`Port must be an integer in ${min}-${max}, got ${port}`);
  }
}

export function isPrivileged(port: number): boolean {
  return Number.isInteger(port) && port > 0 && port < 1024;
}

export function parsePortList(spec: string): number[] {
  const out: number[] = [];
  for (const part of String(spec ?? "").split(/[,;\s]+/)) {
    if (!part) continue;
    const m = /^(\d+)(?:-(\d+))?$/.exec(part.trim());
    if (!m) throw new Error(`Invalid port spec "${part}"`);
    const lo = Number(m[1]);
    const hi = m[2] ? Number(m[2]) : lo;
    assertPort(lo);
    assertPort(hi);
    if (lo > hi) throw new Error(`Invalid port range "${part}"`);
    for (let p = lo; p <= hi; p++) out.push(p);
  }
  return Array.from(new Set(out)).sort((a, b) => a - b);
}

export function chunked<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}