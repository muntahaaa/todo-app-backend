const db = require("../config/db");

async function createUser(username, email, hashedPassword) {
    return db.query("INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)", [username, email, hashedPassword]);
}

async function getUserByEmail(email) {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
}

module.exports = {
    createUser,
    getUserByEmail,
};