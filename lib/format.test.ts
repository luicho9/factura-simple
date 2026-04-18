import { describe, expect, test } from "vitest";
import { formatCurrency, formatDate } from "./format";

describe("formatCurrency", () => {
  test("formats a number as HNL currency string", () => {
    const result = formatCurrency(1500, "HNL");
    expect(result).toContain("L");
  });

  test("formats USD with dollar symbol", () => {
    const result = formatCurrency(1500, "USD");
    expect(result).toContain("$");
  });

  test("formats EUR with euro symbol", () => {
    const result = formatCurrency(250, "EUR");
    expect(result).toContain("€");
  });

  test("falls back gracefully for invalid currency codes", () => {
    const result = formatCurrency(42.5, "INVALID");
    expect(result).toBe("INVALID 42.50");
  });
});

describe("formatDate", () => {
  test("formats a valid date in Spanish", () => {
    const date = new Date(2026, 3, 16); // April 16, 2026
    const result = formatDate(date);
    expect(result).toContain("16");
    expect(result).toContain("2026");
    expect(result).toMatch(/abril/i);
  });

  test("returns empty string for null", () => {
    expect(formatDate(null)).toBe("");
  });

  test("returns empty string for undefined", () => {
    expect(formatDate(undefined)).toBe("");
  });

  test("returns empty string for invalid date", () => {
    expect(formatDate(new Date("not-a-date"))).toBe("");
  });
});
