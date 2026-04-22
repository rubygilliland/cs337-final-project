var express = require("express")
var app = express()
var path = require("path")

var public_html = path.join(__dirname, "public_html") 

function checkLogin(username, password){
    for(var i=0;i<userList.length;i++){
        var user = userList[i]
        var hashedPass = crypto.createHash("sha256").update(password).digest("hex")
        if(user.username==username && user.password==hashedPass){
            return true
        }
    }
    return false
}

app.get("/home", function(req, res){
    res.sendFile(path.join(__dirname, "home.html"))
})

app.get("/products", function(req, res){
    res.sendFile(path.join(__dirname, "products.html"))
})

app.get("/cart", function(req, res) {
    res.sendFile(path.join(__dirname, "cart.html"))
})

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