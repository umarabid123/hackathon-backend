const Todos = require("../models/todoModel");

const fetchTodos = async (req, res) => {
	try {
		let todos = await Todos.find();
		res.json({
			data: todos,
			status: "200",
			message: "Todos data retrieved successfully",
		});
	} catch (error) {
		res.json({
			data: [],
			status: "400",
			error: error,
			message: "An error occurred while retrieving todos data",
		});
	}
}

const getByOneId = async (req,res) => {
	try {
		const id = req.params?.id;
		// let todo = await Todos.find({id:id});
		let todo = await Todos.findOne({ id: id });
		res.json({
			data: todo,
			status: "200",
			message: "Todos data retrieved successfully",
		});
	} catch (e) {
		res.json({
			data: [],
			status: "400",
			error: e,
			message: "An error occurred while retrieving todos data",
		});
	}
}


const createTodos = async (req, res) => {
	try {
		let newTodo = new Todos({
			id: req.body?.id,
			name:req?.body?.name,
			title: req.body?.title,
			description: req.body?.description,
			date: req.body?.date,
			category:req?.body?.category,
			visibility: req.body?.visibility
		});
		console.log("newTodo", newTodo);
		
		let output = await newTodo.save();
		console.log("output", output);
		
		res.json({
			data: output,
			status: "success",
		});
	} catch (e) {
		res.json({
			data: [],
			status: "400",
			error: e,
			message: "An error occurred while creating todo",
		});
	}
}


const updateTodos = async (req, res) => {
	try {
		let id = req.params?.id;
		let todo = await Todos.findOneAndUpdate(
			{ id: id },
			{ title: req.body?.title, description: req.body?.description },
			{ new: true }
		);
		res.json({
			data: todo,
			status: "success",
		});
	} catch (e) {
		res.json({
			data: [],
			status: "400",
			error: e,
			message: "An error occurred while updating todo",
		});
	}
}


const deleteTodos =  async (req, res) => {
	try {
		let id = req.params?.id;
		let todo = await Todos.findOneAndDelete({ id: id });
		res.json({
			data: todo,
			status: "200",
			message: "Todo deleted successfully",
		});
	} catch (e) {
		res.json({
			data: [],
			status: "400",
			error: e,
			message: "An error occurred while deleting todo",
		});
	}
}
module.exports = {updateTodos,deleteTodos,createTodos,getByOneId,fetchTodos};