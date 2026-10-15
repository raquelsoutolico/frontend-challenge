const priceFormatter = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

export function formatPrice(cents) {
  return priceFormatter.format(cents / 100);
}
