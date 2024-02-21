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
		enum: ["ADMIN", "USER", "PREMIUN"],
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
	},
	documents: {
		type: [{
			name: String,
			reference: String,
			status: {
				type: Boolean,
				default: false
			},
		}],
		default: []
	},
	last_connection: {
		type: Date,
		default: null,
	}
});
export const userModel = mongoose.model("Users", usersSchema);
