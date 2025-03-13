import { Product } from "../model/Product";

export const createProduct = async (name: string, description: string, price: number, category: string) => {
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    await product.save();
    return product;
};

export const getProducts = async () => {
    return await Product.find();
};