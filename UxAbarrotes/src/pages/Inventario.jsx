import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle, Package } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import '../styles/Inventario.css'

const initialInventory = [
  { 
    id: 1, 
    nombre: 'Arroz', 
    precio: 25.00, 
    stock: 100, 
    stockMinimo: 20,
    stockMaximo: 150,
    categoria: 'Abarrotes',
    limitePorCliente: 5
  },
  // Add more items as needed
];

function Inventario() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventario, setInventario] = useState(initialInventory);
  const [filteredItems, setFilteredItems] = useState(inventario);

  useEffect(() => {
    const filtered = inventario.filter(item =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, inventario]);

  const updateStock = (id, amount) => {
    setInventario(prevItems =>
      prevItems.map(item =>
        item.id === id 
          ? { ...item, stock: Math.max(0, item.stock + amount) }
          : item
      )
    );
  };

  return (
    <div className="inventario-page">
      <div className="search-section">
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o categoría..."
        />
      </div>

      <div className="inventario-content">
        <div className="inventario-header">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package size={24} />
            Control de Inventario
          </h2>
        </div>

        <div className="inventario-table-container">
          <table className="inventario-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock Actual</th>
                <th>Stock Mínimo</th>
                <th>Stock Máximo</th>
                <th>Límite por Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.categoria}</td>
                  <td className="precio-cell">${item.precio.toFixed(2)}</td>
                  <td className={`stock-cell ${item.stock <= item.stockMinimo ? 'text-red-600' : ''}`}>
                    {item.stock}
                  </td>
                  <td>{item.stockMinimo}</td>
                  <td>{item.stockMaximo}</td>
                  <td>{item.limitePorCliente}</td>
                  <td className="actions-cell">
                    <button 
                      className="action-button decrease"
                      onClick={() => updateStock(item.id, -1)}
                      disabled={item.stock === 0}
                    >
                      <MinusCircle size={20} />
                    </button>
                    <button 
                      className="action-button increase"
                      onClick={() => updateStock(item.id, 1)}
                      disabled={item.stock >= item.stockMaximo}
                    >
                      <PlusCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredItems.length === 0 && (
            <div className="no-results">
              No se encontraron items que coincidan con la búsqueda
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventario;