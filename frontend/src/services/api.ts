import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Updated port to match backend

interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

interface InvoiceData {
  orderType: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
}

// Define all API methods in a single exported object
export const api = {
  createInvoice: async (orderData: InvoiceData) => {
    try {
      const response = await axios.post(`${API_URL}/invoices`, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};