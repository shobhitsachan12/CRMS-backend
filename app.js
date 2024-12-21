import express from "express";
import cors from "cors";
import router from "./src/routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

// const corsOptions = {
//   origin: ["http://localhost:3000"], // Only allow these domains
//   methods: ["GET", "POST", "PUT"], // Allow specific methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
// };

app.use(express.json());
app.use(cors());
app.use("/", router);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

const PORT = 3001;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

app.get("/", (req, res) => {
  res.send("hello world");
});
