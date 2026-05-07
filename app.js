// build HTML string first to avoid multiple DOM updates
const productContainer = document.querySelector(".products-container");
const messageContainer = document.querySelector(".message-container");
const inptEl = document.querySelector(".inpt-box");
const searchBtn = document.querySelector(".btn");
const select = document.querySelector("#sort-option");
const categorySelect = document.querySelector("#category-dropdown");
const API_URL = "https://dummyjson.com/products?limit=10";

searchBtn.addEventListener("click", search);
select.addEventListener("change", sort);

// Store original API data and currently displayed products
let allProducts;
let currentProducts;

// Fetch products from API and manage loading/error states
async function getProducts() {
  try {
    showMessage("Loading...");
    const response = await fetch(API_URL);
    allProducts = await response.json();
    currentProducts = allProducts.products;
    addCategoryOptions();
    hideMessage();
    renderProducts(allProducts.products);
  } catch (error) {
    productContainer.innerHTML = "";
    showMessage("Something went wrong..");
  }

  console.log(currentProducts);
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
function hideMessage() {
  messageContainer.style.display = "none";
}

// Filter products based on user search input and update UI
function search() {
  let filtered = allProducts.products;
  const value = inptEl.value;
  const searchValue = value.toLowerCase().trim();

  // If input is empty, show all products again
  if (value.trim() === "") {
    currentProducts = allProducts.products;
    renderProducts(currentProducts);
    hideMessage();
    return;
  } else {
    // Filter products by title match (case-insensitive)
    filtered = filtered.filter((pro) =>
      pro.title.toLowerCase().trim().includes(searchValue),
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

  currentProducts = filtered;
}

// Handle product sorting based on selected option
function sort(evt) {
  const selectedValue = evt.target.value;
  let sorted = [...currentProducts];

  if (selectedValue === "default") {
    sorted = [...allProducts.products];
  } else if (selectedValue === "low-high") {
    sorted = sorted.sort((a, b) => a.price - b.price);
  } else if (selectedValue === "high-low") {
    sorted = sorted.sort((a, b) => b.price - a.price);
  }

  currentProducts = sorted;
  renderProducts(currentProducts);
}

// Generate unique category options dynamically from API data
function addCategoryOptions() {
  categorySelect.innerHTML = "";
  const products = allProducts.products;
  const categories = new Set(products.map((pro) => pro.category));

  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "All Categories";
  categorySelect.append(defaultOption);

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.append(option);
  });
}

// Filter products based on selected category
categorySelect.addEventListener("change", categoryFilter);

function categoryFilter(evt) {
  let selectedCategory = evt.target.value.toLowerCase();
  const products = allProducts.products;
  if (selectedCategory === "all") {
    currentProducts = products;
    renderProducts(currentProducts);
    return;
  } else {
    currentProducts = products.filter(
      (pro) => pro.category.toLowerCase() === selectedCategory,
    );
  }

  renderProducts(currentProducts);
}


