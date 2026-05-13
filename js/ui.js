// ui.js — only responsible for DOM updates

import { state } from "./state.js";

// grab product and message containers once at the top — reuse everywhere
const productContainer = document.querySelector(".products-container");
const messageContainer = document.querySelector("#messageContainer");

// builds product cards from array and displays them on screen
export function renderProducts(products) {
  // show only visibleCount products
  const visibleProducts = products.slice(0, state.visibleCount);
  let html = "";

  // loop through each product and create a card html string
  visibleProducts.forEach((pro) => {
    html += `
      <div class="card">
        <div class="image-container">
          <img src="${pro.thumbnail}" alt="${pro.title}">
        </div>
        <div class="card__body">
          <p class="card__category">${pro.category}</p>
          <h2 class="title">${pro.title}</h2>
          <div class="card__footer">
            <p class="price">$${pro.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${pro.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });

  // inject all cards into DOM in one update
  productContainer.innerHTML = html;

  // show/hide load more button
  const loadMoreBtn = document.querySelector("#loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.style.display =
      products.length > state.visibleCount ? "block" : "none";
  }
}

// renders category cards
export function renderCategories(products) {
  const grid = document.querySelector("#categoriesGrid");
  const categories = [...new Set(products.map((p) => p.category))];
  let html = "";
  categories.forEach((cat) => {
    html += `
      <div class="category-card" data-category="${cat}">
        <span class="category-card__name">${cat}</span>
      </div>
    `;
  });
  grid.innerHTML = html;
}

// shows loading or error message to user
export function showMessage(msg) {
  messageContainer.style.display = "block";
  messageContainer.textContent = msg;
}

// hides message container when data is ready
export function hideMessage() {
  messageContainer.style.display = "none";
  messageContainer.textContent = "";
}

// reads unique categories from products and builds dropdown options
export function addCategoryOptions(products) {
  const categorySelect = document.querySelector("#category-dropdown");

  if (!categorySelect) return;

  // rest of code...
  categorySelect.innerHTML = "";

  // Set automatically removes duplicate categories
  const categories = new Set(products.map((pro) => pro.category));

  // add "All Categories" as first default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "All Categories";
  categorySelect.append(defaultOption);

  // add one option for each unique category
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.append(option);
  });
}

// renders cart items in drawer and updates total

export function renderCartItems() {
  const cartItems = document.querySelector("#cartItems");
  const cartTotal = document.querySelector("#cartTotal");
  const cartEmpty = document.querySelector("#cartEmpty");

  if (state.cart.length === 0) {
    cartEmpty.style.display = "block";
    cartItems.innerHTML = "";
    cartTotal.textContent = "$0.00";
    return;
  }

  cartEmpty.style.display = "none";

  let html = "";
  state.cart.forEach((item) => {
    html += `
      <div class="cart-item">
        <img src="${item.thumbnail}" alt="${item.title}" class="cart-item__img">
        <div class="cart-item__info">
          <p class="cart-item__title">${item.title}</p>
          <p class="cart-item__price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item__controls">
          <button class="qty-btn" data-id="${item.id}" data-type="decrease">−</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn" data-id="${item.id}" data-type="increase">+</button>
          <button class="remove-btn" data-id="${item.id}">
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </div>
    `;
  });

  cartItems.innerHTML = html;

  // calculate total
  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  cartTotal.textContent = `$${total.toFixed(2)}`;
}
