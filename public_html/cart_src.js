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
        res.json()
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
    var title = document.getElemenyById("cart_title")

    if (username) {
        title.innerText = username + "'s Cart"
    } else {
        title.innerText = "Guest Cart"
    }
}
// function showCart(cart)