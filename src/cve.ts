/** CVE domain model shared by every geek package that talks about CVEs.
 *  Mirrors the tracked CVE schema used across the ZeroHack platform, plus
 *  a deterministic sample generator so CLI / supalite-api demos run
 *  without touching Firestore. */

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";

export type CveSource =
  | "nvd"
  | "cisa"
  | "github-advisory"
  | "microsoft"
  | "cisco"
  | "oracle"
  | "apache"
  | "snyk"
  | "vulners"
  | "zerosink";

/** Relational (PostgREST-style) projection of a CVE. Columns are the
 *  snake_case names used by the SupaLite schema so `supabase-js`
 *  `select()` can be pointed at it verbatim. */
export interface CveRecord {
  cve_id: string;
  title: string;
  description: string;
  severity: Severity;
  cvss_score: number | null;
  epss: number | null;
  published_at: string | null;
  updated_at: string | null;
  exploit_available: boolean;
  cisa_kev: boolean;
  is_zero_day: boolean;
  source: CveSource | string | null;
  affected_product: string | null;
}

export interface CveReference {
  id: number;
  cve_id: string;
  url: string;
  source: string | null;
  type: string | null;
}

export interface CveIoc {
  id: number;
  cve_id: string;
  type: "ip" | "domain" | "sha256" | "url" | "email" | "c2";
  value: string;
  context: string | null;
}

export const SEVERITY_ORDER: Severity[] = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN"];

export const SEVERITY_SCORE: Record<Severity, [number, number]> = {
  CRITICAL: [9, 10],
  HIGH: [7, 8.9],
  MEDIUM: [4, 6.9],
  LOW: [0.1, 3.9],
  UNKNOWN: [null as unknown as number, null as unknown as number],
};

const SOURCES: CveSource[] = [
  "nvd",
  "cisa",
  "github-advisory",
  "microsoft",
  "cisco",
  "oracle",
  "snyk",
  "vulners",
];

const PRODUCTS = [
  "SonicWall SMA 100",
  "Fortinet FortiOS",
  "WordPress plugin ",
  "SolarWinds Orion",
  "Log4j / Log4j2",
  "Apache HTTP Server",
  "Cisco IOS XE",
  "Microsoft Exchange",
  "Progress MoveIt",
  "VMware ESXi",
  "Zimbra Collaboration",
  "Ivanti Connect Secure",
];

const AFFECTED = [
  "SonicWall SMA 100 series",
  "Fortinet FortiOS 7.2.6",
  "WordPress plugin (contact forms)",
  "SolarWinds Orion 2020.2.5",
  "Apache Log4j 2.0-2.17.1",
  "Apache HTTP Server 2.4.49/50",
  "Cisco IOS XE 17.9",
  "Microsoft Exchange Server 2016/2019",
  "Progress MoveIt Transfer",
  "VMware ESXi 7.0",
  "Zimbra Collaboration 9.0",
  "Ivanti Connect Secure VPN",
];

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rnd: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rnd() * arr.length)];
}

function within(rnd: () => number, [lo, hi]: [number, number]): number {
  if (lo === null || hi === null) return 0;
  return Math.round((lo + rnd() * (hi - lo)) * 10) / 10;
}

/** Deterministic sample corpus — stable across runs for a given seed. */
export function sampleCves(count = 24, seed = 2026): CveRecord[] {
  const rnd = mulberry32(seed);
  const out: CveRecord[] = [];
  for (let i = 0; i < count; i++) {
    const severity = pick(rnd, SEVERITY_ORDER.slice(0, 4));
    const year = 2019 + Math.floor(rnd() * 8);
    const num = 1000 + Math.floor(rnd() * 89999);
    const cveId = `CVE-${year}-${num.toString().padStart(4, "0")}`;
    const product = pick(rnd, PRODUCTS);
    const kr = Math.floor(rnd() * 1000);
    out.push({
      cve_id: cveId,
      title: `${product}${product.endsWith(" ") ? "" : " vulnerability"} — remote code execution ${kr ? `(${kr})` : ""}`.trimEnd(),
      description: `${product} contains an unspecified vulnerability in version parsing allowing an unauthenticated attacker to execute arbitrary code. Vendors report active exploitation in the wild.`,
      severity,
      cvss_score: within(rnd, [4, 10]),
      epss: Math.round(rnd() * 10000) / 10000,
      published_at: new Date(Date.UTC(year, i % 12, (i % 27) + 1)).toISOString(),
      updated_at: new Date(Date.UTC(year, i % 12, (i % 27) + 2)).toISOString(),
      exploit_available: rnd() > 0.45,
      cisa_kev: rnd() > 0.7,
      is_zero_day: rnd() > 0.85,
      source: pick(rnd, SOURCES),
      affected_product: pick(rnd, AFFECTED),
    });
  }
  return out.sort((a, b) => a.cve_id.localeCompare(b.cve_id));
}

export function severityLabel(s: Severity): string {
  return (s || "UNKNOWN").toUpperCase();
}

export function cveSummary(row: CveRecord): string {
  return `${row.cve_id}  [${severityLabel(row.severity)}]  ${row.title}  (${row.source || "unknown"})`;
}