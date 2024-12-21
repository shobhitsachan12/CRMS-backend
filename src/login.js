import mongoose from "mongoose";
import { UserSchema } from "./userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = mongoose.model("User", UserSchema);

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Compare the entered password with the stored (hashed) password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a JWT token (using a secret key from environment variables)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Make sure to store your secret key in .env
      { expiresIn: "1h" } // Token will expire in 1 hour
    );

    // Respond with a success message and the JWT token
    res.status(200).json({
      message: "Login successful",
      token, // Send the token back to the client
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
