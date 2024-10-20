import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Navbar.css'

function Navbar({ toggleSideMenu }) {
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
    <nav className="navbar">
      <button className="menu-toggle" onClick={toggleSideMenu}>
        ☰
      </button>
      <h1 className="navbar-title">{getTitle()}</h1>
    </nav>
  );
}

export default Navbar;