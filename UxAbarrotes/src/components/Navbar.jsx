import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import viteLogo from '/vite.svg'  // Adjust this path according to your project structure
import '../styles/Navbar.css';

function Navbar({ toggleSideMenu, isSideMenuOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    switch (location.pathname) {
      case '/ventas':
        return 'Ventas';
      case '/finanzas':
        return 'Finanzas';
      case '/inventario':
        return 'Inventario';
      default:
        return 'Ventas';
    }
  };

  const handleLogoClick = () => {
    navigate('/ventas');
  };

  const handleTitleClick = () => {
    navigate('/ventas');
  };

  return (
    <nav className="navbar">
      {/* Left - Logo Section */}
      <div className="navbar-brand" onClick={handleLogoClick} role="button" tabIndex={0}>
        <img src={viteLogo} alt="TODO-MART Logo" className="navbar-logo" />
        <span className="navbar-title">TODO-MART</span>
      </div>

      {/* Center - Page Title */}
      <h1 className="page-title" onClick={handleTitleClick} role="button" tabIndex={0}>
        {getTitle()}
      </h1>

      {/* Right - Menu Button */}
      <button 
        className="menu-button" 
        onClick={toggleSideMenu} 
        aria-label={isSideMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <span className="menu-icon">☰</span>
      </button>
    </nav>
  );
}

export default Navbar;