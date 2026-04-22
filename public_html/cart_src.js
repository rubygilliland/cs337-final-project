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

function setCartTitle() {
    var username = window.localStorage.getItem("username")
    var title = document.getElementById("cart_title")

    if (username) {
        title.innerText = username + "'s Cart"
    } else {
        title.innerText = "Guest Cart"
    }
}

function showCart(cart) {
    var items = cart.items
    var cartItems = document.getElementById("cart_items")
    var cartTotal = document.getElementById("cart_total")

    var total = 0

    for (var i = 0; i < items.length; i++) {
        product = items[i]
        total += product.price
        cartItems.innerHTML += `<img src=${product.image}>
                                <p>${product.name}</p>
                                <p>${product.size}</p>
                                <p>${product.price}</p>`
    }

    cartTotal.innerText = parseInt(total)
}

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
        if (username != null) {
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
    .then(function() {
        document.getElementById("message").innerText = "Order placed successfully!"
    })
    .catch(function(err) {
        console.log(err)
    })
}