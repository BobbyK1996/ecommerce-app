import layout from "../layout.js";

export default ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `<div>${product.title}</div>`;
    })
    .join("");

  return layout({
    content: `
      <h1 class="title">Products</h1>
      ${renderedProducts}
    `,
  });
};
