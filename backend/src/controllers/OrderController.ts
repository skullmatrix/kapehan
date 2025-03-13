import { Request, Response } from 'express';
import { db } from '../helpers/database';
import { Order } from '../model/Order';
import { OrderItem } from '../model/OrderItem';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const orderRepo = db.getRepository(Order);
        const orderItemRepo = db.getRepository(OrderItem);
        
        const { items, ...orderData } = req.body;
        const order = orderRepo.create(orderData);
        const savedOrder = await orderRepo.save(order);

        // Create order items
        if (items && Array.isArray(items)) {
            const orderItems = items.map(item => {
                return orderItemRepo.create({
                    ...item,
                    order: savedOrder
                });
            });
            await orderItemRepo.save(orderItems.flat());
        }

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await db.getRepository(Order).find({
            relations: ['items', 'customer']
        });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};