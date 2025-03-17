export const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return await response.json();
};

export const fetchOrderTypes = async () => {
    const response = await fetch('http://localhost:3000/order-types');
    if (!response.ok) {
        throw new Error('Failed to fetch order types');
    }
    return await response.json();
};

export const fetchPaymentTypes = async () => {
    const response = await fetch('http://localhost:3000/payment-types');
    if (!response.ok) {
        throw new Error('Failed to fetch payment types');
    }
    return await response.json();
};

export const createOrder = async (orderData: any) => {
    const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    return await response.json();
};

export const createInvoice = async (invoiceData: any) => {
    const response = await fetch('http://localhost:3000/invoices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
    });
    if (!response.ok) {
        throw new Error('Failed to create invoice');
    }
    return await response.json();
};