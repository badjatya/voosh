import bcrypt from "bcryptjs";

import User from "../models/user.js";
import customError from "../utils/customError.js";
import response from "../utils/response.js";

export const register = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	// Checking all the fields are present
	if (!firstName || !lastName || !email || !password) {
		return customError({
			res,
			status: 400,
			message: "firstName, lastName, email and password are required",
		});
	}

	try {
		// Checking user already exist or not
		const isUserExit = await User.findOne({ email });
		if (isUserExit !== null) {
			return customError({
				res,
				status: 401,
				message: "User already exists, please login",
			});
		}

		// Hashing password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Creating new user
		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			type: "email",
		});

		// Valid user, creating jwt token
		const token = await user.getJwtLoginToken();

		// Sending a cookie
		res.cookie("token", token, {
			expire: new Date(
				Date.now() * process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
		});

		// Sending response
		response({
			res,
			status: 200,
			message: "User created successfully",
			data: { user, token },
		});
	} catch (error) {
		console.log("Error in register: ");
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	// Checking all the fields are present
	if (!email || !password) {
		return customError({
			res,
			status: 400,
			message: "email and password are required",
		});
	}

	try {
		// Checking user already exist or not
		const user = await User.findOne({ email });
		if (!user) {
			return customError({
				res,
				status: 401,
				message: "User not found, please register",
			});
		}

		// Checking password is correct or not
		const isPasswordCorrect = await user.isValidPassword(password);
		if (!isPasswordCorrect) {
			return customError({
				res,
				status: 401,
				message: "Invalid email or password",
			});
		}

		// Valid user, creating jwt token
		const token = await user.getJwtLoginToken();

		// Sending a cookie
		res.cookie("token", token, {
			expire: new Date(
				Date.now() * process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
		});

		// Deleting password from user object
		user.password = undefined;
		user.createdAt = undefined;
		user.updatedAt = undefined;
		user.__v = undefined;

		// Sending response
		response({
			res,
			status: 200,
			message: "User logged in successfully",
			data: { user, token },
		});
	} catch (error) {
		console.log("Error in login: ");
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	response({
		res,
		status: 200,
		message: "User logged out successfully",
	});
};
