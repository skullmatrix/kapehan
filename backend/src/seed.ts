import { AppDataSource } from "./data-source";
import { Product } from "./entity/Product";
import { OrderType } from "./entity/OrderType";
import { PaymentType } from "./entity/PaymentType";

async function seedDatabase() {
    const orderTypeRepository = AppDataSource.getRepository(OrderType);
    const paymentTypeRepository = AppDataSource.getRepository(PaymentType);
    const productRepository = AppDataSource.getRepository(Product);

    // Seed OrderTypes
    const orderTypes = [
        { name: "For Here" },
        { name: "To Go" },
    ];

    for (const orderType of orderTypes) {
        const existingOrderType = await orderTypeRepository.findOneBy({ name: orderType.name });
        if (!existingOrderType) {
            await orderTypeRepository.save(orderType);
            console.log(`✅ OrderType '${orderType.name}' seeded successfully!`);
        } else {
            console.log(`⚠️ OrderType '${orderType.name}' already exists. Skipping...`);
        }
    }

    // Seed PaymentTypes
    const paymentTypes = [
        { name: "Pay at the Cashier" },
        { name: "Pay Online" },
    ];

    for (const paymentType of paymentTypes) {
        const existingPaymentType = await paymentTypeRepository.findOneBy({ name: paymentType.name });
        if (!existingPaymentType) {
            await paymentTypeRepository.save(paymentType);
            console.log(`✅ PaymentType '${paymentType.name}' seeded successfully!`);
        } else {
            console.log(`⚠️ PaymentType '${paymentType.name}' already exists. Skipping...`);
        }
    }

    // Seed Products
    const products = [
        { name: "Hot Coffee", category: "Hot", price: 100, rating: 4.5, image: "/images/hot-coffee.jpg", desc: "A classic hot coffee" },
        { name: "Iced Coffee", category: "Cold", price: 120, rating: 4.7, image: "/images/iced-coffee.jpg", desc: "Refreshing iced coffee" },
        { name: "Croissant", category: "Pastry", price: 80, rating: 4.3, image: "/images/croissant.jpg", desc: "Freshly baked croissant" },
    ];

    for (const product of products) {
        const existingProduct = await productRepository.findOneBy({ name: product.name });
        if (!existingProduct) {
            await productRepository.save(product);
            console.log(`✅ Product '${product.name}' seeded successfully!`);
        } else {
            console.log(`⚠️ Product '${product.name}' already exists. Skipping...`);
        }
    }
}

export { seedDatabase };