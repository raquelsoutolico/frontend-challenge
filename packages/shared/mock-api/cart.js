let cartCount = 0;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function addToCart(variant) {
  await delay(600);

  if (!variant.available) {
    throw new Error("Esta variante está sin stock");
  }

  cartCount++;
  return { count: cartCount };
}
