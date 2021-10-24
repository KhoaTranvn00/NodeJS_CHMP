const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const user = require("./user.model");
const product = require("./product.model");

const Orderchema = new Schema(
	{
		user: { type: ObjectId, ref: user },
		name: { type: String },
		phone: { type: String },
		address: { type: String },
		total: { type: Number },
		products: [
			{
				product: { type: ObjectId, ref: product },
				quantity: { type: Number },
				price: { type: Number },
				img: { type: String },
				name: { type: String },
				slug: { type: String },
			},
		],
		isConfirmed: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("order", Orderchema);
