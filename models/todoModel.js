const mongoose = require("mongoose");
const TodosSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
const Todos = mongoose.model("Todos", TodosSchema);
module.exports = Todos;