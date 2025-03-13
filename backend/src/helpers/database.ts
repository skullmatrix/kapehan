import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Customer } from "../model/Customer";
import { Product } from "../model/Product";
import { Order } from "../model/Order";
import { OrderItem } from "../model/OrderItem";
import { Invoice } from "../model/Invoice";
import { Payment } from "../model/Payment";
import mysql from "mysql2/promise";
import config from "../helpers/config";

dotenv.config();

const { host, port, user, password, database } = config.database;

// Create DataSource without initializing
export const db = new DataSource({
    type: "mysql",
    host,
    port,
    username: user,
    password,
    database,
    entities: [Customer, Product, Order, OrderItem, Invoice, Payment],
    synchronize: true, // Set to true to auto-create tables
    logging: true,
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
        await db.initialize();
        console.log("✅ TypeORM initialized successfully!");
        
        return db;

    } catch (error) {
        console.error("❌ Database initialization failed:", error);
        throw error;
    }
}