import React, { useState, useEffect } from 'react';
import '../styles/ProductList.css';
const initialProducts = [
  { id: 1, name: 'Leche Lala 100 Deslact. 1 lt', price: 25.50, quantity: 0 },
  { id: 2, name: 'Frijoles Bayos LaSierra 430g', price: 18.90, quantity: 0 },
  { id: 3, name: 'Bebida polvo Tang Limón 13g', price: 5.50, quantity: 0 },
  { id: 4, name: 'Pechuga pollo Tyson C. 700g', price: 85.00, quantity: 0 },
  { id: 5, name: 'Huevo Bco. Bachoco 18 pzs.', price: 45.00, quantity: 0 },
];

function ProductList({ searchTerm, onTotalChange }) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const newTotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    onTotalChange(newTotal);
  }, [products, onTotalChange]);

  const handleQuantityChange = (id, newQuantity) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredProducts.map(product => (
          <tr key={product.id}>
            <td>
              <input
                type="number"
                min="0"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
              />
            </td>
            <td>{product.name}</td>
            <td>${product.price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;