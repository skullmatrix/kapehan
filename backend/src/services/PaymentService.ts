import { Payment } from "../model/Payment";
import { Order } from "../model/Order";

export const createPayment = async (orderId: number, amount: number, paymentMethod: string) => {
    const order = await Order.findOneBy({ id: orderId });
    if (!order) throw new Error("Order not found");

    const payment = new Payment();
    payment.order = order;
    payment.amount = amount;
    payment.payment_method = paymentMethod;
    payment.payment_date = new Date();
    payment.status = "Completed";
    await payment.save();

    order.status = "Paid";
    await order.save();

    return payment;
};

export const getPayments = async () => {
    return await Payment.find({ relations: ["order"] });
};