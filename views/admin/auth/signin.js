import layout from "../layout.js";
import helpers from "../../helpers.js";

const { getError } = helpers;

export default ({ errors }) => {
  return layout({
    content: `
      <div>
        <form method="POST">
          <input name="email" placeholder="email" />
          ${getError(errors, "email")}
          <input name="password" placeholder="password" />
          ${getError(errors, "password")}
          <button>Sign In</button>
        </form>
      </div>
    `,
  });
};
