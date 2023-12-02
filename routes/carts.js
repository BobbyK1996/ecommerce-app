import express from "express";
import cartsRepo from "../repositories/carts.js";

const router = express.Router();

//Post request to add item to cart
router.post("/cart/products", async (req, res) => {
  //Does the user already have a cart or not
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  //Either increment quantity of an existing product, or add a new product altogether.
  console.log(cart);

  res.send("Product added to cart");
});
//Post request to show all items in cart
//Post request to delete item from cart

export default router;
