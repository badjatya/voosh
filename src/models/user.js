import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
			trim: true,
			lowercase: true,
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
			trim: true,
			lowercase: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			lowercase: true,
			unique: [true, "Email already exists"],
			validator: validator.isEmail,
		},
		password: {
			type: String,
		},
		type: {
			type: String,
			enum: ["email", "google"],
			default: "email",
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{ timestamps: true }
);

// Hashing Password
userSchema.pre("save", async function (next) {
	if (this.isModified("password" && this.type === "email")) {
		this.password = bcrypt.hash(this.password, 10);
	}
	next();
});

// Getting jwt login token
userSchema.methods.getJwtLoginToken = async function () {
	const token = jwt.sign(
		{
			id: this._id,
		},
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: process.env.JWT_EXPIRY,
		}
	);

	this.tokens = this.tokens.concat({ token });
	await this.save();
	return token;
};

// Checking is valid password
userSchema.methods.isValidPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
