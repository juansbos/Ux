import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/vite.svg'; // El logo está en la carpeta de assets

function Header({ toggleSideMenu, isSideMenuOpen }) {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/ventas':
        return 'Ventas';
      case '/administracion':
        return 'Administración';
      case '/productos':
        return 'Productos';
      default:
        return 'Ventas';
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo-img" />
        <span className="logo-text">TODO-MART</span>
      </div>
      <h1 className="header-title">{getTitle()}</h1>
      <button className="menu-toggle" onClick={toggleSideMenu}>
        {isSideMenuOpen ? '✖' : '☰'}
      </button>
    </header>
  );
}

export default Header;
