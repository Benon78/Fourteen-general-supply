import { computers } from "./assets/data.js";  

// Query all the UI elements  
const selectOptions = document.querySelector("#select-options");  
export const productsItemsDiv = document.querySelector("#products-items");  
const loadMoreButton = document.getElementById("load-more-products");  
const copyrightSpan = document.getElementById("copyright-span");  

// Render products on initial load  
let start = 0;  
let end = 18;  

 const  renderProducts = (computers, start, end) => {  
    const productHTML = computers.slice(start, end).map(createProductCard).join("");  
    productsItemsDiv.innerHTML += productHTML;  
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



// Filter and sort computers based on selection  
const updateProductDisplay = (selection) => {  
    let filteredComputers = [...computers]; // Create a copy of the original computer list  

    switch (selection) {  
        case "sort-by-price-high-to-low":  
            filteredComputers.sort((a, b) => b.newPrice - a.newPrice);
            productsItemsDiv.innerHTML = "";
            renderProducts(filteredComputers, start, filteredComputers.length)
            loadMoreButton.style.display = "none";  // Sort by price descending  
            break;  
        case "sort-by-popularity":  
            filteredComputers.sort((a, b) => b.popularity - a.popularity);
            renderProducts(filteredComputers, start, filteredComputers.length)
            loadMoreButton.style.display = "none";   // Assume a 'popularity' property exists  
            break;  
        case "sort-by-latest":  
            filteredComputers.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            renderProducts(filteredComputers, start, filteredComputers.length) 
            loadMoreButton.style.display = "none"; // Assume a 'releaseDate' property exists  
            break;  
        case "all-products":  
        default:  
            // No sorting/filtering needed  
            renderProducts(filteredComputers , start, end);  
            break;  
    }  
};  
renderProducts(computers, start, end);  
// Filter products by type  
const filterComputers = (type) => {  
    productsItemsDiv.innerHTML = ""; // Clear previous content  

    const filteredComputers = computers.filter(computer => computer.type === type);  
    
    // Check if any computers were found  
    if (filteredComputers.length === 0) {  
        productsItemsDiv.innerHTML = `  
            <div class="page-error">  
                <h1>No products found</h1>  
                <p>Please select a product category to view products</p>  
                <a href="products.html" class="btn">View All</a>  
            </div>  
        `;  
        return; // Exit if no products found  
    }  

    const computerCardsHTML = filteredComputers.map(createProductCard).join("");  
    productsItemsDiv.innerHTML = computerCardsHTML; // Replace content with filtered products  
};  

// Helper function to handle category selection  
const handleCategoryClick = (event) => {  
    const categoryId = event.target.id;  
    if (["laptop", "tablets", "desktops", "mobile-phones", "storage", "printers"].includes(categoryId)) {  
        filterComputers(categoryId);  
        loadMoreButton.style.display = "none"; // Hide load more button on category selection  
    }  
};  


// Event listener for `select` change  
selectOptions.addEventListener("change", (event) => {  
    const selectedValue = event.target.value;  
    updateProductDisplay(selectedValue);  
});  

// Event listener for clicks  
document.addEventListener("click", (event) => {  
    if (event.target.id === "login-btn") {  
        window.location.href = 'login.html';  
    }  

    if (event.target.id === "load-more-products") {  
        start += 18;  
        end += 18;  
      renderProducts(computers, start, end);  

        // Disable load button if no more products to load  
        if (end >= computers.length) {  
            event.target.disabled = true;  
            event.target.textContent = "No more products to load";  
            event.target.style.cursor = "not-allowed";  
        }  
    }  

    handleCategoryClick(event); // Handle category clicks  
});  

// Set the current year for copyright  
const currentYear = new Date().getFullYear();  
copyrightSpan.textContent = `${currentYear}`;