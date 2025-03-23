const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     description: Retrieves all the todos in the list.
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *                   example:
 *                     - id: 1
 *                       title: "Buy groceries"
 *                       description: "Buy milk and eggs."
 *                       completed: false
 *                     - id: 2
 *                       title: "Clean the house"
 *                       description: "Vacuum and dust the living room."
 *                       completed: true
 */
router.get("/", todoController.getAllTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a specific todo by ID
 *     description: Retrieves the details of a specific todo item by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the todo to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single todo item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 example:
 *                   id: 1
 *                   title: "Buy groceries"
 *                   description: "Buy milk and eggs."
 *                   completed: false
 *       404:
 *         description: Todo not found.
 */
router.get("/:id", todoController.getTodoById);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     description: Adds a new todo item to the list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the todo item.
 *               description:
 *                 type: string
 *                 description: A description of the todo item.
 *               completed:
 *                 type: boolean
 *                 description: Status of the todo (whether it's completed).
 *               example:
 *                 title: "Finish homework"
 *                 description: "Complete the math assignment."
 *                 completed: false
 *     responses:
 *       201:
 *         description: Todo successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 example:
 *                   id: 3
 *                   title: "Finish homework"
 *                   description: "Complete the math assignment."
 *                   completed: false
 *       400:
 *         description: Bad request (e.g., invalid input).
 */
router.post("/", todoController.createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a specific todo by ID
 *     description: Updates the details of an existing todo item by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the todo to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the todo item.
 *               description:
 *                 type: string
 *                 description: A description of the todo item.
 *               completed:
 *                 type: boolean
 *                 description: Status of the todo (whether it's completed).
 *               example:
 *                 title: "Finish homework"
 *                 description: "Complete the math assignment."
 *                 completed: true
 *     responses:
 *       200:
 *         description: Todo successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 example:
 *                   id: 3
 *                   title: "Finish homework"
 *                   description: "Complete the math assignment."
 *                   completed: true
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       404:
 *         description: Todo not found.
 */
router.put("/:id", todoController.updateTodoById);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a specific todo by ID
 *     description: Deletes a specific todo item by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the todo to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo successfully deleted.
 *       404:
 *         description: Todo not found.
 */
router.delete("/:id", todoController.deleteTodoById);

module.exports = router;
