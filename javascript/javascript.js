
window.addEventListener("load", function() {
    document.getElementById("loader").style.display = "none";
});


document.getElementById("menuBtn").addEventListener("click", function() {
    let menu = document.getElementById("navMenu");
    menu.classList.toggle("active");
});

//-----------------------------------------------//

let selectedProducts = {};
let totalPrice = 0;
let totalItems = 0;

document.querySelectorAll(".card-buttom").forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();

        let productName = this.getAttribute("data-name");
        let productPrice = parseFloat(this.getAttribute("data-price"));

       
        if (selectedProducts[productName]) {
            selectedProducts[productName].quantity += 1;
        } else {
            selectedProducts[productName] = { price: productPrice, quantity: 1 };
        }

        totalPrice += productPrice;
        totalItems += 1;

       
        document.getElementById("cart-count").textContent = totalItems;

        
        let cartItemsContainer = document.getElementById("cart-items");
        cartItemsContainer.innerHTML = "";

        for (let product in selectedProducts) {
            let listItem = document.createElement("li");
            listItem.textContent = `${product} x${selectedProducts[product].quantity} - $${selectedProducts[product].price * selectedProducts[product].quantity}`;
            cartItemsContainer.appendChild(listItem);
        }


        document.getElementById("cart-total").textContent = `$${totalPrice}`;
    });
});


//---------------------------------------------------------//

document.querySelectorAll(".card-buttom").forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();

        let productName = this.getAttribute("data-name");
        let productPrice = parseFloat(this.getAttribute("data-price"));
        let quantityInput = this.previousElementSibling; // Captura el input de cantidad
        let quantity = parseInt(quantityInput.value) || 0; // Si el valor es inválido, toma 1

        // Si el producto ya está en el carrito, solo aumenta la cantidad
        if (selectedProducts[productName]) {
            selectedProducts[productName].quantity += quantity;
        } else {
            selectedProducts[productName] = { price: productPrice, quantity: quantity };
        }

        totalPrice += productPrice * quantity;
        totalItems += quantity;

        document.getElementById("cart-count").textContent = totalItems;

        updateCart();
    });
});

function updateCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; 

    Object.keys(selectedProducts).forEach(product => {
        let listItem = document.createElement("li");
        listItem.textContent = `${product} x${selectedProducts[product].quantity} - $${selectedProducts[product].price * selectedProducts[product].quantity}`;
        cartItemsContainer.appendChild(listItem);
    });

    document.getElementById("cart-total").textContent = `$${totalPrice}`;
}


//--------------------------------------------------------//



document.getElementById("car").addEventListener("click", function(event) {
    event.preventDefault();
    let cart = document.getElementById("cart-summary");
    cart.classList.toggle("active"); 
});


document.getElementById("sendWhatsApp").addEventListener("click", function() {
    let message = `Hola Doña Beatriz, quiero hacer un pedido:\n\nProductos:\n${Object.keys(selectedProducts).map(product => `${product} x${selectedProducts[product].quantity} - $${selectedProducts[product].price * selectedProducts[product].quantity}`).join("\n")}\n\nTotal: $${totalPrice}`;
    let phoneNumber = "4361001332";
    let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
});


//-----------------------------------------------------------//


document.querySelectorAll('.nav-text a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

