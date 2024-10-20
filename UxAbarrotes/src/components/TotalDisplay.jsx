import React from 'react';
import '../styles/TotalDisplay.css';
function TotalDisplay({ total }) {
  return (
    <div className="total-display">
      <h2>Total</h2>
      <p className="total-amount">${total.toFixed(2)}</p>
    </div>
  );
}

export default TotalDisplay;