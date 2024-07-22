import customError from "../utils/customError.js";
import response from "../utils/response.js";

import Todo from "../models/todo.js";

export const createTodo = async (req, res) => {
	const { title, description } = req.body;

	// Checking all the fields are present
	if (!title || !description) {
		return customError({
			res,
			status: 400,
			message: "title, and description are required",
		});
	}
	try {
		const highestOrderTodo = await Todo.findOne().sort("-order");
		const newOrder = highestOrderTodo ? highestOrderTodo.order + 1 : 1;

		const todo = await Todo.create({
			title,
			description,
			order: newOrder,
			userId: req.user._id,
		});

		// Sending response
		response({
			res,
			status: 201,
			message: "Todo created successfully",
			data: { todo },
		});
	} catch (error) {
		console.log("Error in create todo: ");
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

export const getTodos = async (req, res) => {
	try {
		const todo = await Todo.find({
			userId: req.user._id,
			status: "todo",
		}).sort("order");
		const inProgressTodo = await Todo.find({
			userId: req.user._id,
			status: "in progress",
		}).sort("order");
		const doneTodo = await Todo.find({
			userId: req.user._id,
			status: "done",
		}).sort("order");

		// Sending response
		response({
			res,
			status: 200,
			message: "Todo's fetched successfully",
			data: { todo, inProgressTodo, doneTodo },
		});
	} catch (error) {
		console.log("Error in get todo: ");
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

export const getTodo = async (req, res) => {
	const { id } = req.params;

	console.log("Request ");

	try {
		const todo = await Todo.findOne({ _id: id, userId: req.user._id });

		if (!todo) {
			return customError({
				res,
				status: 404,
				message: "Todo not found",
			});
		}

		// Sending response
		response({
			res,
			status: 200,
			message: "Todo fetched successfully",
			data: { todo },
		});
	} catch (error) {
		console.log("Error in get todo: ");
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

export const updateTodo = async (req, res) => {
	const { id } = req.params;
	const { title, description, order } = req.body;

	// Checking all the fields are present
	if (!title || !description || !order) {
		return customError({
			res,
			status: 400,
			message: "title, description, and order are required",
		});
	}

	try {
		const todo = await Todo.findOne({ _id: id, userId: req.user._id });

		if (!todo) {
			return customError({
				res,
				status: 404,
				message: "Todo not found",
			});
		}

		todo.title = title;
		todo.description = description;
		todo.order = order;

		await todo.save();

		// Sending response
		response({
			res,
			status: 200,
			message: "Todo updated successfully",
			data: { todo },
		});
	} catch (error) {
		console.log("Error in update todo: ");
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

export const deleteTodo = async (req, res) => {
	const { id } = req.params;

	try {
		const todo = await Todo.findOne({ _id: id, userId: req.user._id });

		if (!todo) {
			return customError({
				res,
				status: 404,
				message: "Todo not found",
			});
		}

		await Todo.deleteOne({ _id: id });

		// Sending response
		response({
			res,
			status: 200,
			message: "Todo deleted successfully",
		});
	} catch (error) {
		console.log("Error in delete todo: ");
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};
