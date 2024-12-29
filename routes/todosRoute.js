
const {deleteTodos,updateTodos,createTodos,fetchTodos,getByOneId} = require("../controller/todosController");
var express = require("express");
const authVerify = require("../middleware/authMiddleware");
var todosRoute = express.Router()
todosRoute.get("/", fetchTodos);

todosRoute.get("/:id", authVerify,getByOneId);
todosRoute.post("/create",createTodos);
todosRoute.put("/update/:id", authVerify,updateTodos);
todosRoute.delete("/delete/:id", authVerify,deleteTodos);

module.exports = todosRoute;