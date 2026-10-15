import { describe, it, expect } from "vitest";
import { formatPrice } from "./format-price.js";

describe("formatPrice", () => {
  it("formatea céntimos como euros con coma decimal", () => {
    expect(formatPrice(2040)).toBe("20,40\u00A0€");
  });

  it("formatea el cero con dos decimales", () => {
    expect(formatPrice(0)).toBe("0,00\u00A0€");
  });

  it("formatea importes menores de un euro", () => {
    expect(formatPrice(99)).toBe("0,99\u00A0€");
  });

  it("no usa separador de miles con cuatro cifras", () => {
    expect(formatPrice(100000)).toBe("1000,00\u00A0€");
  });

  it("usa punto como separador de miles a partir de cinco cifras", () => {
    expect(formatPrice(1000000)).toBe("10.000,00\u00A0€");
  });
});
