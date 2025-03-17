import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchPaymentTypes, createInvoice } from '../api';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, orderTypeId } = location.state;
    const [name, setName] = useState('');
    const [paymentTypeId, setPaymentTypeId] = useState<number | null>(null);
    const [paymentTypes, setPaymentTypes] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPaymentTypes = async () => {
            try {
                const data = await fetchPaymentTypes();
                setPaymentTypes(data);
            } catch (error) {
                setError('Failed to load payment types');
            } finally {
                setLoading(false);
            }
        };

        loadPaymentTypes();
    }, []);

    const handlePayment = async () => {
        if (!paymentTypeId) {
            alert('Please select a payment type');
            return;
        }

        const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
        const tax = total * 0.12; // 12% tax
        const grandTotal = total + tax;

        const invoiceData = {
            orderNumber: Math.floor(Math.random() * 1000000).toString(),
            customerName: name,
            total: total,
            tax: tax,
            grandTotal: grandTotal,
            orderTypeId: orderTypeId,
            paymentTypeId: paymentTypeId,
        };

        try {
            await createInvoice(invoiceData);
            navigate('/order-confirmation', { state: { cart, name, orderTypeId, paymentTypeId, total, tax, grandTotal } });
        } catch (error) {
            setError('Failed to process payment');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="payment-container">
            <h1>Payment</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <select value={paymentTypeId || ''} onChange={(e) => setPaymentTypeId(Number(e.target.value))}>
                <option value="">Select Payment Type</option>
                {paymentTypes.map((paymentType) => (
                    <option key={paymentType.id} value={paymentType.id}>{paymentType.name}</option>
                ))}
            </select>
            <button onClick={handlePayment}>Pay</button>
        </div>
    );
};

export default Payment;