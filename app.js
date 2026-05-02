const productContainer = document.querySelector(".products-container");
const API_URL = "https://dummyjson.com/products?limit=200";

let allProducts;
async function getProducts() {
  const respones = await fetch(API_URL);
  allProducts = await respones.json();

  reanderProducts(allProducts.products);
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

    productContainer.innerHTML = html;
  });
}
