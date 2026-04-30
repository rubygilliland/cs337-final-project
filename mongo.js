var {MongoClient} = require("mongodb")
var client = new MongoClient("mongodb://127.0.0.1:27017/")

client.connect()
.then(function() {
    console.log("Connected to MongoDB")
})
.catch(function(err) {
    console.log(err)
})

// user could be a username or "Guest"
function getCart(user) {
    return client.connect()
    .then(function() {
        var db = client.db("uofaHoodies")
        var coll = db.collection("cart")

        // returns {"user": username/Guest, "items": [{#products}]}
        return coll.findOne({"user": user})
    })
    .then(function(doc) {
        if (doc == null) {
            var db = client.db("uofaHoodies")
            var coll = db.collection("cart")
            var emptyCart = {"user": user, "items": []}
            return coll.insertOne(emptyCart)
            .then(function() {
                return emptyCart
            })
        }
        console.log(doc)
        return doc
    })
    .catch(function(err) {
        console.log(err)
    })
}

// clears cart -- for guest do upon checkout, for user do after saving order
function clearCart(user) {
    return client.connect()
    .then(function() {
        var db = client.db("uofaHoodies")
        var coll = db.collection("cart")
        return coll.updateOne({"user": user}, {$set: {"items": []}})
    })
    .then(function() {
        console.log("Cart cleared")
    })
    .catch(function(err) {
        console.log(err)
    })
}

// returns updated user object with new order added to orders section
function addOrder(user, order) {
    return client.connect()
    .then(function() {
        var db = client.db("uofaHoodies")
        var coll = db.collection("users")
        return coll.updateOne({"username": user}, {$push: {"orders": order}})
    })
    .then(function() {
        console.log(`order added to ${user}'s orders`)
    })
    .catch(function(err) {
        console.log(err)
    })
}

// returns user object with given username
function getUser(username) {
    return client.connect()
    .then(function() {
        var db = client.db("uofaHoodies")
        var coll = db.collection("users")
        return coll.findOne({"username": username})
    })
    .then(function(doc) {
        console.log(doc)
        return doc
    })
    .catch(function(err) {
        console.log(err)
    })
}

function addUser(username, password) {
    return client.connect()
    .then(function() {
        var db = client.db("uofaHoodies")
        var coll = db.collection("users")
        return coll.insertOne({"username": username, "password": password, "orders": []})
    })
    .then(function() {
        console.log("User added")
    })
    .catch(function(err) {
        console.log(err)
    })
}
// returns all products
function getProducts() {
    return client.connect()
    .then(function() {
        var db = client.db("uofaHoodies")
        var coll = db.collection("products")
        return coll.find({}).toArray()
    })
    .catch(function(err) {
        console.log(err)
    })
}
 
// returns a single product by its _id string
function getProduct(id) {
    var { ObjectId } = require("mongodb")
    return client.connect()
    .then(function() {
        var db = client.db("uofaHoodies")
        var coll = db.collection("products")
        return coll.findOne({ "_id": new ObjectId(id) })
    })
    .catch(function(err) {
        console.log(err)
    })
}
 
// adds a product (with chosen size) to a user's cart
function addToCart(user, item) {
    return client.connect()
    .then(function() {
        var db = client.db("uofaHoodies")
        var coll = db.collection("cart")
        return coll.updateOne(
            { "user": user },
            { $push: { "items": item } },
            { upsert: true }  // creates the cart document if it doesn't exist yet
        )
    })
    .then(function() {
        console.log("Item added to cart for " + user)
    })
    .catch(function(err) {
        console.log(err)
    })
}


module.exports = {getCart, clearCart, addOrder, getUser, addUser, getProduct, getProducts, addToCart}
