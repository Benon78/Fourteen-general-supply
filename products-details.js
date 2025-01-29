/** @format */

import { computers } from "./assets/data.js";

const smallImagesContainer = document.getElementById("small-images-container");
const productDetails = document.getElementById("product-details");
const relatedProducts = document.getElementById("related-products");
const magnifier = document.getElementById("magnifier");
const ing = document.getElementById("large-image");

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");
  if (!productId) {
    alert(`Product with ID ${productId} not found`);
    document.getElementById(
      "products"
    ).innerHTML = `<img src="images/loading.gif">`;
    document.getElementById("products").style.alignContent = "center";
    document.getElementById("products").style.width = "50%";
    document.getElementById("products").style.margin = "0 auto";
    document.getElementById("releted").innerHTML = "";
    return; // Exit if the product is not found
  }
  getProduct(productId);
  getRelatedProducts(productId);
};

export const getProduct = (productId) => {
  let computerId = productId.slice(-2).replace(/[-]/g, 0);
  const product = computers.find(
    (computer) => computer.id === parseInt(computerId)
  );

  if (!product) {
    alert(`Product with ID ${computerId} not found`);
    return; // Exit if the product is not found
  }

  const { id, name, oldPrice, newPrice, description, image, subImages } =
    product;
  getSmallImages(subImages, name);
  getLargeImages(image, name);
  getProductDetails(name, description, oldPrice, newPrice, id);
};
export const getRelatedProducts = (productId) => {
  let computerId = productId.slice(-2).replace(/[-]/g, 0);
  const relatedProduct = computers.find(
    (computer) => computer.id === parseInt(computerId)
  );

  if (!relatedProduct) {
    alert(`Related Product with ID ${computerId} not found`);
    return; // Exit if the product is not found
  }

  const { category } = relatedProduct;

  let relatedComputers = computers.filter(
    (computer) => computer.category === category
  );
  renderProducts(relatedComputers, start, end);
};
const getLargeImages = (image, name) => {
  document.getElementById("large-image").src = image;
  document.getElementById("large-image").alt = name;
  magnifier.style.backgroundImage = `url(${image})`;
  // magnifier.style.backgroundImage.repeat = "no-repeat";
};
const getSmallImages = (subImages, name) => {
  subImages.forEach((image) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = name;
    img.className = "small-image";
    img.addEventListener("click", () => {
      getLargeImages(image, name);
    });
    smallImagesContainer.appendChild(img);
  });
};
const productDiscription = (description) => {
  if (typeof description !== "object" || description === null) {
    alert("Expected an object for description, but got:", description);
    return ""; // Return an empty string if this fails
  }

  let detailsHTML = "";
  Object.entries(description).forEach(([key, value]) => {
    detailsHTML += `<div class="details">  
                            <p>${key}: </p>  
                            <p>${value}</p>  
                        </div>`;
  });

  return detailsHTML;
};
const getProductDetails = (name, description, oldPrice, newPrice, id) => {
  // console.log('Product Description:', description); // Debugging line
  productDetails.innerHTML += `  
        <h2>${name}</h2>  
        ${productDiscription(description)}  
        <div class="price-container">  
            <p id="old-price">${oldPrice} TZS</p>  
            <p id="new-price">${newPrice} TZS</p>  
        </div>  
        <div class="cart-detail-container">  
            <a href="add-to-cart.html?productId=product-card-${id}"><button class="btn add-to-cart" id="${id}" data-product-id="${id}">Add to Cart</button></a> 
             
        </div>`;
};

// Render products on initial load
let start = 0;
let end = 6;

const renderProducts = (computers, start, end) => {
  const productHTML = computers
    .slice(start, end)
    .map(createProductCard)
    .join("");
  relatedProducts.innerHTML += productHTML;
};

// Helper function to create product card HTML
const createProductCard = ({ id, image, name, oldPrice, newPrice }) => `  
    <div class="product-card" >  
        <a href="product-details.html?productId=product-card-${id}"><img id="product-card-${id}" src="${image}" alt="${name}"></a>
        <h3>${name}</h3>  
        <p id="old-price">${oldPrice} TZS</p>  
        <p id="new-price">${newPrice} TZS</p>  
        <a href="add-to-cart.html?productId=product-card-${id}"><button class="btn add-to-cart" id="${id}" data-product-id="${id}">Add to Cart</button></a>  
    </div>  
`;

// Show magnifier on mouse move
ing.addEventListener("mousemove", (e) => {
  // Get the bounding box of the image container
  const rect = ing.getBoundingClientRect();

  // Calculate the position of the magnifier
  const x = e.clientX - rect.left; // position within the image
  const y = e.clientY - rect.top;

  // Set the position of the magnifier
  magnifier.style.left = x - magnifier.offsetWidth / 2 + "px";
  magnifier.style.top = y - magnifier.offsetHeight / 2 + "px";

  // Set the background position of the magnifier for zoom effect
  magnifier.style.backgroundPosition = `-${
    x * 2 - magnifier.offsetWidth / 2
  }px -${y * 2 - magnifier.offsetHeight / 2}px`;

  // Show the magnifier
  magnifier.style.display = "block";
});

// Hide magnifier when mouse leaves
ing.addEventListener("mouseleave", () => {
  magnifier.style.display = "none"; // Hide the magnifier
});
