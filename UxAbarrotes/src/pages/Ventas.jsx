import React, { useState } from 'react';
import productos from './Productos';
import '../styles/Ventas.css';

function Ventas() {
  // Crear un estado para almacenar la cantidad de cada producto, inicialmente en 0
  const [cantidades, setCantidades] = useState(() => {
    return productos.reduce((acc, producto) => {
      acc[producto.id] = 0; // Inicialmente, cada producto tiene cantidad 0
      return acc;
    }, {});
  });

  // Función para incrementar la cantidad de un producto
  const incrementarCantidad = (id) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [id]: prevCantidades[id] + 1
    }));
  };

  // Función para disminuir la cantidad de un producto
  const disminuirCantidad = (id) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [id]: Math.max(0, prevCantidades[id] - 1) // No permite disminuir por debajo de 0
    }));
  };

  // Calcular el total basado en las cantidades actuales
  const calcularTotal = () => {
    return productos.reduce((acc, producto) => {
      return acc + producto.precio * cantidades[producto.id];
    }, 0);
  };

  return (
    <div className="ventas-container">
      <div className="productos-table">
        <table>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Añadir/Quitar</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{cantidades[producto.id]}</td>
                <td>{producto.nombre}</td>
                <td>${(producto.precio * cantidades[producto.id]).toFixed(2)}</td>
                <td>
                  <button onClick={() => disminuirCantidad(producto.id)} disabled={cantidades[producto.id] === 0}>-</button>
                  <button onClick={() => incrementarCantidad(producto.id)}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pago-section">
        <h3>Total: ${calcularTotal().toFixed(2)}</h3>
        <button className="pago-boton" disabled={calcularTotal() === 0}>Ir al pago</button>
      </div>
    </div>
  );
}

export default Ventas;
