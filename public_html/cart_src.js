// gets and returns all items in users cart
function loadCart() {
    var username = window.localStorage.getItem("username")

    var body = {}
    if (username != null) {
        body.username = username
    }

    fetch("/getCart", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    .then(function (res) {
        return res.json()
    })
    .then(function(cart) {
        showCart(cart)
    })
    .catch(function(err) {
        console.log(err)
    })
}

// if user logged in, display "[username]'s Cart", otherwise display "Guest Cart"
function setCartTitle() {
    var username = window.localStorage.getItem("username")
    var title = document.getElementById("cart_title")

    if (username) {
        title.innerText = username + "'s Cart"
    } else {
        title.innerText = "Guest Cart"
    }
}

// display all product info of each cart item in html on /cart page
function showCart(cart) {
    var items = cart.items
    var cartItems = document.getElementById("cart_items")
    var cartTotal = document.getElementById("cart_total")

    cartItems.innerHTML = ""
    var total = 0

    if (items == null || items.length == 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>"
        cartTotal.innerText = "0.00"
        return
    }

    for (var i = 0; i < items.length; i++) {
        product = items[i]
        total += product.price
        cartItems.innerHTML += `<img src=${product.image}>
                                <p>${product.name}</p>
                                <p>${product.size}</p>
                                <p>$${product.price}</p>`
    }

    cartTotal.innerText = total.toFixed(2)

}

// clears the cart page html and clears current cart, 
// stores order in users order history if logged in
function checkout() {
    var username = window.localStorage.getItem("username")

    var body = {}
    if (username != null) {
        body.username = username
    }

    fetch("/getCart", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    .then(function (res) {
        return res.json()
    })
    .then(function(cart) {

        // if cart is empty, display message and do nothing
        if (cart.items == null || cart.items.length == 0) {
            document.getElementById("message").innerText = "Your cart is empty!"
            return
        }

        // only save order if user is logged in and cart is not empty
        if (username != null && cart.items != []) {
            return fetch("/saveOrder", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: username, items: cart.items})
            })
            .then(function(res) {
                return res.json()
            })
            .then(function() {
                return fetch("/clearCart", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({username: username})
                })
            })
        } else {
            return fetch("/clearCart", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: "Guest"})
            })
        }
    })

    // notify the user/guest that the order was placed
    .then(function() {
        loadCart()
        document.getElementById("message").innerText = "Order placed successfully!"
    })
    .catch(function(err) {
        console.log(err)
    })
}