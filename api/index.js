const express = require("express");
const serverless = require("serverless-http");
const morgan = require("morgan");
const todoRoutes = require("../routes/todos"); // Assuming your todos routes are here
const pool = require("../config/db");
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/todos", todoRoutes);

// Root route (optional)
app.get("/", async (req, res) => {
    try {
      res.json({ message: "Welcome to the Todo API on Vercel" });
    } catch (err) {
      console.error("Error in / route:", err);
      res.status(500).json({ error: "Something went wrong!" });
    }
  });



module.exports = serverless(app);

