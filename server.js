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