import { describe, expect, test } from "vitest";
import { currencies, mergeCurrencyCodes } from "./currencies";

describe("currencies", () => {
  test("always includes HNL in the selectable currency list", () => {
    expect(currencies.some((currency) => currency.code === "HNL")).toBe(true);
  });

  test("uses the Spanish display name for HNL", () => {
    expect(currencies.find((currency) => currency.code === "HNL")?.name).toBe(
      "lempira hondureño",
    );
  });

  test("merges fallback currencies when the runtime list is incomplete", () => {
    expect(mergeCurrencyCodes(["USD", "EUR"])).toContain("HNL");
  });
});
