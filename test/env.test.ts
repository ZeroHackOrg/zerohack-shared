import { describe, expect, it } from "vitest";
import { isProbablySecret, keyRefHex, maskSecret, parseEnvList, splitTokens } from "../src/env.ts";

describe("env helpers", () => {
  it("splits tokens on commas, semicolons and whitespace", () => {
    expect(splitTokens("a b,c;d  e")).toEqual(["a", "b", "c", "d", "e"]);
    expect(splitTokens(undefined)).toEqual([]);
  });

  it("dedupes split tokens", () => {
    expect(splitTokens("k1,k1,k2")).toEqual(["k1", "k2"]);
  });

  it("filters env list by length", () => {
    const long = `${"A".repeat(40)}x`;
    expect(parseEnvList(`short,${long}`)).toEqual([long]);
    expect(parseEnvList("")).toEqual([]);
  });

  it("masks secrets without leaking the middle", () => {
    const m = maskSecret("ABCDEF123456");
    expect(m).toContain("AB");
    expect(m).toContain("3456");
    expect(m === "ABCDEF123456").toBe(false);
  });

  it("produces stable key refs", () => {
    const a = keyRefHex("super-secret-value");
    expect(a).toBe(keyRefHex("super-secret-value"));
    expect(a).toMatch(/^[0-9a-f]{12}$/);
    expect(a).not.toBe(keyRefHex("super-secret-value-2"));
  });

  it("flags high-cardinality long strings as secrets", () => {
    expect(isProbablySecret("Wkdj9fLg2Xm8Qr5vBn0")).toBe(true);
    expect(isProbablySecret("hello world this is just a normal sentence")).toBe(false);
  });
});