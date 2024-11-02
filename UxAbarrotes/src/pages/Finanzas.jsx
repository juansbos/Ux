import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import '../styles/Finanzas.css'

const initialTransactions = [
  {
    id: 1,
    fecha: '2024-03-23',
    tipo: 'entrada',
    item: 'Arroz',
    cantidad: 10,
    precioUnitario: 25.00,
    total: 250.00
  },
  // Add more transactions as needed
];

function Finanzas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  useEffect(() => {
    const filtered = transactions.filter(transaction =>
      transaction.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [searchTerm, transactions]);

  const calculateSummary = () => {
    return filteredTransactions.reduce((acc, transaction) => {
      if (transaction.tipo === 'entrada') {
        acc.entradas += transaction.total;
      } else {
        acc.salidas += transaction.total;
      }
      acc.balance = acc.entradas - acc.salidas;
      return acc;
    }, { entradas: 0, salidas: 0, balance: 0 });
  };

  const summary = calculateSummary();

  return (
    <div className="finanzas-page">
      <div className="search-section">
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por item o tipo..."
        />
      </div>

      <div className="finanzas-content">
        <div className="summary-cards grid grid-cols-3 gap-4 mb-6">
          <div className="card bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-500" />
              <h3 className="font-semibold">Entradas Totales</h3>
            </div>
            <p className="text-2xl font-bold text-green-500">
              ${summary.entradas.toFixed(2)}
            </p>
          </div>

          <div className="card bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="text-red-500" />
              <h3 className="font-semibold">Salidas Totales</h3>
            </div>
            <p className="text-2xl font-bold text-red-500">
              ${summary.salidas.toFixed(2)}
            </p>
          </div>

          <div className="card bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-blue-500" />
              <h3 className="font-semibold">Balance</h3>
            </div>
            <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
              ${summary.balance.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Item</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.fecha}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      transaction.tipo === 'entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.tipo.charAt(0).toUpperCase() + transaction.tipo.slice(1)}
                    </span>
                  </td>
                  <td>{transaction.item}</td>
                  <td>{transaction.cantidad}</td>
                  <td className="price-cell">${transaction.precioUnitario.toFixed(2)}</td>
                  <td className={`total-cell ${
                    transaction.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${transaction.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="no-results">
              No se encontraron registros que coincidan con la búsqueda
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Finanzas;