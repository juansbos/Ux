import React from 'react';

const Header = ({ toggleMenu }) => {
  return (
    <header className="header">
      <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      <img src="/todo-mart-logo.svg" alt="TODO-MART Logo" className="logo" />
      <h1>TODO-MART</h1>
    </header>
  );
};

export default Header;