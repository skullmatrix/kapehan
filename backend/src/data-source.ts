import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "./entity/Product";
import { OrderType } from "./entity/OrderType";
import { Invoice } from "./entity/Invoice";
import { PaymentType } from "./entity/PaymentType";
import mysql from "mysql2/promise";
import config from "./config";

dotenv.config();

const { host, port, user, password, database } = config.database;

// Create DataSource without initializing
export const AppDataSource = new DataSource({
    type: "mysql",
    host,
    port,
    username: user,
    password,
    database,
    entities: [Product, OrderType, PaymentType, Invoice],
    synchronize: true, // Set to true to auto-create tables
    logging: true,
    migrations: [],
    subscribers: [],
});

async function databaseExists(connection: mysql.Connection, dbName: string): Promise<boolean> {
    const [rows]: any = await connection.query(
        'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
        [dbName]
    );
    return rows.length > 0;
}

export async function initializeDatabase() {
    let connection: mysql.Connection | null = null;
    try {
        console.log("🔄 Checking database existence...");
        
        // Connect without database selected
        connection = await mysql.createConnection({
            host,
            port,
            user,
            password
        });

        const exists = await databaseExists(connection, database);
        
        if (!exists) {
            console.log(`⚠️ Database '${database}' not found. Creating...`);
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
            console.log(`✅ Database '${database}' created successfully.`);
        } else {
            console.log(`✅ Database '${database}' already exists.`);
        }

        // Close the initial connection
        await connection.end();

        // Now initialize TypeORM
        console.log("🚀 Initializing TypeORM...");
        await AppDataSource.initialize();
        console.log("✅ TypeORM initialized successfully!");
        
        return AppDataSource;

    } catch (error) {
        console.error("❌ Database initialization failed:", error);
        throw error;
    }
}