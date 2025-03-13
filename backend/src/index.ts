import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './helpers/database';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', router);

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

        // Only start listening after database is initialized
        app.listen(port, () => {
            console.log('📊 Database connected successfully');
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