const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const category = require("./category.model");
const band = require("./band.model");

const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const ProductSchema = new Schema(
	{
		name: { type: String, require: true },
		desc: { type: String, default: "Đang được cập nhật" },
		img: { type: Array },
		price: { type: Number },
		quantity: { type: Number, default: 0 },
		sold: { type: Number, default: 0 },
		ingredient: { type: String, default: "Đang được cập nhật" },
		userManual: { type: String, default: "Đang được cập nhật" },
		origin: { type: String },
		slug: { type: String, slug: "name", unique: true },
		category: {
			type: ObjectId,
			ref: category,
		},
		band: {
			type: ObjectId,
			ref: band,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
