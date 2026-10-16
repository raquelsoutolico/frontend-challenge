# Prueba técnica: ficha de producto

¡Gracias por dedicar tu tiempo a esta prueba!

Vas a trabajar sobre la ficha de producto de una tienda online de cosmética. La página ya tiene la
estructura HTML, los estilos básicos y unos datos de ejemplo. Tu trabajo es completarla con CSS y
JavaScript.

## Antes de empezar

- **Tiempo orientativo:** entre 2 y 3 horas. No es un límite estricto: preferimos algo bien hecho
  y sin terminar a algo completo y apresurado.
- **Fecha de entrega:** 5 días desde la recepción de esta prueba.
- **Tecnologías:** HTML, CSS y JavaScript sin frameworks ni librerías (nada de React, jQuery,
  Tailwind, etc.).
- **Uso de IA:** puedes usar herramientas de IA, pero debes poder explicar y defender cada línea
  de tu código en el readme que adjuntes.

## Puesta en marcha

Necesitas **Node.js 22** o superior.

```bash
npm install
npx playwright install chromium
npm run dev
```

La página se abrirá en `http://localhost:5173`.

## Estructura del proyecto

```
├── index.html              → HTML de la página
├── src/
│   ├── main.js             → aquí va tu JavaScript
│   ├── style.css           → estilos de la página
│   ├── utils/
│   │   └── format-price.js → formatea precios (contiene un bug)
│   └── shared/             → NO modificar
│       ├── tokens.css      → colores, tipografía y espaciados
│       ├── data/           → datos del producto
│       └── mock-api/       → API simulada del carrito
└── e2e/                    → tests en navegador
```

## Reglas

- **No modifiques** nada dentro de `src/shared/` ni los tests existentes.
- **No cambies** las clases, `id` ni textos que ya existen en el HTML: los tests los usan. Sí
  puedes **añadir** elementos, clases y atributos.
- Usa los **design tokens** de `tokens.css` (por ejemplo, `var(--color-primary)`) en lugar de
  valores inventados.
- Haz **commits pequeños y descriptivos** a medida que avanzas. Revisaremos el historial.

## Tareas

### 1. Arregla `formatPrice`

Ejecuta los tests unitarios:

```bash
npm test
```

Algunos fallan. Encuentra el problema en `src/utils/format-price.js` y corrígelo sin modificar los
tests.

### 2. Layout responsive

- **Móvil** (por defecto): una sola columna, con la imagen arriba y la información debajo.
- **Escritorio** (a partir de `768px` de ancho): dos columnas, con la imagen a la izquierda y la
  información a la derecha.
- La imagen y la información deben tener separación entre ellas en ambos casos.

### 3. Selector de variantes

Al elegir un tamaño:

- El precio se actualiza con el de esa variante, formateado con `formatPrice` (por ejemplo,
  `35,50 €`).
- La imagen cambia a la de la variante, y su `alt` pasa a ser exactamente
  `Serum Antiarrugas, formato 30 ml` (con el tamaño correspondiente).
- La URL se actualiza con el parámetro `variant` y el `id` de la variante (por ejemplo,
  `?variant=9187329489`), **sin recargar la página**.

Además, si se abre la página con `?variant=` en la URL:

- Si la variante existe y está disponible, se carga ya seleccionada.
- Si no existe o está agotada, se mantiene la variante por defecto.

Los datos están en `src/shared/data/product.json`. Los precios están en céntimos.

### 4. Añadir al carrito

Al pulsar **Añadir al carrito**, llama a la función `addToCart` de `src/shared/mock-api/cart.js`
con la variante seleccionada. Simula una petición a un servidor: tarda unos milisegundos y puede
lanzar un error.

- Mientras se procesa, el botón está **desactivado** y muestra el texto `Añadiendo...`.
- Si va bien, el contador del carrito (`.cart-count`) muestra el número que devuelve la API y el
  mensaje (`.product__message`) muestra `Añadido al carrito`.
- Si falla, el mensaje muestra el texto del error.
- Al terminar, en cualquier caso, el botón vuelve a su estado y texto originales.
- Un doble clic rápido solo debe añadir **una** unidad.

### 5. Pestañas accesibles

Convierte los bloques **Ingredientes** y **Modo de uso** en pestañas:

- Solo se ve el contenido de la pestaña activa. Al cargar, la activa es **Ingredientes**.
- Al pulsar una pestaña, se muestra su contenido y se oculta el otro.
- Deben ser accesibles para lectores de pantalla siguiendo el patrón
  [ARIA Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): roles `tablist`, `tab` y
  `tabpanel`, `aria-selected` y la relación entre cada pestaña y su panel.
- Los nombres de las pestañas deben ser exactamente `Ingredientes` y `Modo de uso`.
- La navegación con teclado entre pestañas **no** es necesaria.

### Bonus (opcional): CRO

Crea un archivo `CRO.md` y responde en unas pocas líneas: **¿qué cambiarías en esta ficha para
mejorar la conversión y cómo medirías si el cambio funciona?**

## Comandos útiles

| Comando            | Qué hace                                         |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Arranca la página en modo desarrollo             |
| `npm test`         | Ejecuta los tests unitarios                      |
| `npm run test:e2e` | Ejecuta los tests en navegador (móvil y desktop) |
| `npm run lint`     | Revisa el código con ESLint                      |
| `npm run format`   | Formatea el código con Prettier                  |

Los tests incluidos son solo una parte de los que usaremos para evaluar. Que pasen es una buena
señal, pero no garantiza que todo esté completo: revisa bien cada requisito.

## Entrega

1. Crea tu repositorio a partir de esta plantilla con **Use this template**, marcándolo como
   **privado**.
2. Trabaja en ese repositorio haciendo commits a medida que avanzas.
3. Cuando termines, invita como colaborador a **raquelsoutolico**
   (Settings → Collaborators → Add people) y avísanos por correo.

## Qué vamos a valorar

- **Funcionalidad:** que cada tarea cumpla sus requisitos.
- **Calidad del código:** nombres claros, código organizado y sin repeticiones innecesarias.
- **HTML semántico y accesibilidad.**
- **CSS:** enfoque mobile first, uso de los tokens y un layout limpio.
- **Uso de Git:** commits frecuentes y con mensajes que expliquen el cambio.
- **Criterio:** si tomas alguna decisión que no está en el enunciado, explícala en un archivo
  `NOTAS.md`.

Si algo no está claro, toma la decisión que te parezca más razonable y anótala. ¡Mucha suerte!
