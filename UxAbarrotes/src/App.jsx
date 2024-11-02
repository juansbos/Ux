import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SideMenu from "@/components/SideMenu";
import Ventas from "@/pages/Ventas";
import Finanzas from "@/pages/Finanzas";
import Inventario from "@/pages/Inventario";
import Pago from "@/pages/Pago";

import "@/styles/App.css";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <Router>
      <div className="app">
        <Navbar toggleSideMenu={toggleSideMenu} isSideMenuOpen={isSideMenuOpen} />
        <div className="content-wrapper">
          <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Ventas />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/finanzas" element={<Finanzas />} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/pago" element={<Pago />} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;