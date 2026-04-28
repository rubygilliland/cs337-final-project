// read the ?id= from the URL
var params = new URLSearchParams(window.location.search)
var productId = params.get("id")

if (!productId) {
    document.getElementById("product_detail").innerHTML = "<p>No product selected.</p>"
} else {
    fetch("/getProduct?id=" + productId)
    .then(function(res) {
        return res.json()
    })
    .then(function(product) {
        if (!product || product.error) {
            document.getElementById("product_detail").innerHTML = "<p>Product not found.</p>"
            return
        }
        showProduct(product)
    })
    .catch(function(err) {
        console.log(err)
        document.getElementById("product_detail").innerHTML = "<p>Failed to load product.</p>"
    })
}

function showProduct(product) {
    var detail = document.getElementById("product_detail")

    var imgHTML = product.image
        ? `<img src="${product.image}" alt="${product.name}">`
        : `<div class="img_placeholder">No Image</div>`

    // build size radio buttons
    var sizes = ["S", "M", "L", "XL"]
    var sizeInputs = sizes.map(function(size) {
        return `<label>
                    <input type="radio" name="size" value="${size}"> ${size}
                </label>`
    }).join("")

    detail.innerHTML = `
        ${imgHTML}
        <div id="product_info">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p id="product_price">$${product.price.toFixed(2)}</p>
            <p class="size_label">Size</p>
            <div class="size_options">
                ${sizeInputs}
            </div>
            <button id="add_to_cart" onclick="addToCart()">Add to Cart</button>
            <p id="message"></p>
        </div>
    `
}

function addToCart() {
    var selectedSize = document.querySelector("input[name='size']:checked")

    if (!selectedSize) {
        document.getElementById("message").innerText = "Please select a size."
        return
    }

    var username = window.localStorage.getItem("username")
    var body = { productId: productId, size: selectedSize.value }
    if (username) {
        body.username = username
    }

    fetch("/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(function(res) {
        return res.json()
    })
    .then(function(result) {
        if (result.success) {
            document.getElementById("message").innerText = "Added to cart!"
        } else {
            document.getElementById("message").innerText = "Failed to add to cart."
        }
    })
    .catch(function(err) {
        console.log(err)
        document.getElementById("message").innerText = "Error adding to cart."
    })
}