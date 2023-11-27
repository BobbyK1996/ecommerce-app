import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import usersRepo from "./repositories/users.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["fdsg7g8w32ng248fdgdfggh089j"],
  })
);

app.get("/", (req, res) => {
  res.send(`
    <div>
      Your id is: ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input
          name="passwordConfirmation"
          placeholder="password confirmation"
        />
        <button>Sign Up</button>
      </form>
    </div>
  `);
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

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email in use");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }

  //Create a user in our user repo to represent this person
  const user = await usersRepo.create({ email, password });
  //Store the id of that user inside the users cookie
  req.session.userId = user.id;

  res.send("Account created!");
});

app.listen(PORT, () => {
  console.log("Listening");
});
