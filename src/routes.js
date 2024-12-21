import express from "express"; // Import the login controller
import { registerUser } from "./register.js";
import { loginUser } from "./login.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

export default router;
