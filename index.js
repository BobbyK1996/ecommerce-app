import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import authRouter from "./routes/admin/auth.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["fdsg7g8w32ng248fdgdfggh089j"],
  })
);
app.use(authRouter);

app.listen(PORT, () => {
  console.log("Listening");
});
