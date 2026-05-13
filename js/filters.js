// filters.js — handles all filtering, searching and sorting logic

import { state } from "./state.js";
import { renderProducts, showMessage } from "./ui.js";

// applies all three filters together — category, search and sort
// runs fresh every time any filter changes
export function applyFilters() {
  // copy allProducts so we never destroy original data
  let filtered = [...state.allProducts];

  // step 1 — filter by category if user selected one
  if (state.filters.category !== "all") {
    filtered = filtered.filter(
      (pro) => pro.category.toLowerCase() === state.filters.category,
    );
  }

  // step 2 — filter by search word on top of category results
  if (state.filters.search !== "") {
    filtered = filtered.filter((pro) =>
      pro.title.toLowerCase().includes(state.filters.search),
    );
  }

  // step 3 — sort the filtered results by price
  if (state.filters.sort === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.filters.sort === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  // save final filtered results as current products
  state.currentProducts = filtered;

  // show message if no products match the filters
  if (filtered.length === 0) {
    renderProducts([]);
    showMessage("No products found...");
  } else {
    // hide message and render filtered products
    showMessage("");
    renderProducts(filtered);
  }
}

// sets up all event listeners for search, sort and category
// called once when app starts

export function setupFilters() {
  const searchBtn = document.querySelector("#searchBtn");
  const inptEl = document.querySelector(".inpt-box");
  const select = document.querySelector("#sort-option");
  const categorySelect = document.querySelector("#category-dropdown");

  // when search button clicked — update search filter and apply
  document.querySelector("#searchBtn").addEventListener("click", () => {
    const value = document.querySelector(".inpt-box").value;
    state.filters.search = value.toLowerCase().trim();
    applyFilters();
  });

  // when sort dropdown changes — update sort filter and apply
  document.querySelector("#sort-option").addEventListener("change", (e) => {
    state.filters.sort = e.target.value;
    applyFilters();
  });

  // when category dropdown changes — update category filter and apply
  document
    .querySelector("#category-dropdown")
    .addEventListener("change", (e) => {
      state.filters.category = e.target.value.toLowerCase();
      applyFilters();
    });
}
