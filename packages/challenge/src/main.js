import "@frontend-challenge/shared/tokens.css";
import "./style.css";
import { formatPrice } from "./utils/format-price.js";
import product from "@frontend-challenge/shared/data/product.json";

const priceElement = document.querySelector(".product__price");
const imageElement = document.querySelector(".product__image");
const variantPicker = document.querySelector(".variant-picker");


function findVariant(id) {
  return product.variants.find((variant) => variant.id === id);
}

function renderVariant(variant) {
  priceElement.textContent = formatPrice(variant.price);
  imageElement.src = variant.image;
  imageElement.alt = `${product.title}, formato ${variant.size}`;
}

variantPicker.addEventListener('change', (event) => {
  const variantId = event.target.value;
  const variant = findVariant(variantId);
  renderVariant(variant);

  const url = new URL(window.location.href);
  url.searchParams.set("variant", variantId);
  history.replaceState(null, "", url);
});


const initialId = new URLSearchParams(window.location.search).get("variant");
const initialVariant = findVariant(initialId);

if (initialVariant && initialVariant.available) {
  const initialRadio = document.querySelector(`input[value="${initialId}"]`);
  initialRadio.checked = true;
  renderVariant(initialVariant);
}