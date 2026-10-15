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

test.describe("Añadir al carrito", () => {
    test("añade el producto y actualiza el contador", async ({ page }) => {
        await page.goto("/");
        const addButton = page.getByRole("button", { name: "Añadir al carrito" });

        await addButton.click();

        await expect(page.locator(".cart-count")).toHaveText("1");
        await expect(page.getByRole("status")).toHaveText("Añadido al carrito");
        await expect(addButton).toBeEnabled();
    });

    test("desactiva el botón mientras se añade", async ({ page }) => {
        await page.goto("/");
        const addButton = page.locator(".product__add-to-cart");

        await addButton.click();

        await expect(addButton).toBeDisabled();
        await expect(addButton).toHaveText("Añadiendo...");
        await expect(addButton).toBeEnabled();
    });

    test("un doble clic solo añade una unidad", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("button", { name: "Añadir al carrito" }).dblclick();

        await expect(page.locator(".cart-count")).toHaveText("1");
        await page.waitForTimeout(1000);
        await expect(page.locator(".cart-count")).toHaveText("1");
    });
    });

    test.describe("Pestañas de información", () => {
    test("al pulsar una pestaña se muestra su panel", async ({ page }) => {
        await page.goto("/");
        const usageTab = page.getByRole("tab", { name: "Modo de uso" });

        await usageTab.click();

        await expect(usageTab).toHaveAttribute("aria-selected", "true");
        await expect(page.getByRole("tabpanel", { name: "Modo de uso" })).toBeVisible();
        await expect(page.getByRole("tabpanel", { name: "Ingredientes" })).toBeHidden();
    });

    test("se navega entre pestañas con las flechas, Inicio y Fin", async ({ page }) => {
        await page.goto("/");
        const ingredientsTab = page.getByRole("tab", { name: "Ingredientes" });
        const usageTab = page.getByRole("tab", { name: "Modo de uso" });

        await ingredientsTab.focus();

        await page.keyboard.press("ArrowRight");
        await expect(usageTab).toBeFocused();
        await expect(usageTab).toHaveAttribute("aria-selected", "true");

        await page.keyboard.press("ArrowRight");
        await expect(ingredientsTab).toBeFocused();

        await page.keyboard.press("End");
        await expect(usageTab).toBeFocused();

        await page.keyboard.press("Home");
        await expect(ingredientsTab).toBeFocused();
    });

    test("con Tab se entra en la pestaña activa y después en su panel", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("tab", { name: "Modo de uso" }).click();

        await page.getByRole("button", { name: "Añadir al carrito" }).focus();

        await page.keyboard.press("Tab");
        await expect(page.getByRole("tab", { name: "Modo de uso" })).toBeFocused();

        await page.keyboard.press("Tab");
        await expect(page.getByRole("tabpanel", { name: "Modo de uso" })).toBeFocused();
    });
});