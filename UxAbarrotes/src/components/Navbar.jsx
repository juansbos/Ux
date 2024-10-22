import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/vite.svg';

function Navbar({ toggleSideMenu, isSideMenuOpen }) {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/ventas':
        return 'Ventas';
      case '/administracion':
        return 'Administración';
      case '/productos':
        return 'Productos';
      case '/inventario':
        return 'Inventario';
      case '/finanzas':
        return 'Finanzas';
      case '/pagar':
        return 'Pagar';
      default:
        return 'Ventas';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSideMenu}>
          {isSideMenuOpen ? '✖' : '☰'}
        </button>
        <a href="/" className="navbar-title">TODO-MART</a>
      </div>
      <div className="navbar-right">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h1>{getTitle()}</h1>
      </div>
    </nav>
  );
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logotipo} alt="Logotipo" className="navbar-logotipo" />
      </div>
      <h1 className="navbar-title">{getTitle()}</h1>
      <button className="menu-toggle" onClick={toggleSideMenu}>
        {isSideMenuOpen ? '✖' : '☰'}
      </button>
    </nav>
  );
}

export default Navbar;
