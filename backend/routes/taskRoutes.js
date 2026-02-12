import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/taskController.js";
import { verifyUserAuth } from "../middlewares/userAuth.js";

const router = express.Router();

router.use(verifyUserAuth); // Protect all task routes

router.post("/create", createTask);
router.get("/all", getAllTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
