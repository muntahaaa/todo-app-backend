const todoModel = require("../models/todoModel");

async function getAllTodos(req, res) {
    const userId = req.user.id;
    try {
        const result = await todoModel.getTodosByUserId(userId);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("GET /todos error:", err);
        res.status(500).send("Internal server error");
    }
}

async function getTodoById(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const result = await todoModel.getTodoByIdAndUserId(id, userId);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(`GET /todos/${id} error:`, err);
        res.status(500).send("Internal server error");
    }
}

async function createTodo(req, res) {
    const { title, description } = req.body;
    const userId = req.user.id;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    try {
        const result = await todoModel.createTodo(title, description, userId);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("POST /todos error:", err);
        res.status(500).send("Internal server error");
    }
}

async function updateTodoById(req, res) {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    const userId = req.user.id;
    if (!title || !description || typeof isCompleted !== "boolean") {
        return res.status(400).json({
            message: "Title, description, and is_completed (boolean) are required"
        });
    }
    try {
        const result = await todoModel.updateTodoByIdAndUserId(id, title, description, isCompleted, userId);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(`PUT /todos/${id} error:`, err);
        res.status(500).send("Internal server error");
    }
}

async function deleteTodoById(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const result = await todoModel.deleteTodoByIdAndUserId(id, userId);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted", todo: result.rows[0] });
    } catch (err) {
        console.error(`DELETE /todos/${id} error:`, err);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodoById,
    deleteTodoById,
};