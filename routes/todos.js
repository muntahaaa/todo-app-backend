const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos ORDER BY created_at DESC");

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("GET /todos error:", err);
    res.status(500).send("Internal server error");
  }
});

// GET single todo
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM todos WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(`GET /todos/${id} error:`, err);
    res.status(500).send("Internal server error");
  }
});

// POST create a todo
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /todos error:", err);
    res.status(500).send("Internal server error");
  }
});

// PUT update a todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, is_completed } = req.body;

  if (!title || !description || typeof is_completed !== "boolean") {
    return res.status(400).json({
      message: "Title, description, and is_completed (boolean) are required"
    });
  }

  try {
    const result = await db.query(
      `UPDATE todos
       SET title = $1, description = $2, is_completed = $3
       WHERE id = $4
       RETURNING *`,
      [title, description, is_completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(`PUT /todos/${id} error:`, err);
    res.status(500).send("Internal server error");
  }
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted", todo: result.rows[0] });
  } catch (err) {
    console.error(`DELETE /todos/${id} error:`, err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
