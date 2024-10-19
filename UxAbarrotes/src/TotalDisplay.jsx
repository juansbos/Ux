import React from 'react';

const TotalDisplay = ({ total }) => {
  return (
    <div className="total-display">
      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
};

export default TotalDisplay;