var {MongoClient} = require("mongodb")
var client = new MongoClient("mongodb://127.0.0.1:27017/")

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
        console.log(doc)
        return doc
    })
    .catch(function(err) {
        console.log(err)
    })
    .finally(function() {
        client.close()
    })
}

// clears cart -- for guest do upon checkout, for user do after saving order
function clearCart(user) {
    return client.connect()
    .then(function() {
        var db = client.db("uofaHoodies")
        var coll = db.collection("cart")
        return coll.updateOne({"user": user}, {$set: {"products": []}})
    })
    .then(function() {
        console.log("Cart cleared")
    })
    .catch(function(err) {
        console.log(err)
    })
    .finally(function() {
        client.close()
    })
}

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
    .finally(function() {
        client.close()
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
    .finally(function() {
        client.close()
    })
}