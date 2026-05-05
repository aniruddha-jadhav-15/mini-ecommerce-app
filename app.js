// build HTML string first to avoid multiple DOM updates
const productContainer = document.querySelector(".products-container");
const messageContainer = document.querySelector(".message-container");
const inptEl = document.querySelector(".inpt-box");
const serchBtn = document.querySelector(".btn");
const API_URL = "https://dummyjson.com/products?limit=200";

serchBtn.addEventListener("click", search);

let allProducts;
// Fetch products from API and manage loading/error states
async function getProducts() {
  try {
    showMessage("Loading...");
    const response = await fetch(API_URL);
    allProducts = await response.json();
    hideMessage();
    renderProducts(allProducts.products);
  } catch (error) {
    productContainer.innerHTML = "";
    showMessage("Something went wrong..");
  }
}

getProducts();

// Render product cards dynamically on UI
function renderProducts(products) {
  let html = "";
  products.forEach((pro) => {
    html += `
   <div class="card">
      <h2 class="title">${pro.title}</h2>
      <p class="price">${pro.price}</p>

      <div class="image-container">
        <img src="${pro.thumbnail}" alt="">
      </div>
    </div>
    `;
  });
  productContainer.innerHTML = html;
}

// Show message (loading or error)
function showMessage(msg) {
  messageContainer.style.display = "block";
  messageContainer.textContent = msg;
}

// Hide message container
function hideMessage(msg) {
  messageContainer.textContent = msg;
}

// Filter products based on user search input and update UI
function search() {
  let filtered = allProducts.products;
  const value = inptEl.value;

  // If input is empty, show all products again
  if (value.trim() === "") {
    renderProducts(allProducts.products);
    hideMessage();
    return;
  } else {
    // Filter products by title match (case-insensitive)
    filtered = filtered.filter((pro) =>
      pro.title
        ?.toLowerCase()
        .trim()
        .includes(value?.toLowerCase().trim() || ""),
    );

    // If no products match, show message
    if (filtered.length === 0) {
      productContainer.innerHTML = "";
      showMessage("product not found...");
    } else {
      renderProducts(filtered);
      hideMessage();
    }
  }
}
