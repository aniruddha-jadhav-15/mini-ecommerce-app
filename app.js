const productContainer = document.querySelector(".products-container");
const messageContainer = document.querySelector(".message-container");
const API_URL = "https://dummyjson.com/products?limit=200";

let allProducts;
async function getProducts() {
  try {
    showMessage("Loading...");
    const respones = await fetch(API_URL);
    allProducts = await respones.json();
    hideMessage();
    reanderProducts(allProducts.products);
  } catch (error) {
    productContainer.innerHTML = "";
    showMessage("Something went wrong..");
  }
}

getProducts();

function reanderProducts(products) {
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

function showMessage(msg) {
  messageContainer.textContent = msg;
}

function hideMessage(msg) {
  messageContainer.style.display = "block";
  messageContainer.textContent = msg;
}
