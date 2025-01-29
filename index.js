/** @format */

import { computers } from "./assets/data.js";

// this section query all the UI elements

const featuredProductsDiv = document.getElementById("featured-products");
const bestSellers = document.getElementById("best-sellers");

// functions for rendering
const renderFeaturedProducts = (computers) => {
  let featuredProductsHTML = computers
    .slice(0, 6)
    .map(({ id, image, name, oldPrice, newPrice }) => {
      return `
        <div class="product-card" >
                   <a href="product-details.html?productId=product-card-${id}"><img id="product-card-${id}" src="${image}" alt="${name}"></a>
                    <h3>${name}</h3>
                    <p id="old-price">${oldPrice}TZS</p>
                    <p id="new-price">${newPrice}TZS</p>
                    <a href="add-to-cart.html?productId=product-card-${id}"><button class="btn add-to-cart" id="${id}" data-product-id="${id}">Add to Cart</button></a>
        </div>
    `;
    })
    .join("");

  featuredProductsDiv.innerHTML = featuredProductsHTML;
};
renderFeaturedProducts(computers);
// render best sellers products
const renderBestSellerproducts = (computers) => {
  let bestSellerproduct = computers.filter(
    (computer) =>
      computer.category === "New Laptops" || computer.category === "Accessory"
  );

  let bestSellerproductHTML = bestSellerproduct
    .slice(0, 3)
    .map(({ id, image, name, oldPrice, newPrice }) => {
      return `
            <div class="product-card" >
                        <a href="product-details.html?productId=product-card-${id}"><img id="product-card-${id}" src="${image}" alt="${name}"></a>
                        <h3>${name}</h3>
                        <p id="old-price">${oldPrice}TZS</p>
                        <p id="new-price">${newPrice}TZS</p>
                        <a href="add-to-cart.html?productId=product-card-${id}"><button class="btn add-to-cart" id="${id}" data-product-id="${id}">Add to Cart</button></a>
            </div>
        `;
    })
    .join("");

  bestSellers.innerHTML = bestSellerproductHTML;
};

renderBestSellerproducts(computers);

// all click event listeners

document.addEventListener("click", (event) => {
  if (event.target.id === "login-btn") {
    window.location.href = "login.html";
    console.log("event.target.id");
  }
});

// get the year for the copyright
const currentYear = new Date().getFullYear();
document.getElementById("copyright-span").textContent = `${currentYear}`;
