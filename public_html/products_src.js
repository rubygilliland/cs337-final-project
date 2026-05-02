fetch("/getProducts")
.then(function(res) {
    return res.json()
})
.then(function(products) {
    var grid = document.getElementById("product_grid")

    // clear "Loading..." message
    grid.innerHTML = "" 

    if (products.length === 0) {
        grid.innerHTML = "<p id='message'>No products found.</p>"
        return
    }

    for (var i = 0; i < products.length; i++) {
        var product = products[i]
        var card = document.createElement("div")
        card.className = "product_card"

        // use image if it exists, otherwise show a placeholder
        var imgHTML = product.image
            ? `<img src="${product.image}" alt="${product.name}">`
            : `<div class="img_placeholder">No Image</div>`

        card.innerHTML = `
            ${imgHTML}
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
        `

        // clicking a card goes to the detail page with the product id in the URL
        var productId = product._id
        card.addEventListener("click", function(id) {
            return function() {
                window.location.href = "/product?id=" + id
            }
        }(productId))

        grid.appendChild(card)
    }
})
.catch(function(err) {
    console.log(err)
    document.getElementById("message").innerText = "Failed to load products."
})