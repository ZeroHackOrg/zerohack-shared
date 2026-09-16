import { describe, expect, it } from "vitest";
import { assertPort, chunked, isPrivileged, parsePortList, randomPort } from "../src/ports.ts";

describe("port helpers", () => {
  it("parses port lists, ranges and dedupes", () => {
    expect(parsePortList("80,443,8000-8002")).toEqual([80, 443, 8000, 8001, 8002]);
    expect(parsePortList("22")).toEqual([22]);
    expect(() => parsePortList("99999")).toThrow();
    expect(() => parsePortList("9-8")).toThrow();
  });

  it("generates random ports in range", () => {
    for (let i = 0; i < 20; i++) {
      const p = randomPort(1024, 4000);
      expect(p).toBeGreaterThanOrEqual(1024);
      expect(p).toBeLessThanOrEqual(4000);
    }
    expect(() => randomPort(5000, 1024)).toThrow();
  });

  it("classifies privileged ports", () => {
    expect(isPrivileged(80)).toBe(true);
    expect(isPrivileged(8080)).toBe(false);
  });

  it("asserts valid ports only", () => {
    expect(() => assertPort(443)).not.toThrow();
    expect(() => assertPort(0)).toThrow();
    expect(() => assertPort(1.5)).toThrow();
  });

  it("chunks arrays", () => {
    expect(chunked([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
});