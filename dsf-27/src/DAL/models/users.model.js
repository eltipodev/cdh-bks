import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
	password: {
		type: String,
	},
	age: {
		type: Number,
	},
	isGitHub: {
		type: Boolean,
		default: false
	},
	rol: {
		type: String,
		enum: ["ADMIN", "USER", "PREMIUM"],
		default: "USER"
	}
	,
	token: {
		type: String,
		default: ""
	}
	,
	cart: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "carts",
		required: true
	}
});
export const userModel = mongoose.model("Users", usersSchema);
