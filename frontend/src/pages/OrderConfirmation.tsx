import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/orderconfirmation.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const { cart } = location.state as { cart: CartItem[] } || { cart: [] };
  const [customerName, setCustomerName] = useState("");
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    // Handle order confirmation logic here
    navigate("/order-complete");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="order-confirmation-container">
      <h2 className="order-confirmation-title">Order Confirmation</h2>
      <div className="order-confirmation-content">
        <div className="order-items">
          <h3 className="order-items-title">Items in Cart</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="order-item">
                <span>{item.name}</span>
                <span>{item.quantity} x ₹{item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="order-total">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>
        <div className="customer-info">
          <h3 className="customer-info-title">Customer Information</h3>
          <input
            type="text"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="customer-name-input"
          />
          <button className="confirm-order-button" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;