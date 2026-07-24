/* Sepet işlemleri — localStorage ile kalıcı */

const CART_KEY = "biocare_cart_v1";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Sepet okunamadı, sıfırlanıyor.", err);
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("biocare:cart-updated", { detail: items }));
}

function cartCount(items = readCart()) {
  return items.reduce((sum, row) => sum + row.qty, 0);
}

function cartTotal(products, items = readCart()) {
  return items.reduce((sum, row) => {
    const p = products.find((x) => x.id === row.id);
    return sum + (p ? p.price * row.qty : 0);
  }, 0);
}

function addToCart(id, qty = 1) {
  const items = readCart();
  const found = items.find((x) => x.id === id);
  if (found) {
    found.qty += qty;
  } else {
    items.push({ id, qty });
  }
  writeCart(items);
  return items;
}

function setQty(id, qty) {
  let items = readCart();
  if (qty <= 0) {
    items = items.filter((x) => x.id !== id);
  } else {
    const found = items.find((x) => x.id === id);
    if (found) found.qty = qty;
  }
  writeCart(items);
  return items;
}

function removeFromCart(id) {
  const items = readCart().filter((x) => x.id !== id);
  writeCart(items);
  return items;
}

function clearCart() {
  writeCart([]);
}

window.BioCareCart = {
  readCart,
  writeCart,
  cartCount,
  cartTotal,
  addToCart,
  setQty,
  removeFromCart,
  clearCart,
};
