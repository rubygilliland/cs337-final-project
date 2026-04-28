var express = require("express")
var app = express()
var path = require("path")
var crypto = require("crypto")
var mongo = require("./mongo.js")

var public_html = path.join(__dirname, "public_html") 
app.use(express.static(public_html))

function checkLogin(username, password, res){
    var hashedPass = crypto.createHash("sha256").update(password).digest("hex")

    mongo.getUser(username)
    .then(function(user) {
        if (user == null) {
            res.json({success: false, message: "User not found"})
        } else if (user.password == hashedPass) {
            res.json({success: true, username: username})
        } else {
            res.json({success: false, message: "Incorrect password"})
        }
    })
    .catch(function(err) {
        res.json({success: false, message: "Error"})
    })
}

app.get("/home", function(req, res){
    res.sendFile(path.join(public_html, "home.html"))
})

app.get("/products", function(req, res){
    res.sendFile(path.join(public_html, "products.html"))
})

app.get("/cart", function(req, res) {
    res.sendFile(path.join(public_html, "cart.html"))
})

app.get("/login", function(req, res) {
    res.sendFile(path.join(public_html, "login.html"));
});

app.post("/getCart", express.json(), function(req, res) {
    var user

    if (req.body.username) {
        user = req.body.username
    } else {
        user = "Guest"
    }

    mongo.getCart(user)
    .then(function(cart) {
        res.json(cart)
    })
})

app.post("/saveOrder", express.json(), function(req, res) {
    mongo.addOrder(req.body.username, req.body.items)
    .then(function() {
        res.json({success: true})
    })
    .catch(function(err) {
        res.json({success: false})
    })
})

app.post("/clearCart", express.json(), function(req, res) {
    mongo.clearCart(req.body.username)
    .then(function() {
        res.json({success: true})
    })
    .catch(function(err) {
        res.json({success: false})
    })
})
app.post("/login", express.json(), function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    checkLogin(username, password, res);
});

app.post("/register", express.json(), function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var hashedPass = crypto.createHash("sha256").update(password).digest("hex")
    mongo.getUser(username)
    .then(function(existingUser) {
        if (existingUser != null) {
            res.json({success: false, message: "Username already exists"})
        } else {
            return mongo.addUser(username, hashedPass)
            .then(function() {
                res.json({success: true, message: "Account created!"})
            })
        }
    })
    .catch(function(err) {
        res.json({success: false, message: "Error"})
    })
})

// serve the product detail page
app.get("/product", function(req, res) {
    res.sendFile(path.join(public_html, "product.html"))
})
 
// returns all products as JSON
app.get("/getProducts", function(req, res) {
    mongo.getProducts()
    .then(function(products) {
        res.json(products)
    })
    .catch(function(err) {
        res.json({ error: "Failed to get products" })
    })
})
 
// returns a single product by id from the query string (?id=...)
app.get("/getProduct", function(req, res) {
    var id = req.query.id
    if (!id) {
        res.json({ error: "No id provided" })
        return
    }
    mongo.getProduct(id)
    .then(function(product) {
        if (!product) {
            res.json({ error: "Product not found" })
        } else {
            res.json(product)
        }
    })
    .catch(function(err) {
        res.json({ error: "Failed to get product" })
    })
})
 
// adds an item to the cart
app.post("/addToCart", express.json(), function(req, res) {
    var user = req.body.username || "Guest"
    var productId = req.body.productId
    var size = req.body.size
 
    // first look up the full product so we can store its details in the cart
    mongo.getProduct(productId)
    .then(function(product) {
        if (!product) {
            res.json({ success: false, message: "Product not found" })
            return
        }
        var item = {
            name: product.name,
            price: product.price,
            image: product.image,
            size: size
        }
        return mongo.addToCart(user, item)
        .then(function() {
            res.json({ success: true })
        })
    })
    .catch(function(err) {
        res.json({ success: false })
    })
})


app.listen(8080, function() {
    console.log("Server started ...")
})
