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
			return customError(res, 401, "User already exists, please login");
		}

		// Creating new user
		const user = new User({
			firstName,
			lastName,
			email,
			password,
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
		return customError(res, 500, "Internal server error");
	}
};
