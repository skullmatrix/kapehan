import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './data-source'; // Import the initializeDatabase function
import { ProductController } from './controller/ProductController';
import { seedDatabase } from './seed'; // Import the seed function

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
const productController = new ProductController();
app.get('/products', (req, res) => productController.getProducts(req, res));
app.get('/order-types', (req, res) => productController.getOrderTypes(req, res));
app.get('/payment-types', (req, res) => productController.getPaymentTypes(req, res));
app.post('/orders', (req, res) => productController.createOrder(req, res));
app.post('/invoices', (req, res) => productController.createInvoice(req, res));

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

async function startServer() {
    try {
        // Initialize database first
        const dbConnection = await initializeDatabase();
        if (!dbConnection) {
            throw new Error('Database connection failed');
        }

        // Seed initial data
        await seedDatabase();
        console.log('🌱 Database seeded successfully');

        // Only start listening after database is initialized
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
            console.log(`🔥 Test the API: http://localhost:${port}/health`);
        });
    } catch (error) {
        console.error('❌ Server startup failed:', error);
        process.exit(1);
    }
}

// Start the server
startServer().catch((error) => {
    console.error('❌ Unhandled error during startup:', error);
    process.exit(1);
});