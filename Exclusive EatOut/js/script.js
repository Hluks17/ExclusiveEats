// GET CART FROM STORAGE
function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// SAVE CART
function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}


// ADD TO CART
function addToCart(name, price){

    let cart = getCart();

    cart.push({
        name: name,
        price: price
    });

    saveCart(cart);

    updateCartCount();

    alert(name + " added to cart!");
}



// UPDATE CART NUMBER IN NAVBAR
function updateCartCount(){

    let cart = getCart();

    let cartCount = document.getElementById("cart-count");

    if(cartCount){
        cartCount.innerText = cart.length;
    }

}



// DISPLAY CART ITEMS
function displayCart(){

    let cart = getCart();

    let cartItems = document.getElementById("cartItems");

    let total = 0;

    if(!cartItems) return;

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        let totalElement = document.getElementById("cartTotal");

        if(totalElement){
            totalElement.innerText = "Total: R0";
        }

        return;
    }

    cart.forEach((item,index)=>{

        total += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

        <span>${item.name} - R${item.price}</span>

        <button onclick="removeItem(${index})">Remove</button>

        </div>

        `;

    });

    let totalElement = document.getElementById("cartTotal");

    if(totalElement){
        totalElement.innerText = "Total: R" + total;
    }

}



// REMOVE ITEM
function removeItem(index){

    let cart = getCart();

    cart.splice(index,1);

    saveCart(cart);

    displayCart();

    updateCartCount();

}



// CLEAR CART
function clearCart(){

    localStorage.removeItem("cart");

    displayCart();

    updateCartCount();

}



// CHECKOUT
function checkout(){

    let cart = getCart();

    if(cart.length === 0){

        alert("Your cart is empty!");

        return;
    }

    alert("Thank you for your order! 🎉");

    localStorage.removeItem("cart");

    displayCart();

    updateCartCount();

}



// RUN WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", function(){

    updateCartCount();

    displayCart();

});
