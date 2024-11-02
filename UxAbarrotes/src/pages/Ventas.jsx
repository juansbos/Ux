import React, { useState, useEffect } from 'react';
import productos from '../pages/productos';
import SearchBar from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, MinusCircle, ShoppingCart } from 'lucide-react';
import '../styles/Ventas.css';

function Ventas() {
  const [cantidades, setCantidades] = useState(() => {
    return productos.reduce((acc, producto) => {
      acc[producto.id] = 0;
      return acc;
    }, {});
  });
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productos);

  // Filter products based on search term
  useEffect(() => {
    const filtered = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const incrementarCantidad = (id) => {
    setCantidades(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const disminuirCantidad = (id) => {
    setCantidades(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] - 1)
    }));
  };

  const calcularTotal = () => {
    return productos.reduce((acc, producto) => {
      return acc + producto.precio * cantidades[producto.id];
    }, 0);
  };

  const calcularTotalItems = () => {
    return Object.values(cantidades).reduce((acc, cantidad) => acc + cantidad, 0);
  };

  const handleCheckout = () => {
    const itemsToCheckout = productos
      .filter(producto => cantidades[producto.id] > 0)
      .map(producto => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidades[producto.id]
      }));
  
    navigate('/pago', {
      state: {
        items: itemsToCheckout,
        total: calcularTotal()
      }
    });
  };

  return (
    <div className="ventas-page">
      {/* Search Section */}
      <div className="search-section">
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar productos..."
        />
      </div>

      {/* Main Content */}
      <div className="ventas-content">
        {/* Products Table */}
        <div className="productos-table-container">
          <table className="productos-table">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((producto) => (
                <tr key={producto.id}>
                  <td className="cantidad-cell">{cantidades[producto.id]}</td>
                  <td className="producto-cell">{producto.nombre}</td>
                  <td className="precio-cell">${producto.precio.toFixed(2)}</td>
                  <td className="subtotal-cell">
                    ${(producto.precio * cantidades[producto.id]).toFixed(2)}
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="action-button decrease"
                      onClick={() => disminuirCantidad(producto.id)}
                      disabled={cantidades[producto.id] === 0}
                    >
                      <MinusCircle size={20} />
                    </button>
                    <button 
                      className="action-button increase"
                      onClick={() => incrementarCantidad(producto.id)}
                    >
                      <PlusCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              No se encontraron productos que coincidan con la búsqueda
            </div>
          )}
        </div>

        {/* Total and Checkout Section */}
        <div className="checkout-section">
          <div className="cart-summary">
            <div className="cart-icon">
              <ShoppingCart size={24} />
              <span className="item-count">{calcularTotalItems()}</span>
            </div>
            <div className="total-amount">
              <span>Total</span>
              <span className="amount">${calcularTotal().toFixed(2)}</span>
            </div>
          </div>
          <button 
            className="checkout-button"
            disabled={calcularTotal() === 0}
            onClick={handleCheckout}
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ventas;