<div align="center">

```
 ____________ _____   ____  _    _          _____ _  __
|___  /  ____|  __ \ / __ \| |  | |   /\   / ____| |/ /
   / /| |__  | |__) | |  | | |__| |  /  \ | |    | ' / 
  / / |  __| |  _  /| |  | |  __  | / /\ \| |    |  <  
 / /__| |____| | \ \| |__| | |  | |/ ____ \ |____| . \ 
/_____|______|_|  \_\____/|_|  |_/_/    \_\_____|_|\_\

              Fortifying the Digital Frontier
```

# @zerohack/shared

**Shared types, schemas, and utilities used by every geek tool in the ZeroHack ecosystem**

[![License](https://img.shields.io/badge/license-Apache--2.0-00B0BD?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](tsconfig.json)
[![Zero Budget](https://img.shields.io/badge/cost-%240-00b894?style=for-the-badge)](https://zerohack.org)

**Part of the [ZeroHack](https://zerohack.org) Geek Tools ecosystem**
Category: `assistant` · `contracts` · `types` · `shared`

</div>

---

> **⚡ Zero Budget. Zero Cloud Dependencies. Pure Local Power.**
> Every tool in this ecosystem runs entirely offline — no API keys, no telemetry,
> no vendor lock-in. Built for security practitioners, CTF players, and ethical
> hackers who want deterministic, auditable, zero-cost tooling.

---

## What It Does

`@zerohack/shared` is the **single source of truth** for the entire ZeroHack
geek tool ecosystem. It exports types, schemas, formatting utilities, and the
canonical **Geek Tool catalog** — every tool's id, name, version, category,
description, topics, and protocol requirements.

Every other package in this monorepo imports from here. Nothing hard-codes
the catalog — edit `specs.ts` and the CLI catalog, admin console, and package
metadata all update together.

---

## Categories

The catalog organizes tools into these families:

| Category | Tools |
|---|---|
| `crypto` | ctf-automation |
| `recon` | recon-bot, osint-cli |
| `devsecops` | secret-scanner, ssh-hardener |
| `forensics` | log-analyzer |
| `network` | honeypot |
| `lab` | ctf-lab |
| `assistant` | shared, cli, pal |
| `web` | supalite-api |

---

## What's Exported

```ts
import {
  GEEK_TOOLS,       // Full GeekToolInfo[] catalog
  parsePortList,    // "22,80,443,8000-8002" → number[]
  table,            // CLI table formatter
  truncate,         // String truncation
  shannon,          // Shannon entropy (used by secret-scanner)
  // ... types, schemas, format helpers
} from "@zerohack/shared";
```

| Export | Purpose |
|---|---|
| `GEEK_TOOLS` | Catalog: `id`, `name`, `version`, `category`, `description`, `topics` |
| `parsePortList` | Parse port specs into `number[]` (supports ranges) |
| `table` / `truncate` | CLI output formatting |
| `shannon` | Shannon entropy calculation |
| `GeekToolInfo` | TypeScript interface for catalog entries |
| `ToolCategory` | Union type of valid categories |

---

## Install

This is a **library-only package** — no CLI binary. Use it as a dependency:

```bash
# From the monorepo root
npm install   # resolves workspace
```

Or install standalone:

```bash
git clone https://github.com/ZeroHackOrg/zerohack-shared.git
cd zerohack-shared && npm install
```

---

## Tests

```bash
npm run typecheck --workspace @zerohack/shared
npm run test    --workspace @zerohack/shared
```

From the monorepo root:

```bash
npm run geek:typecheck
npm run geek:test
```

---

## Architecture

```
zerohack-shared/
├── src/
│   ├── index.ts       # Re-exports all public API
│   ├── types.ts       # GeekToolInfo, ToolCategory, etc.
│   ├── specs.ts       # Single source of truth: GEEK_TOOLS catalog
│   ├── cve.ts         # CVE-related types and helpers
│   ├── env.ts         # Env var helpers
│   ├── flag.ts        # CTF flag helpers
│   ├── format.ts      # Formatting utilities
│   ├── ports.ts       # parsePortList
│   └── strings.ts     # String utilities (truncate, etc.)
├── test/
│   ├── *.test.ts      # Unit tests (vitest)
├── package.json
├── tsconfig.json
├── README.md
├── LICENSE            # Apache-2.0
├── SECURITY.md
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

**Design principles:**
- Pure functions: no side effects, no I/O.
- Every export is tree-shakeable.
- Deterministic: same input → same output.
- Zero runtime dependencies.
- Strict TypeScript, ESM, `verbatimModuleSyntax`.

---

## Related Packages

| Package | Binary | What It Does |
|---|---|---|
| [@zerohack/cli](https://github.com/ZeroHackOrg/zerohack-cli) | `zh` | Unified CLI |
| [@zerohack/supalite-api](https://github.com/ZeroHackOrg/zerohack-supalite-api) | `zh-api` | PostgREST API |
| [@zerohack/pal](https://github.com/ZeroHackOrg/zerohack-pal) | `zh-pal` | Local AI assistant |
| [@zerohack/honeypot](https://github.com/ZeroHackOrg/zerohack-honeypot) | `zh-honeypot` | Honeypot |
| [@zerohack/osint-cli](https://github.com/ZeroHackOrg/zerohack-osint-cli) | `zh-osint` | OSINT tools |
| [@zerohack/ssh-hardener](https://github.com/ZeroHackOrg/zerohack-ssh-hardener) | `zh-ssh` | SSH auditor |
| [@zerohack/secret-scanner](https://github.com/ZeroHackOrg/zerohack-secret-scanner) | `zh-secret` | Secret scanner |
| [@zerohack/recon-bot](https://github.com/ZeroHackOrg/zerohack-recon-bot) | `zh-recon` | Recon automation |
| [@zerohack/log-analyzer](https://github.com/ZeroHackOrg/zerohack-log-analyzer) | `zh-log` | Log forensics |
| [@zerohack/ctf-lab](https://github.com/ZeroHackOrg/zerohack-ctf-lab) | `zh-lab` | CTF lab runner |
| [@zerohack/ctf-automation](https://github.com/ZeroHackOrg/zerohack-ctf-automation) | `zh-ctf` | CTF solver |
---

## Community

- **Issues:** [GitHub Issues](https://github.com/ZeroHackOrg/zerohack-shared/issues)
- **PRs:** [Pull Requests](https://github.com/ZeroHackOrg/zerohack-shared/pulls)
- **Security:** [SECURITY.md](SECURITY.md) — report vulnerabilities privately
- **Platform:** [zerohack.org](https://zerohack.org)

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) first.

## License

[Apache-2.0](LICENSE) — Copyright 2026 ZeroHack Security
