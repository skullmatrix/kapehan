import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async getProducts(req: Request, res: Response) {
        const products = await this.productService.getAllProducts();
        res.json(products);
    }

    async getOrderTypes(req: Request, res: Response) {
        const orderTypes = await this.productService.getAllOrderTypes();
        res.json(orderTypes);
    }

    async getPaymentTypes(req: Request, res: Response) {
        const paymentTypes = await this.productService.getAllPaymentTypes();
        res.json(paymentTypes);
    }

    async createOrder(req: Request, res: Response) {
        const order = await this.productService.createOrder(req.body);
        res.json(order);
    }

    async createInvoice(req: Request, res: Response) {
        const invoice = await this.productService.createInvoice(req.body);
        res.json(invoice);
    }
}
