var { MongoClient, ObjectId } = require("mongodb")
var client = new MongoClient("mongodb://127.0.0.1:27017/")

var products = [
    {
        name: "Classic UofA Hoodie",
        description: "A cozy pullover hoodie featuring the classic University of Arizona logo on the chest. Perfect for cool Tucson evenings.",
        price: 49.99,
        image: "images/classic-hoodie.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Wildcat Zip-Up",
        description: "Full zip-up hoodie with the Wildcat mascot embroidered on the back. Features two front pockets and a adjustable drawstring.",
        price: 59.99,
        image: "images/zipup-hoodie.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Bear Down Pullover",
        description: "Lightweight pullover with 'Bear Down' printed across the front in bold Arizona font. Great for game days.",
        price: 44.99,
        image: "images/beardown-hoodie.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "UofA Campus Hoodie",
        description: "Soft fleece hoodie with a small UofA crest on the left chest. A subtle and stylish way to rep your school.",
        price: 54.99,
        image: "images/campus-hoodie.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Arizona Wildcats Hoodie",
        description: "Bold hoodie with 'Arizona Wildcats' printed in large letters across the chest. Made from 100% cotton fleece.",
        price: 52.99,
        image: "images/wildcats-hoodie.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "UofA Tie-Dye Hoodie",
        description: "Eye-catching tie-dye hoodie in red and blue Arizona colors. A fun and unique way to show your school spirit.",
        price: 64.99,
        image: "images/tiedye-hoodie.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Tucson Desert Hoodie",
        description: "Desert-themed hoodie with a sunset and saguaro cactus graphic on the back. Represents Arizona inside and out.",
        price: 57.99,
        image: "images/desert-hoodie.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "UofA Vintage Hoodie",
        description: "Retro-style hoodie with a faded vintage UofA logo. Soft, worn-in feel straight out of the bag.",
        price: 62.99,
        image: "images/vintage-hoodie.jpg",
        sizes: ["S", "M", "L", "XL"]
    }
]

client.connect()
.then(function() {
    console.log("Connected to MongoDB")
    var db = client.db("uofaHoodies")
    var coll = db.collection("products")
    return coll.insertMany(products)
})
.then(function(result) {
    console.log("Inserted " + result.insertedCount + " products successfully!")
    console.log("Product IDs:")
    console.log(result.insertedIds)
})
.catch(function(err) {
    console.log("Error:", err)
})
.finally(function() {
    client.close()
})