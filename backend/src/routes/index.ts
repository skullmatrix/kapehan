import express from "express";
import { createCustomer, getCustomers } from "../controllers/CustomerController";
import { createProduct, getProducts } from "../controllers/ProductController";
import { createOrder, getOrders } from "../controllers/OrderController";  // ✅ Ensure this file exists
import { createPayment, getPayments } from "../controllers/PaymentController"; // ✅ Ensure this file exists

const router = express.Router();

router.post("/customers", createCustomer);
router.get("/customers", getCustomers);

router.post("/products", createProduct);
router.get("/products", getProducts);

router.post("/orders", createOrder);  // ✅ Should work after fixes
router.get("/orders", getOrders);

router.post("/payments", createPayment); // ✅ Should work after fixes
router.get("/payments", getPayments);

export default router;
    