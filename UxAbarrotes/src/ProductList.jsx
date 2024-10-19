import React from 'react';

const ProductList = ({ products, updateQuantity }) => {
  return (
    <table className="product-list">
      <thead>
        <tr>
          <th>Cantidad</th>
          <th>Producto</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <input
                type="number"
                min="0"
                value={product.quantity}
                onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
              />
            </td>
            <td>{product.name}</td>
            <td>${product.price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;