import { describe, expect, it } from "vitest";
import { formatBytes, formatMs, formatP95, humanizeSeconds, mean, pct, table, truncate } from "../src/format.ts";

describe("format helpers", () => {
  it("formats bytes", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(1024)).toBe("1.0 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
  });

  it("formats durations", () => {
    expect(formatMs(0.5)).toBe("<1ms");
    expect(formatMs(12)).toBe("12ms");
    expect(formatMs(2500)).toBe("2.50s");
    expect(humanizeSeconds(90061)).toBe("1d 1h 1m 1s");
  });

  it("computes percentiles and mean", () => {
    expect(formatP95([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])).toBe(19);
    expect(formatP95([])).toBe(0);
    expect(mean([2, 4, 6])).toBe(4);
  });

  it("computes percentages", () => {
    expect(pct(1, 8)).toBe("12.5%");
    expect(pct(0, 0)).toBe("0%");
  });

  it("renders a padded table", () => {
    const t = table({ headers: ["id", "val"], rows: [[1, "x"], [2, "longer"]] });
    expect(t).toContain("id");
    expect(t).toContain("longer");
    expect(t.split("\n").length).toBeGreaterThan(3);
  });

  it("truncates long strings", () => {
    expect(truncate("a".repeat(100), 10)).toHaveLength(10);
    expect(truncate("short")).toBe("short");
  });
});