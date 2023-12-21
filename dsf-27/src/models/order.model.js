import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

	code: {
		type: String,
		unique: true,
		required: true,
	},
	purchase_datetime: {
		type: Date,
		default: Date.now,
	},
	amount: {
		type: Number,
		required: true,
	},
	purchaser: {
		type: String,
		required: true,
	}

});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;