// ui.js — only responsible for DOM updates

// grab product and message containers once at the top — reuse everywhere
const productContainer = document.querySelector(".products-container");
const messageContainer = document.querySelector(".message-container");

// builds product cards from array and displays them on screen
export function renderProducts(products) {
  let html = "";

  // loop through each product and create a card html string
  products.forEach((pro) => {
    html += `
      <div class="card">
        <h2 class="title">${pro.title}</h2>
        <p class="price">$${pro.price}</p>
        <div class="image-container">
          <img src="${pro.thumbnail}" alt="${pro.title}">
        </div>
        <button class="add-to-cart-btn" data-id="${pro.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  // inject all cards into DOM in one update — better performance
  productContainer.innerHTML = html;
}

// shows loading or error message to user
export function showMessage(msg) {
  messageContainer.style.display = "block";
  messageContainer.textContent = msg;
}

// hides message container when data is ready
export function hideMessage() {
  messageContainer.style.display = "none";
}

// reads unique categories from products and builds dropdown options
export function addCategoryOptions(products) {
  const categorySelect = document.querySelector("#category-dropdown");
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
