import React from 'react';

const SideMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? 'X' : 'MENU'}
      </button>
      <nav>
        <ul>
          <li>Administración</li>
          <li className="active">Ventas</li>
          <li>Productos</li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;