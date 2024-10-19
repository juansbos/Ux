import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import ProductList from './ProductList.jsx';
import TotalDisplay from './TotalDisplay.jsx';
import SideMenu from './SideMenu.jsx';
import './App.css';

const initialProducts = [
  { id: 1, name: 'Leche Lala100 Deslact. 1 lt', price: 25.50, quantity: 0 },
  { id: 2, name: 'Frijoles Bayos LaSierra 430g', price: 18.90, quantity: 0 },
  { id: 3, name: 'Bebida polvo Tang Limón 13g', price: 5.80, quantity: 0 },
  { id: 4, name: 'Pechuga pollo Tyson C. 700g', price: 89.90, quantity: 0 },
  { id: 5, name: 'Huevo Bco. Bachoco 18 pzs.', price: 49.90, quantity: 0 },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [total, setTotal] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const newTotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    setTotal(newTotal);
  }, [products]);

  const updateQuantity = (id, newQuantity) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <div className="content">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {total === 0 ? (
            <p className="start-prompt">COMIENZA A MARCAR PRODUCTOS PARA SU COMPRA</p>
          ) : (
            <ProductList products={filteredProducts} updateQuantity={updateQuantity} />
          )}
          <TotalDisplay total={total} />
          <button className="payment-button">Ir al pago</button>
        </div>
      </div>
    </div>
  );
}

export default App;