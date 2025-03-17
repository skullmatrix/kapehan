import { Product } from "../entity/Product";
import { OrderType } from "../entity/OrderType";
import { PaymentType } from "../entity/PaymentType";
import { Invoice } from "../entity/Invoice";
import { AppDataSource } from "../data-source";

export class ProductService {
    private productRepository = AppDataSource.getRepository(Product);
    private orderTypeRepository = AppDataSource.getRepository(OrderType);
    private paymentTypeRepository = AppDataSource.getRepository(PaymentType);
    private invoiceRepository = AppDataSource.getRepository(Invoice);

    async getAllProducts() {
        return await this.productRepository.find();
    }

    async getAllOrderTypes() {
        return await this.orderTypeRepository.find();
    }

    async getAllPaymentTypes() {
        return await this.paymentTypeRepository.find();
    }

    async createOrder(orderData: any) {
        // Implement order creation logic here
        return { id: 1, ...orderData }; // Placeholder
    }

    async createInvoice(invoiceData: any) {
        const invoice = new Invoice();
        invoice.orderNumber = invoiceData.orderNumber;
        invoice.customerName = invoiceData.customerName;
        invoice.orderDate = new Date();
        invoice.total = invoiceData.total;
        invoice.tax = invoiceData.tax;
        invoice.grandTotal = invoiceData.grandTotal;

        // Fetch OrderType and PaymentType
        const orderType = await this.orderTypeRepository.findOneBy({ id: invoiceData.orderTypeId });
        const paymentType = await this.paymentTypeRepository.findOneBy({ id: invoiceData.paymentTypeId });

        // Handle null cases
        if (!orderType) {
            throw new Error(`OrderType with ID ${invoiceData.orderTypeId} not found`);
        }
        if (!paymentType) {
            throw new Error(`PaymentType with ID ${invoiceData.paymentTypeId} not found`);
        }

        // Assign fetched entities
        invoice.orderType = orderType;
        invoice.paymentType = paymentType;

        return await this.invoiceRepository.save(invoice);
    }
}