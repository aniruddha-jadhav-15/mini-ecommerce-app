// state.js — single source of truth for all app data

export const state = {
  allProducts: [],
  currentProducts: [],
  cart: [],
  filters: {
    search: "",
    category: "all",
    sort: "default",
  },
};
