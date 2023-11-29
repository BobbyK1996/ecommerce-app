import layout from "../layout.js";

const getError = (errors, propertyName) => {
  try {
    const error = errors.errors.find((error) => error.path === propertyName);
    return error ? error.msg : "";
  } catch (err) {
    return "";
  }
};

export default ({ req, errors }) => {
  return layout({
    content: `
      <div>
        Your id is: ${req.session.userId}
        <form method="POST">
          <input name="email" placeholder="email" />
          ${getError(errors, "email")}
          <input name="password" placeholder="password" />
          ${getError(errors, "password")}
          <input
            name="passwordConfirmation"
            placeholder="password confirmation"
          />
          ${getError(errors, "passwordConfirmation")}
          <button>Sign Up</button>
        </form>
      </div>
    `,
  });
};
