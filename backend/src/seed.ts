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
    await orderTypeRepository.save(orderTypes);
    console.log("OrderTypes seeded successfully!");

    // Seed PaymentTypes
    const paymentTypes = [
        { name: "Pay at the Cashier" },
        { name: "Pay Online" },
    ];
    await paymentTypeRepository.save(paymentTypes);
    console.log("PaymentTypes seeded successfully!");

    // Seed Products
    const products = [
        { name: "Hot Coffee", category: "Hot", price: 100, rating: 4.5, image: "/images/hot-coffee.jpg", desc: "A classic hot coffee" },
        { name: "Iced Coffee", category: "Cold", price: 120, rating: 4.7, image: "/images/iced-coffee.jpg", desc: "Refreshing iced coffee" },
        { name: "Croissant", category: "Pastry", price: 80, rating: 4.3, image: "/images/croissant.jpg", desc: "Freshly baked croissant" },
    ];
    await productRepository.save(products);
    console.log("Products seeded successfully!");
}

export { seedDatabase };