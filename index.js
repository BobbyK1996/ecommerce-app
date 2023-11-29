import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import authRouter from "./routes/admin/auth.js";
import productsRouter from "./routes/admin/products.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["fdsg7g8w32ng248fdgdfggh089j"],
  })
);
app.use(authRouter);
app.use(productsRouter);

app.listen(PORT, () => {
  console.log("Listening");
});
