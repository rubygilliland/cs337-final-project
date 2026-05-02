**UofA Hoodies Store**

This is a Node.js web application built using Express and MongoDB. 
The application allows users to create accounts, browse hoodie products, 
add items to a cart, and place orders.

**Follow the steps below to install dependencies and run the project.**

    1. Install required packages:
        npm install express mongodb

    2. Make sure MongoDB is running.

    3. Run the product seed script: 
        node seedProducts.js

    3. Start the server:
        node server.js

The application will run at:
http://localhost:3000/home

**Project Structure**
```text
.
├── public_html/    # all .html and subsequent src (.js) and style (.css) files
│   ├── images/     # all product and logo images 
|       ├── beardown-hoodie.jpg
|       ├── campus-hoodie.jpg
|       ├── classic-hoodie.jpg
|       ├── desert-hoodie.jpg
|       ├── tiedye-hoodie.jpg
|       ├── uofa-logo.png
|       ├── vintage-hoodie.jpg
|       ├── wildcats-hoodie.jpg
|       └── zipup-hoodie.jpg
|   ├── account.js
|   ├── cart_src.js
|   ├── cart.html
|   ├── home.html
|   ├── login.html
|   ├── orders_src.js
|   ├── orders.html
|   ├── product_src.js
|   ├── product.html
|   ├── products_src.js
|   ├── products.html
|   ├── register.html
|   ├── style.css
│   └── utils.js
├── .gitignore
├── mongo.js
├── package-lock.json
├── package.json
├── README.md
├── seedProducts.js    # product seed file -- run this first
└── server.js          # run this to launch the web server
```
