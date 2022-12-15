import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/user", verifyUser, getUsers);
router.get("/user/:id", verifyUser, getUserById);
router.post("/user", createUser);
router.patch("/user/:id", verifyUser, updateUser);
router.delete("/user/:id", verifyUser, deleteUser);

export default router;
