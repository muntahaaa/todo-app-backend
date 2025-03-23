const express = require("express");
const serverless = require("serverless-http");
const morgan = require("morgan");

const todoRoutes = require("../routes/todos");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/todos", todoRoutes);

// Root route (optional)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Todo API on Vercel" });
});

// Export the handler for Vercel
module.exports = app;
module.exports.handler = serverless(app);
