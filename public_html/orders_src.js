var username = window.localStorage.getItem("username")

if (username == null) {
    window.location.href = "/login"
}

document.getElementById("orders_title").innerText = username + "'s Order History"

fetch("/getOrders", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username: username})
})
.then(function(res) {
    return res.json()
})
.then(function(orders) {
    var ordersList = document.getElementById("orders_list")

    if (orders == null || orders.length == 0) {
        ordersList.innerHTML = "<p>No orders yet.</p>"
        return
    }

    for (var i = orders.length - 1 ; i >= 0; i--) {
        var order = orders[i]
        var orderDiv = document.createElement("div")
        orderDiv.className = "order"

        var total = 0
        var itemsHTML = ""

        for (var j = 0; j < order.length; j++) {
            var product = order[j]
            total += product.price
            itemsHTML += `
                    <div class="order_item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="order_item_info">
                        <p>${product.name}</p>
                        <p>$${product.price.toFixed(2)}</p>
                        <p>${product.size}</p>
                    </div>
                </div>
                `
        }
        orderDiv.innerHTML = `<h3>Order no. ${i + 1}</h3>
                                ${itemsHTML}
                                <p class ="order_total">Total: $${total.toFixed(2)}</p><br>`
        ordersList.appendChild(orderDiv)
    }
})
.catch(function(err) {
    console.log(err)
})