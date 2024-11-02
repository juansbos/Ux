import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  DollarSign, 
  Receipt, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import '../styles/Pago.css'
const PAYMENT_METHODS = [
  { id: 'cash', name: 'Efectivo', icon: DollarSign },
  { id: 'card', name: 'Tarjeta', icon: CreditCard },
];

function Pago() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amountReceived, setAmountReceived] = useState('');
  const [change, setChange] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const cartItems = location.state?.items || [];
  const total = location.state?.total || 0;

  useEffect(() => {
    if (!cartItems.length) {
      navigate('/ventas');
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    if (amountReceived && paymentMethod === 'cash') {
      const changeAmount = parseFloat(amountReceived) - total;
      setChange(changeAmount >= 0 ? changeAmount : 0);
    }
  }, [amountReceived, total]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setError('');
    if (method !== 'cash') {
      setAmountReceived('');
      setChange(0);
    }
  };

  const processPayment = async () => {
    if (paymentMethod === 'cash' && (!amountReceived || parseFloat(amountReceived) < total)) {
      setError('Monto inválido');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const transaction = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cartItems,
        total,
        paymentMethod,
        amountReceived: parseFloat(amountReceived),
        change
      };

      // Save to localStorage
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      transactions.push(transaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      
      // Update inventory
      const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
      cartItems.forEach(item => {
        const product = inventory.find(p => p.id === item.id);
        if (product) product.stock -= item.cantidad;
      });
      localStorage.setItem('inventory', JSON.stringify(inventory));

      navigate('/ventas', { state: { paymentSuccess: true } });
    } catch (err) {
      setError('Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-page">
      <header className="payment-header">
        <button onClick={() => navigate('/ventas')} className="back-button">
          <ArrowLeft size={20} />
          <span>Volver a Ventas</span>
        </button>
        <h1 className="payment-title">
          <Receipt size={24} />
          <span>Procesar Pago</span>
        </h1>
      </header>

      <div className="payment-container">
        <div className="order-summary">
          <h2>Resumen de la Orden</h2>
          <div className="items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-details">
                  <span className="item-name">{item.nombre}</span>
                  <span className="item-quantity">{item.cantidad} x ${item.precio}</span>
                </div>
                <span className="item-total">${(item.cantidad * item.precio).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-methods">
          <h2>Método de Pago</h2>
          <div className="methods-grid">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                className={`method-button ${paymentMethod === method.id ? 'active' : ''}`}
                onClick={() => handlePaymentMethodChange(method.id)}
              >
                <method.icon size={20} />
                <span>{method.name}</span>
              </button>
            ))}
          </div>

          {paymentMethod === 'cash' && (
            <div className="cash-payment">
              <div className="amount-input">
                <label>Monto Recibido</label>
                <input
                  type="number"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                  placeholder="0.00"
                  min={total}
                  step="0.01"
                />
              </div>
              {amountReceived && (
                <div className="change-display">
                  <span>Cambio a devolver</span>
                  <span className="change-amount">${change.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <button
            className="process-button"
            onClick={processPayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : 'Procesar Pago'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pago;