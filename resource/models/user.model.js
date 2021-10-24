const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const product = require("./product.model");

const UserSchema = new Schema({
	name: { type: String, require: true },
	phone: { type: String, default: "" },
	userName: { type: String, unique: true },
	password: { type: String, require: true },
	address: { type: String, default: "" },
	gender: { type: Boolean, default: true },
	notifications: [
		{
			title: { type: String },
			isWatch: { type: Boolean, default: false },
			createdAt: { type: Date, default: Date.now },
		},
	],
	carts: [
		{
			product: { type: ObjectId, ref: product },
			quantity: { type: Number },
			price: { type: Number },
			img: { type: String },
			name: { type: String },
			slug: { type: String },
			isActive: { type: Boolean, default: false },
		},
	],
});

module.exports = mongoose.model("user", UserSchema);
