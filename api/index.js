const express = require("express");
const serverless = require("serverless-http");
const morgan = require("morgan");
const todoRoutes = require("../routes/todos"); // Assuming your todos routes are here

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/todos", todoRoutes);

// Root route (optional)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Todo API on Vercel" });
});

// Export the serverless handler for Vercel
module.exports = serverless(app);
// Vercel expects `handler` to be the serverless function
