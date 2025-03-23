const express = require("express");
const serverless = require("serverless-http");
const morgan = require("morgan");
const pool = require("../config/db")

const todoRoutes = require("../routes/todos");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/todos", todoRoutes);

// Root route (optional)
app.get("/", async(req, res) => {
    try{
        res.json({ message: "Welcome to the Todo API on Vercel" });
    }catch (err) {
        console.error("Error in /api/todos:", err);
        res.status(500).json({ error: "Something went wrong!" });
      }
 
});


module.exports = serverless(app);
