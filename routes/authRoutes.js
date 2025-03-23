const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               example:
 *                 email: "user@example.com"
 *                 password: "password123"
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully registered."
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       500:
 *         description: Internal server error.
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     description: Logs in an existing user with their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               example:
 *                 email: "user@example.com"
 *                 password: "password123"
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the logged-in user.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.OgXjohzkEkrIkwf9Nz6mjdOQ7j1Olxx10d6U9I2p4J0"
 *       401:
 *         description: Unauthorized (e.g., invalid credentials).
 *       500:
 *         description: Internal server error.
 */
router.post("/login", authController.login);

module.exports = router;
