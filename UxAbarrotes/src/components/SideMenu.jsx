import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SideMenu.css';
function SideMenu({ isOpen }) {
  return (
    <aside className={`side-menu ${isOpen ? 'open' : ''}`}>
      <nav>
        <ul>
          <li><NavLink to="/administracion">Administración</NavLink></li>
          <li><NavLink to="/ventas">Ventas</NavLink></li>
          <li><NavLink to="/productos">Productos</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideMenu;