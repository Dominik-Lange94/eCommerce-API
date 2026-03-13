import { Router } from "express";
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../controllers/order.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createOrderSchema, updateOrderSchema } from "../schemas/order.schema.js";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", validate(createOrderSchema), createOrder);
router.put("/:id", validate(updateOrderSchema), updateOrder);
router.delete("/:id", deleteOrder);

export default router;
