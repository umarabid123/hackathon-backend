const mongoose = require("mongoose");
const TodosSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	name:{
		type:String
},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	date: {
		type: String,
	},
	category: {
		type: String,
		enum: ["games", "movies", "sports", "music"], // Example of visibility values
		default: "all",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	visibility: {
		type: String,
		enum: ["public", "private", "restricted"], // Example of visibility values
		default: "public", // Default visibility
	},
});
const Todos = mongoose.model("Todos", TodosSchema);
module.exports = Todos;
