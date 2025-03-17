import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const { cart, name, orderTypeId, paymentTypeId, total, tax, grandTotal } = location.state;
    const orderNumber = Math.floor(Math.random() * 1000000);
    const date = new Date().toLocaleString();

    return (
        <div className="order-confirmation-container">
            <h1>Order Confirmation</h1>
            <p>Order Number: {orderNumber}</p>
            <p>Name: {name}</p>
            <p>Date and Time: {date}</p>
            <h2>Order List</h2>
            {cart.map((item: any) => (
                <div key={item.id}>
                    <p>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
            ))}
            <p>Total: ${total.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Grand Total: ${grandTotal.toFixed(2)}</p>
            <p>Order Type: {orderTypeId}</p>
            <p>Payment Type: {paymentTypeId}</p>
        </div>
    );
};

export default OrderConfirmation;