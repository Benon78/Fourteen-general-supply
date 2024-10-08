import { computers } from "./assets/data.js";  

const cartContainerHTML = document.getElementById("cart-container"); 
const cartCount = document.getElementById("cart-count"); 

let tax = 0.15;   
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];  
let computerId;  


window.onload = () => {  
    const params = new URLSearchParams(window.location.search);  
    const productId = params.get('productId');  
    if(params.size === 0){  
        createCartHTML();  
        return;  
    }   
    computerId = productId.slice(-2).replace(/[-]/g, 0);   
    getProductToCart(computerId);  
}  

const getProductToCart = (productId) => {  
    const product = computers.find(product => product.id === parseInt(productId));  
    if(product) {  
        addToCart(product);  
    } else {  
        alert('Product not found');  
    }  
}  


   


const addToCart = (product) => {  
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);  
    if (existingProductIndex !== -1) {  
        // Product already exists, increase the quantity  
        cartItems[existingProductIndex].quantity += 1; // Increase quantity  
        cartItems[existingProductIndex].newPrice = cartItems[existingProductIndex].quantity * product.newPrice; // Update newPrice based on quantity  
    } else {  
        // Product does not exist, add it to the cart with quantity 1  
        product.quantity = 1; // Initialize quantity  
        product.newPrice = product.newPrice; // Initialize newPrice  
        cartItems.push(product);  
    }  

    
    // Update local storage  
    localStorage.setItem('cart', JSON.stringify(cartItems));  
    
   
    // Recreate cart HTML to reflect updated items  
    createCartHTML();  
    // Update the cart count display  
};  

const returnTableRow = (table, cartItems) => {  
    cartItems.forEach(({ id, name, newPrice, image, quantity }) => {  
        const row = document.createElement('tr');   
        row.className = 'product-row';  
        row.innerHTML = `  
            <td>  
                <div class="cart-info">  
                    <img src="${image}" alt="${name}">  
                    <div>  
                        <p>${name}</p>  
                        <br>  
                        <button class="btn remove-btn" id="${id}">Remove</button>  
                    </div>  
                </div>  
            </td>  
            <td><input type="number" class="input" id="${id}" value="${quantity}" min="1"></td>  
            <td class="item-subtotal">${newPrice.toFixed(2)} TZS</td>  
        `;  
        table.appendChild(row);  
    });  
};  

// Attach event listener to update subtotal when quantity changes  
const updateQuantity = (e) => {  
    const quantity = parseInt(e.target.value);  
    const productId = e.target.id;  
    const productIndex = cartItems.findIndex(item => item.id === parseInt(productId));  

    if (productIndex !== -1 && quantity > 0) {  
        // Update the quantity and recalculate newPrice  
        cartItems[productIndex].quantity = quantity;  
        cartItems[productIndex].newPrice = cartItems[productIndex].quantity * computers.find(product => product.id === cartItems[productIndex].id).newPrice;  

        // Update local storage  
        localStorage.setItem('cart', JSON.stringify(cartItems));  

        // Recreate cart HTML to reflect updated items  
        createCartHTML();  
    }  
};  

const calculateTotals = () => {  
    const subtotal = cartItems.reduce((acc, item) => acc + item.newPrice, 0);  
    const subTotalWithTax = subtotal * tax;  
    const total = subtotal + subTotalWithTax; // Calculate total with tax  
    return { subtotal, total, subTotalWithTax };  
};   

const createCartHTML = () => {  
    cartContainerHTML.innerHTML = ''; // Clear previous content  
    const cartContainer = document.createElement('div');  
    cartContainer.className = "small-container cart-page";  
    
    const table = document.createElement('table');  
    table.innerHTML = `  
        <tr>  
            <th>Product</th>  
            <th>Quantity</th>  
            <th>Subtotal</th>  
        </tr>  
    `;  

    returnTableRow(table, cartItems);  
    cartContainer.appendChild(table);  
    
    const { subtotal, total, subTotalWithTax } = calculateTotals(); // Calculate totals  

    const totalPriceDiv = document.createElement('div');  
    totalPriceDiv.className = "total-price";  
    
    const totalTable = document.createElement('table');  
    totalTable.innerHTML = `  
        <tr>  
            <td>Subtotal</td>  
            <td>${subtotal.toFixed(2)} TZS</td>  
        </tr>  
        <tr>  
            <td>Tax</td>  
            <td>${subTotalWithTax.toFixed(2)} TZS</td>  
        </tr>  
        <tr>  
            <td>Total</td>  
            <td>${total.toFixed(2)} TZS</td>  
        </tr>  
    `;  
    
    totalPriceDiv.appendChild(totalTable);  
    cartContainer.appendChild(totalPriceDiv);  

    // Append the cartContainer to the cartContainerHTML  
    cartContainerHTML.appendChild(cartContainer);   
    
    // Check if cart is empty  
    if (cartItems.length === 0) {  
        showEmptyCartMessage();  
    }  

    // Attach event listener to update subtotal when quantity changes  
    const quantityInputs = document.querySelectorAll('.input');  
    quantityInputs.forEach(input => {  
        input.addEventListener('change', updateQuantity);  
    });  
}    

const removeFromCart = (productId) => {  
    const index = cartItems.findIndex(item => item.id === parseInt(productId));  
    if (index !== -1) {  
        cartItems.splice(index, 1); // Remove the item from the cart  
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Update local storage  
        createCartHTML(); // Regenerate the cart display  
    }  
}  

const showEmptyCartMessage = () => {  
    const emptyCartMessage = document.createElement('div');  
    emptyCartMessage.className = "empty";  
    emptyCartMessage.innerHTML = `          
        <p>Your cart is empty. Please add some products.</p>  
        <a href="products.html" class="btn">Go to Shop</a>`;  
    cartContainerHTML.appendChild(emptyCartMessage);   
}  


document.addEventListener("click", (event) =>{
    
    if(event.target.id === "login-btn"){
        window.location.href = 'login.html';
    }
    if (event.target.classList.contains("remove-btn")) {  
        const productId = event.target.id; // Get product ID from button  
        removeFromCart(productId); // Call remove function  
    }  

});

// get the year for the copyright
const currentYear = new Date().getFullYear();
document.getElementById("copyright-span").textContent = `${currentYear}`;




//     function handleRouteChange() {  
//         const page = window.location.pathname; // Get the current page from the URL  
    
//         // Load content based on page  
//         if (page === '/products.html') {  
//             cartFunction(); // Load products and handle their events  
//         } else if (page === '/index.html') {  
//             cartFunction(); // Load cart content  
//         }  else if (page === '/product-details.html') {  
//             cartFunction(); // Load cart content  
//         }  
//     }  
    
//     // Initialize routing  
//     document.addEventListener('DOMContentLoaded', () => {  
//         handleRouteChange(); // Call this on initial load  
//     });  
    
//     // Listen to history changes (for cases where URL changes without refreshing)  
//     window.addEventListener('popstate', handleRouteChange);


