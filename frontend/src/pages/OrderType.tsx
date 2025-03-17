import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrderTypes } from '../api';

const OrderType = () => {
    const navigate = useNavigate();
    const [orderTypes, setOrderTypes] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrderTypes = async () => {
            try {
                const data = await fetchOrderTypes();
                setOrderTypes(data);
            } catch (error) {
                setError('Failed to load order types');
            } finally {
                setLoading(false);
            }
        };

        loadOrderTypes();
    }, []);

    const handleOrderTypeSelection = (orderTypeId: number) => {
        navigate('/menu', { state: { orderTypeId } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="order-type-container">
            <h1>Choose Order Type</h1>
            {orderTypes.map((orderType) => (
                <button key={orderType.id} onClick={() => handleOrderTypeSelection(orderType.id)}>
                    {orderType.name}
                </button>
            ))}
        </div>
    );
};

export default OrderType;