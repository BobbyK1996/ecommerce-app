# ecommerce-app

Creating an eCommerce application. Creating a Node.js web-server serving HTML webpages that lets users view items, add to cart and eventually purchase. This will include a custom database, as well as authentication for an admin page to create/edit existing/new products

Regarding the custom database: this is a first pass at creating a data storage solution with CRUD capabilities. I would not consider this a production grade solutions due to the fact it:

1. Will error if we try to open/write the same file twice at the same time.
2. Won't work if we have multiple servers running on different machines.
3. Is inefficient as we have to write to the file system every time we want to create, update or delete some data.

A better solution will be implemented.
