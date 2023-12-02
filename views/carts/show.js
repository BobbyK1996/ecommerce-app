import layout from "../layout.js";

export default ({ items }) => {
  const renderedItems = items
    .map((item) => {
      return `<div>${item.product.title} - ${item.product.price}</div>`;
    })
    .join("");

  return layout({
    content: `
      <h1>Cart</h1>
      ${renderedItems}
    `,
  });
};