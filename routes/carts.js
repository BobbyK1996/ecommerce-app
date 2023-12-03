import express from "express";

import cartsRepo from "../repositories/carts.js";
import productsRepo from "../repositories/products.js";
import cartShowTemplate from "../views/carts/show.js";

const router = express.Router();

//Post request to add item to cart
router.post("/cart/products", async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }
  //Does the user already have a cart or not
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  //Either increment quantity of an existing product, or add a new product altogether.
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );

  console.log(existingItem);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.redirect("/cart");
});
//Get request to show all items in cart
router.get("/cart", async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  console.log(req.method);

  res.send(cartShowTemplate({ items: cart.items }));
});

//Post request to delete item from cart
router.post("/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);

  const items = cart.items.filter((item) => item.id !== itemId);

  await cartsRepo.update(req.session.cartId, { items });

  res.redirect("/cart");
});
export default router;
