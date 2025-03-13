import { Request, Response } from 'express';
import { db } from '../helpers/database';
import { Payment } from '../model/Payment';

export const createPayment = async (req: Request, res: Response) => {
    try {
        const paymentRepo = db.getRepository(Payment);
        const payment = paymentRepo.create(req.body);
        const result = await paymentRepo.save(payment);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Error creating payment' });
    }
};

export const getPayments = async (req: Request, res: Response) => {
    try {
        const payments = await db.getRepository(Payment).find({
            relations: ['order']
        });
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Error fetching payments' });
    }
};