import express from "express";

import { handleErrors } from "./middlewares.js";
import usersRepo from "../../repositories/users.js";
import signupTemplate from "../../views/admin/auth/signup.js";
import signinTemplate from "../../views/admin/auth/signin.js";
import { validationRulesAuth } from "./validators.js";

const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser,
} = validationRulesAuth;

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

// const bodyParser = (req, res, next) => {
//   if (req.method === "POST") {
//     req.on("data", (data) => {
//       const parsed = data.toString("utf8").split("&");
//       const formData = {};
//       for (let pair of parsed) {
//         const [key, value] = pair.split("=");
//         formData[key] = value;
//       }

//       req.body = formData;
//       next();
//     });
//   } else {
//     next();
//   }
// };

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id;

    res.redirect("/admin/products");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/signin",
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    const user = await usersRepo.getOneBy({ email });
    req.session.userId = user.id;

    res.redirect("/admin/products");
  }
);

export default router;
