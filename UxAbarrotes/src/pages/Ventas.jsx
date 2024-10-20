import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import TotalDisplay from '../components/TotalDisplay';
import '../styles/Ventas.css';

function Ventas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [total, setTotal] = useState(0);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTotalChange = (newTotal) => {
    setTotal(newTotal);
  };

  return (
    <div className="ventas-container">
      <div className="sidebar">
        <img src="logo.png" alt="TODO-MART Logo" className="logo" />
        <ProductList searchTerm={searchTerm} onTotalChange={handleTotalChange} />
        <TotalDisplay total={total} />
      </div>
      <div className="main-content">
        <SearchBar onSearch={handleSearch} />
        <div className="scanner-area">
          <p>ESCANEA UN PRODUCTO O BÚSCALO EN LA BARRA DE BÚSQUEDA</p>
        </div>
        <button className="payment-button">Ir al pago</button>
      </div>
    </div>
  );
}

export default Ventas;
