import Joi from "joi";

export const customerSchema = Joi.object({
    name: Joi.string().required(),
});

export const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
});

export const orderSchema = Joi.object({
    customerId: Joi.number().required(),
    productIds: Joi.array().items(Joi.number()).required(),
    quantities: Joi.array().items(Joi.number()).required(),
});

export const paymentSchema = Joi.object({
    orderId: Joi.number().required(),
    amount: Joi.number().required(),
    paymentMethod: Joi.string().required(),
});