// Define the User schema (same as before)
import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});
