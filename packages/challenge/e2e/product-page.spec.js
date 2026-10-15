import { test, expect } from "@playwright/test";

test("la ficha de producto carga con su título y precio", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Serum Antiarrugas");
    await expect(page.locator(".product__price")).toHaveText("20,40\u00A0€");
});

test.describe("Selector de variantes", () => {
    test("al elegir otra variante se actualizan precio, imagen y URL", async ({ page }) => {
        await page.goto("/");

        await page.getByLabel("30 ml", { exact: true }).check();

        await expect(page.locator(".product__price")).toHaveText("35,50\u00A0€");
        await expect(page.locator(".product__image")).toHaveAttribute(
            "alt",
            "Serum Antiarrugas, formato 30 ml"
        );
        await expect(page).toHaveURL(/variant=9187329489/);
    });

    test("la variante agotada no se puede seleccionar", async ({ page }) => {
        await page.goto("/");

        await expect(page.getByLabel("20 ml (agotado)")).toBeDisabled();
    });

    test("carga la variante indicada en la URL", async ({ page }) => {
        await page.goto("/?variant=9187329489");

        await expect(page.getByLabel("30 ml", { exact: true })).toBeChecked();
        await expect(page.locator(".product__price")).toHaveText("35,50\u00A0€");
    });

    test("ignora una variante agotada en la URL", async ({ page }) => {
        await page.goto("/?variant=9187329488");

        await expect(page.getByLabel("10 ml", { exact: true })).toBeChecked();
        await expect(page.locator(".product__price")).toHaveText("20,40\u00A0€");
    });
});