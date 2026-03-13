import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validate(createUserSchema), createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
