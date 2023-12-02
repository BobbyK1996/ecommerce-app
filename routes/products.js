import express from "express";
import productsRepo from "../repositories/products.js";
import productsIndexTemplate from "../views/products/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productsRepo.getAll();
  // console.log(products);
  res.send(productsIndexTemplate({ products }));
});

export default router;
