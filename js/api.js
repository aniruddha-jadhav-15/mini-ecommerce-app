// Fetches all products from the API and returns them

const API_URL = "https://dummyjson.com/products?limit=100";

export async function fetchProducts() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.products;
}
