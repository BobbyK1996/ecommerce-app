import layout from "../layout.js";

export default ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      const formattedPrice = product.price.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
      });

      return ` 
      <tr>
        <td>${product.title}</td>
        <td>${formattedPrice}</td>
        <td>
          <a href="/admin/products/${product.id}/edit">
            <button class="button is-link">Edit</button>
          </a>
        </td>
        <td>
          <button class="button is-danger">Delete</button>
        </td>
      </tr>`;
    })
    .join("");

  return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">Products</h1>
        <a href="/admin/products/new" class="button is-primary">New Product</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
    `,
  });
};
