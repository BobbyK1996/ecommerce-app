import express from "express";
import multer from "multer";

import { handleErrors } from "./middlewares.js";
import productsRepo from "../../repositories/products.js";
import productsNewTemplate from "../../views/admin/products/new.js";
import { validationRulesProducts } from "./validators.js";

const { requireTitle, requirePrice } = validationRulesProducts;
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const { title, price } = req.body;
    const image = req.file.buffer.toString("base64");
    await productsRepo.create({ title, price, image });

    res.send("submitted");
  }
);

export default router;
