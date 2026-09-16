import { describe, expect, it } from "vitest";
import { findTool, GEEK_TOOLS, TOOL_CATEGORIES, toolsByCategory } from "../src/specs.ts";
import { isBase64, looksHex, looksUrlEncoded, shannonEntropy, toSlug } from "../src/strings.ts";

describe("tool registry", () => {
  it("registers every tool exactly once with a unique id", () => {
    const ids = GEEK_TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const t of GEEK_TOOLS) {
      expect(t.name.length).toBeGreaterThan(0);
      expect(t.description.length).toBeGreaterThan(10);
      expect(TOOL_CATEGORIES).toContain(t.category);
    }
  });

  it("finds tools by id", () => {
    expect(findTool("ctf-lab")?.id).toBe("ctf-lab");
    expect(findTool("missing")).toBeUndefined();
  });

  it("groups by category", () => {
    expect(toolsByCategory("lab").map((t) => t.id)).toContain("ctf-lab");
    expect(toolsByCategory("crypto").map((t) => t.id)).toContain("ctf-automation");
  });
});

describe("string helpers", () => {
  it("calculates shannon entropy", () => {
    expect(shannonEntropy("aaaaa")).toBe(0);
    expect(shannonEntropy("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")).toBeGreaterThan(5.9);
  });

  it("slugifies", () => {
    expect(toSlug("Hello, World! 2026")).toBe("hello-world-2026");
    expect(toSlug("  spaced   out  ")).toBe("spaced-out");
  });

  it("detects encodings", () => {
    expect(isBase64("aGVsbG8gd29ybGQ=")).toBe(true);
    expect(isBase64("not base64!!")).toBe(false);
    expect(looksHex("deadbeef")).toBe(true);
    expect(looksHex("xyz")).toBe(false);
    expect(looksUrlEncoded("a%20b")).toBe(true);
  });
});