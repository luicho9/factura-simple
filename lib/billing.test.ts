import { describe, expect, test } from "vitest";
import { computeInvoiceTotals } from "./billing";

describe("computeInvoiceTotals", () => {
  test("empty items returns zero subtotal and total", () => {
    const result = computeInvoiceTotals([], []);
    expect(result.subtotal).toBe(0);
    expect(result.total).toBe(0);
    expect(result.billings).toEqual([]);
  });

  test("single item computes subtotal as quantity × unitPrice", () => {
    const items = [{ quantity: 3, unitPrice: 100 }];
    const result = computeInvoiceTotals(items, []);
    expect(result.subtotal).toBe(300);
    expect(result.total).toBe(300);
  });

  test("multiple items sums all line totals", () => {
    const items = [
      { quantity: 2, unitPrice: 50 },
      { quantity: 1, unitPrice: 200 },
    ];
    const result = computeInvoiceTotals(items, []);
    expect(result.subtotal).toBe(300);
    expect(result.total).toBe(300);
  });

  test("percentage billing computes amount from subtotal", () => {
    const items = [{ quantity: 1, unitPrice: 1000 }];
    const billings = [{ label: "ISV", type: "percentage" as const, value: 15 }];
    const result = computeInvoiceTotals(items, billings);
    expect(result.billings[0].amount).toBe(150);
    expect(result.total).toBe(1150);
  });

  test("fixed billing uses value directly as amount", () => {
    const items = [{ quantity: 1, unitPrice: 500 }];
    const billings = [
      { label: "Envío", type: "fixed" as const, value: 50 },
    ];
    const result = computeInvoiceTotals(items, billings);
    expect(result.billings[0].amount).toBe(50);
    expect(result.total).toBe(550);
  });

  test("mixed billings compute correctly together", () => {
    const items = [{ quantity: 2, unitPrice: 100 }]; // subtotal = 200
    const billings = [
      { label: "ISV", type: "percentage" as const, value: 15 }, // 30
      { label: "Descuento", type: "fixed" as const, value: -20 }, // -20
    ];
    const result = computeInvoiceTotals(items, billings);
    expect(result.subtotal).toBe(200);
    expect(result.billings[0].amount).toBe(30);
    expect(result.billings[1].amount).toBe(-20);
    expect(result.total).toBe(210);
  });
});
