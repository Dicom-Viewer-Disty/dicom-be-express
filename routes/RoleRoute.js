import express from "express";
import { createRole, deleteRole, getRole, getRoleById, updateRole } from "../controllers/Roles.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/role", verifyUser, getRole);
router.get("/role/:id", verifyUser, getRoleById);
router.post("/role", adminOnly, verifyUser, createRole);
router.patch("/role/:id", verifyUser, updateRole);
router.delete("/role/:id", verifyUser, deleteRole);

export default router;
