// app.js — entry point, connects all modules together

import { state } from "./state.js";
import { fetchProducts } from "./api.js";
import {
  renderProducts,
  showMessage,
  hideMessage,
  addCategoryOptions,
} from "./ui.js";
import { setupFilters } from "./filters.js";
import { setupCart } from "./cart.js";

// main function — runs when page loads and sets everything up
async function init(params) {
  try {
    // show loading message while waiting for API response
    showMessage("Loading...");

    // fetch products from API
    const products = await fetchProducts();

    // save products in state — allProducts never changes, currentProducts updates on filter
    state.allProducts = products;
    state.currentProducts = products;

    // build category dropdown from API data
    addCategoryOptions(products);

    // hide loading message once data is ready
    hideMessage();

    // display all products on screen
    renderProducts(products);

    // update hero with featured electronics product
    const featuredProduct = products.find(
      (p) => p.category === "laptops" || p.category === "smartphones",
    );
    if (featuredProduct) {
      document.querySelector(".hero__title").textContent =
        featuredProduct.title;
      document.querySelector(".hero__sub").textContent =
        featuredProduct.description.slice(0, 60) + "...";
      document.querySelector(".hero__image img").src =
        featuredProduct.thumbnail;
    }

    // attach search, sort, category event listeners
    setupFilters();

    // setup cart events — add to cart, open/close drawer, quantity controls
    setupCart();

    // setup load more button
    const loadMoreBtn = document.querySelector("#loadMoreBtn");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        state.visibleCount += 8;
        renderProducts(state.currentProducts);
      });
    }
  } catch (error) {
    // show friendly error if API fails
    showMessage("Something went wrong. Please try again.");
  }
}

// start the app
init();
