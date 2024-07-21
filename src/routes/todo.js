import { Router } from "express";
import {
	createTodo,
	getTodos,
	getTodo,
	updateTodo,
	deleteTodo,
} from "../controllers/todo.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = Router();

router.post("/", isLoggedIn, createTodo);
router.get("/:id", isLoggedIn, getTodo);

router.get("/", isLoggedIn, getTodos);
router.patch("/:id", isLoggedIn, updateTodo);
router.delete("/:id", isLoggedIn, deleteTodo);

export default router;
