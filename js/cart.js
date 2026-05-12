// cart.js — handles all cart logic

import { state } from "./state.js";
import { renderCartItems } from "./ui.js";

export function addToCart(productId) {
  // find product from allProducts using id
  const product = state.allProducts.find((p) => p.id === parseInt(productId));

  // check if product already in cart
  const existing = state.cart.find((item) => item.id === product.id);

  if (existing) {
    // already in cart — just increase quantity
    existing.quantity += 1;
  } else {
    // new item — add to cart
    state.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    });
  }

  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const badge = document.querySelector("#cartBadge");
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
}

export function removeFromCart(productId) {
  // remove item completely from cart array
  state.cart = state.cart.filter((item) => item.id !== parseInt(productId));
  updateCartBadge();
  renderCartItems();
}

export function updateQuantity(productId, type) {
  const item = state.cart.find((item) => item.id === parseInt(productId));

  if (type === "increase") {
    item.quantity += 1;
  } else {
    item.quantity -= 1;
    // if quantity reaches 0 — remove from cart
    if (item.quantity === 0) {
      removeFromCart(productId);
      return;
    }
  }

  updateCartBadge();
  renderCartItems();
}

export function setupCart() {
  // open/close cart drawer
  const cartTrigger = document.querySelector("#cartTrigger");
  const cartClose = document.querySelector("#cartClose");
  const cartOverlay = document.querySelector("#cartOverlay");
  const cartDrawer = document.querySelector("#cartDrawer");

  cartTrigger.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
  });

  cartClose.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
  });

  cartOverlay.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
  });

  // add to cart — event delegation
  document.addEventListener("click", (e) => {
    if (e.target.closest(".add-to-cart-btn")) {
      const btn = e.target.closest(".add-to-cart-btn");
      addToCart(btn.dataset.id);
    }

    if (e.target.closest(".qty-btn")) {
      const btn = e.target.closest(".qty-btn");
      updateQuantity(btn.dataset.id, btn.dataset.type);
    }

    if (e.target.closest(".remove-btn")) {
      const btn = e.target.closest(".remove-btn");
      removeFromCart(btn.dataset.id);
    }
  });
}
