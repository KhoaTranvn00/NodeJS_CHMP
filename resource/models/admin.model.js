const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = require("./user.model");

const AdminSchema = new Schema({
	name: { type: String },
	phone: { type: String, unique: true },
	userName: { type: String, unique: true },
	password: { type: String },
	address: { type: String },
	gender: { type: Boolean },
	notifications: [
		{
			user: { type: Schema.Types.ObjectId, ref: user },
			title: { type: String },
			createdAt: { type: Date, default: Date.now },
			order: { type: String },
			isWatched: { type: Boolean, default: false },
		},
		{ timestamp: true },
	],
});

module.exports = mongoose.model("admin", AdminSchema);
