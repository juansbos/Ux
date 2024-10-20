import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SideMenu from "@/components/SideMenu";
import Ventas from "@/pages/Ventas";
import "@/styles/App.css";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <Router>
      <div className="App">
        <Navbar toggleSideMenu={toggleSideMenu} />
        <div className="content-wrapper">
          <SideMenu isOpen={isSideMenuOpen} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Ventas />} />
              <Route path="/ventas" element={<Ventas />} />
              {/** Add routes for /administracion and /productos when components are ready **/}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;