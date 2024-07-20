import { Router } from "express";
import { register, login, logout } from "../controllers/auth.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isLoggedIn, logout);

export default router;
