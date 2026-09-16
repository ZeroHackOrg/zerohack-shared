import type { GeekToolInfo, ToolCategory } from "./types.ts";

const VERSION = "0.1.0";

export const GEEK_TOOLS: GeekToolInfo[] = [
  {
    id: "shared",
    name: "shared",
    version: VERSION,
    category: "assistant",
    description: "Shared types, schemas and utilities used by every geek package.",
    topics: ["contracts", "types"],
  },
  {
    id: "cli",
    name: "zerohack cli",
    version: VERSION,
    category: "assistant",
    description: "Unified CLI aggregating every geek tool behind a single `zh` command.",
    topics: ["cli", "automation"],
  },
  {
    id: "supalite-api",
    name: "supalite-api",
    version: VERSION,
    category: "web",
    description: "PostgREST-compatible REST API over SQLite and Postgres. Conformance-tested centerpiece for the Supabase Select 2026 build.",
    topics: ["postgrest", "supabase", "sqlite", "postgres", "api"],
  },
  {
    id: "ctf-automation",
    name: "ctf-automation",
    version: VERSION,
    category: "crypto",
    description: "CTF solving automation: encoding chains, hashing, XOR brute force, one-shot HTTP requests and flag parsing.",
    topics: ["ctf", "crypto", "encoding", "forensics"],
  },
  {
    id: "ctf-lab",
    name: "ctf-lab",
    version: VERSION,
    category: "lab",
    description: "Automated workplace that hosts protocol CTFs (http, ssh, tcp, udp, ip, dns, tls) as isolated containers for the Academy.",
    topics: ["ctf", "docker", "lab", "academy"],
  },
  {
    id: "recon-bot",
    name: "recon-bot",
    version: VERSION,
    category: "recon",
    description: "Passive-first recon automation: DNS enumeration, RDAP/WHOIS, subdomain discovery, TCP port probing and HTTP fingerprinting.",
    topics: ["recon", "dns", "ports", "fingerprint"],
  },
  {
    id: "secret-scanner",
    name: "secret-scanner",
    version: VERSION,
    category: "devsecops",
    description: "Entropy + pattern secret scanner for source trees: AWS, Google, GitHub, Slack, Stripe, JWTs, private keys and high-entropy strings.",
    topics: ["security", "secrets", "ci", "devsecops"],
  },
  {
    id: "log-analyzer",
    name: "log-analyzer",
    version: VERSION,
    category: "forensics",
    description: "Streaming parser + statistics for nginx/apache/jsonl logs: traffic stats, percentiles, anomalies and burst detection.",
    topics: ["logs", "analytics", "forensics", "anomalies"],
  },
  {
    id: "osint-cli",
    name: "osint-cli",
    version: VERSION,
    category: "recon",
    description: "OSINT helpers: DNS records, RDAP/ASN lookups, email address pattern generation and username variation enumeration.",
    topics: ["osint", "dns", "rdap", "email"],
  },
  {
    id: "ssh-hardener",
    name: "ssh-hardener",
    version: VERSION,
    category: "devsecops",
    description: "Audit and generate hardened sshd_config/ssh_config against a best-practice checklist with a pass/fail score.",
    topics: ["ssh", "hardening", "devsecops"],
  },
  {
    id: "honeypot",
    name: "honeypot",
    version: VERSION,
    category: "network",
    description: "Lab-safe pseudo-honeypot with realistic banners (ssh, http, smtp) that records every connection to a JSONL telemetry sink.",
    topics: ["honeypot", "network", "telemetry"],
  },
  {
    id: "pal",
    name: "pal",
    version: VERSION,
    category: "ai",
    description: "AI-lite assistant: routes natural-language commands to geek tools and plans full hackathon submissions (timeline, rubrics, demo script).",
    topics: ["assistant", "hackathon", "automation"],
  },
] as const;

export const GEEK_TOOL_MAP: ReadonlyMap<string, GeekToolInfo> = new Map(GEEK_TOOLS.map((t) => [t.id, t]));

export const GEEK_TOOL_IDS: readonly string[] = GEEK_TOOLS.map((t) => t.id);

export const TOOL_CATEGORIES: readonly ToolCategory[] = [
  "crypto",
  "web",
  "network",
  "recon",
  "forensics",
  "devsecops",
  "lab",
  "ai",
  "assistant",
];

export function findTool(id: string): GeekToolInfo | undefined {
  return GEEK_TOOL_MAP.get(id);
}

export function toolsByCategory(category: ToolCategory): GeekToolInfo[] {
  return GEEK_TOOLS.filter((t) => t.category === category);
}