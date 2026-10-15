import { test, expect } from "@playwright/test";

test("la ficha de producto carga con su título y precio", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Serum Antiarrugas");
  await expect(page.locator(".product__price")).toHaveText("20,40\u00A0€");
});
