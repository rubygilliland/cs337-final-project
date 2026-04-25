var express = require("express")
var app = express()
var path = require("path")
var crypto = require("crypto")

var public_html = path.join(__dirname, "public_html") 
app.use(express.static(public_html))
function checkLogin(username, password, res){
    var hashedPass = crypto.createHash("sha256").update(password).digest("hex")

    getUser(username)
    .then(function(user) {
        if (user == null) {
            res.json({success: false, message: "User not found"})
        } else if (user.password == hashedPass) {
            res.json({success: true})
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
    res.sendFile(path.join(__dirname, "products.html"))
})

app.get("/cart", function(req, res) {
    res.sendFile(path.join(__dirname, "cart.html"))
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

    getCart(user)
    .then(function(cart) {
        res.json(cart)
    })
})

app.post("/saveOrder", express.json(), function(req, res) {
    addOrder(req.body.username, req.body.items)
    .then(function() {
        res.json({success: true})
    })
    .catch(function(err) {
        res.json({success: false})
    })
})

app.post("/clearCart", express.json(), function(req, res) {
    clearCart(req.body.username)
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
    res.json({ success: true, message: "Account created!" });
});