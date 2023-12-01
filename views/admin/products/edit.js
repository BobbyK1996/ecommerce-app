import layout from "../layout.js";
import { getError } from "../../helpers.js";

export default ({ product, errors }) => {
  return layout({
    content: `
      <form method="POST">
        <input name="title" value="${product.title}" />
        ${getError(errors, "title")}
        <input name="price" value="${product.price}" />
        ${getError(errors, "price")}
        <input name="image" type="file" />
        <button>Submit</button>
      </form>
    `,
  });
};
