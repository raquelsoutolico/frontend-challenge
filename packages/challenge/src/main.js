import "@frontend-challenge/shared/tokens.css";
import "./style.css";
import { formatPrice } from "./utils/format-price.js";
import { addToCart } from "@frontend-challenge/shared/mock-api/cart.js";
import product from "@frontend-challenge/shared/data/product.json";

const priceElement = document.querySelector(".product__price");
const imageElement = document.querySelector(".product__image");
const variantPicker = document.querySelector(".variant-picker");
const addToCartButton = document.querySelector(".product__add-to-cart");
const cartCountElement = document.querySelector(".cart-count");
const messageElement = document.querySelector(".product__message");


function findVariant(id) {
  return product.variants.find((variant) => variant.id === id);
}

function renderVariant(variant) {
  priceElement.textContent = formatPrice(variant.price);
  imageElement.src = variant.image;
  imageElement.alt = `${product.title}, formato ${variant.size}`;
}

let selectedVariant = findVariant(
  variantPicker.querySelector("input:checked").value
);

variantPicker.addEventListener('change', (event) => {
  const variantId = event.target.value;
  const variant = findVariant(variantId);
  selectedVariant = variant; 
  renderVariant(variant);

  const url = new URL(window.location.href);
  url.searchParams.set("variant", variantId);
  history.replaceState(null, "", url);
});

addToCartButton.addEventListener("click", async () => {
  addToCartButton.disabled = true;
  addToCartButton.textContent = "Añadiendo...";
  messageElement.textContent = "";
  messageElement.classList.remove("product__message--error");
  try {
    const { count } = await addToCart(selectedVariant);
    cartCountElement.textContent = count;
    messageElement.textContent = "Añadido al carrito";
  } catch (error) {
    messageElement.textContent = error.message;
    messageElement.classList.add("product__message--error");
  } finally {
    addToCartButton.disabled = false;
    addToCartButton.textContent = "Añadir al carrito";
  }
});


const initialId = new URLSearchParams(window.location.search).get("variant");
const initialVariant = findVariant(initialId);

if (initialVariant && initialVariant.available) {
  const initialRadio = document.querySelector(`input[value="${initialId}"]`);
  initialRadio.checked = true;
  renderVariant(initialVariant);
  selectedVariant = initialVariant;
}