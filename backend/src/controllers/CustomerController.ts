import { Request, Response } from 'express';
import { db } from '../helpers/database';
import { Customer } from '../model/Customer';

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const customerRepo = db.getRepository(Customer);
        const customer = customerRepo.create(req.body);
        const result = await customerRepo.save(customer);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Error creating customer' });
    }
};

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await db.getRepository(Customer).find();
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Error fetching customers' });
    }
};