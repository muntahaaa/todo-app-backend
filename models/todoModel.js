const db = require("../config/db");

async function getTodosByUserId(userId) {
    return db.query("SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
}

async function getTodoByIdAndUserId(id, userId) {
    return db.query("SELECT * FROM todos WHERE id = $1 AND user_id = $2", [id, userId]);
}

async function createTodo(title, description, userId) {
    return db.query("INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3) RETURNING *", [title, description, userId]);
}

async function updateTodoByIdAndUserId(id, title, description, isCompleted, userId) {
    return db.query("UPDATE todos SET title = $1, description = $2, is_completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *", [title, description, isCompleted, id, userId]);
}

async function deleteTodoByIdAndUserId(id, userId) {
    return db.query("DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);
}

module.exports = {
    getTodosByUserId,
    getTodoByIdAndUserId,
    createTodo,
    updateTodoByIdAndUserId,
    deleteTodoByIdAndUserId,
};