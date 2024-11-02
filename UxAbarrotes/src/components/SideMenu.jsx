import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SideMenu.css'

function SideMenu({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="side-menu-overlay" onClick={onClose} />
      )}

      {/* Menu */}
      <aside className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <button className="close-button" onClick={onClose}>
            <span className="close-icon">✕</span>
          </button>
          <h2>Menú</h2>
        </div>
        
        <nav className="side-menu-nav">
          <ul>
            <li>
              <NavLink 
                to="/finanzas"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={onClose}
              >
                Finanzas
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/ventas"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={onClose}
              >
                Ventas
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/inventario"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={onClose}
              >
                Inventario
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SideMenu;