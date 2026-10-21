import { test, expect } from "@playwright/test";

test.describe("1. Carga inicial", () => {
  test("la ficha carga con su título y precio", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Serum Antiarrugas");
    await expect(page.locator(".product__price")).toHaveText("20,40\u00A0€");
  });
});

test.describe("2. Layout responsive", () => {
  test("imagen e información separadas, en columnas en escritorio y apiladas en móvil", async ({
    page,
  }, testInfo) => {
    await page.goto("/");

    const image = await page.locator(".product__media").boundingBox();
    const info = await page.locator(".product__info").boundingBox();

    if (testInfo.project.name === "desktop") {
      expect(info.x, "la información debe estar a la derecha de la imagen").toBeGreaterThan(
        image.x + image.width,
      );
      expect(Math.abs(info.y - image.y), "ambas columnas deben empezar arriba").toBeLessThan(50);
    } else {
      expect(
        info.y,
        "la información debe estar debajo de la imagen, con separación",
      ).toBeGreaterThan(image.y + image.height);
    }
  });
});

test.describe("3. Selector de variantes", () => {
  test("al elegir otra variante se actualizan precio, imagen y URL", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("30 ml", { exact: true }).check();

    await expect(page.locator(".product__price")).toHaveText("35,50\u00A0€");
    await expect(page.locator(".product__image")).toHaveAttribute(
      "alt",
      "Serum Antiarrugas, formato 30 ml",
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

  test("ignora una variante inexistente en la URL sin errores", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/?variant=no-existe");

    await expect(page.getByLabel("10 ml", { exact: true })).toBeChecked();
    expect(errors, "no debe haber errores de JavaScript").toEqual([]);
  });
});

test.describe("4. Añadir al carrito", () => {
  test("añade el producto y actualiza el contador", async ({ page }) => {
    await page.goto("/");
    const addButton = page.getByRole("button", { name: "Añadir al carrito" });

    await addButton.click();

    await expect(page.locator(".cart-count")).toHaveText("1");
    await expect(page.locator(".product__message")).toHaveText("Añadido al carrito");
    await expect(addButton).toBeEnabled();
  });

  test("desactiva el botón mientras se añade", async ({ page }) => {
    await page.goto("/");
    const addButton = page.locator(".product__add-to-cart");

    await addButton.click();

    await expect(addButton).toBeDisabled();
    await expect(addButton).toHaveText("Añadiendo...");
    await expect(addButton).toBeEnabled();
    await expect(addButton).toHaveText("Añadir al carrito");
  });

  test("un doble clic solo añade una unidad", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Añadir al carrito" }).dblclick();

    await expect(page.locator(".cart-count")).toHaveText("1");
    await page.waitForTimeout(1000);
    await expect(page.locator(".cart-count")).toHaveText("1");
  });
});

test.describe("5. Pestañas accesibles", () => {
  test("estructura ARIA de pestañas", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("tablist")).toBeVisible();
    await expect(page.getByRole("tab", { name: "Ingredientes" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByRole("tab", { name: "Modo de uso" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    await expect(page.getByRole("tabpanel", { name: "Ingredientes" })).toBeVisible();
    await expect(page.getByRole("tabpanel", { name: "Modo de uso" })).toBeHidden();
  });

  test("al pulsar una pestaña se muestra su panel", async ({ page }) => {
    await page.goto("/");
    const usageTab = page.getByRole("tab", { name: "Modo de uso" });

    await usageTab.click();

    await expect(usageTab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tab", { name: "Ingredientes" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    await expect(page.getByRole("tabpanel", { name: "Modo de uso" })).toBeVisible();
    await expect(page.getByRole("tabpanel", { name: "Ingredientes" })).toBeHidden();
  });
});
