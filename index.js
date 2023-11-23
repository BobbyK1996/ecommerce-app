import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`
    <div>
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

app.post("/", (req, res) => {
  res.send("Account created!");
});

app.listen(PORT, () => {
  console.log("Listening");
});
