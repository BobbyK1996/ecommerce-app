import layout from "../layout.js";

const getError = (errors, propertyName) => {
  try {
    const errorsInner = errors["errors"];
    for (const error of errorsInner) {
      if (error["path"] === propertyName) {
        return error.msg;
      }
    }
    return "";
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
