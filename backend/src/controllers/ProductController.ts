import { Request, Response } from 'express';
import { db } from '../helpers/database';
import { Product } from '../model/Product';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const productRepo = db.getRepository(Product);
        const product = productRepo.create(req.body);
        const result = await productRepo.save(product);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await db.getRepository(Product).find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};