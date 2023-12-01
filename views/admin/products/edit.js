import layout from "../layout.js";

export default ({ product }) => {
  return layout({
    content: html`
      <form method="POST">
        <input name="title" value="${product.title}" />
        <input name="price" value="${product.price}" />
        <input name="image" type="file" />
        <button>Submit</button>
      </form>
    `,
  });
};
