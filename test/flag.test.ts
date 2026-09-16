import { describe, expect, it } from "vitest";
import { looksLikeFlag, parseFlags, randomFlag, shaHex } from "../src/flag.ts";

describe("flag helpers", () => {
  it("generates flags matching the default pattern", () => {
    for (let i = 0; i < 50; i++) {
      expect(looksLikeFlag(randomFlag())).toBe(true);
      expect(randomFlag("academy").startsWith("academy{")).toBe(true);
    }
  });

  it("recognizes flag-shaped strings", () => {
    expect(looksLikeFlag("zhctf{abc_123-ABC}")).toBe(true);
    expect(looksLikeFlag("not a flag")).toBe(false);
    expect(looksLikeFlag("zhctf{xy}")).toBe(false);
  });

  it("extracts flags from arbitrary text", () => {
    const flags = parseFlags("flag is zhctf{a1b2} and academy{zz9} plus zhctf{a1b2} again");
    expect(flags).toEqual(["zhctf{a1b2}", "academy{zz9}"]);
  });

  it("hashes deterministically", () => {
    expect(shaHex("payload")).toBe("239f59ed55e737c77147cf55ad0c1b030b6d7ee748a7426952f9b852d5a935e5");
    expect(shaHex("payload")).toHaveLength(64);
  });
});