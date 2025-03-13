import { Order } from "../model/Order";
import { Customer } from "../model/Customer";
import { Product } from "../model/Product";
import { OrderItem } from "../model/OrderItem";

export const createOrder = async (customerId: number, productIds: number[], quantities: number[]) => {
    const customer = await Customer.findOneBy({ id: customerId });
    if (!customer) throw new Error("Customer not found");

    const order = new Order();
    order.customer = customer;
    order.order_date = new Date();
    order.total_amount = 0;
    order.status = "Pending";

    const orderItems = [];
    for (let i = 0; i < productIds.length; i++) {
        const product = await Product.findOneBy({ id: productIds[i] });
        if (!product) continue;

        const orderItem = new OrderItem();
        orderItem.product = product;
        orderItem.quantity = quantities[i];
        orderItem.price = product.price * quantities[i];
        orderItems.push(orderItem);
        order.total_amount += orderItem.price;
    }

    order.orderItems = orderItems;
    await order.save();
    return order;
};

export const getOrders = async () => {
    return await Order.find({ relations: ["customer", "orderItems.product"] });
};