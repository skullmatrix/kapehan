import { Customer } from "../model/Customer";

export const createCustomer = async (name: string) => {
    const customer = new Customer();
    customer.name = name;
    await customer.save();
    return customer;
};

export const getCustomers = async () => {
    return await Customer.find();
};