const jwt = require("jsonwebtoken");

const users = require("../../models/user.model");
const orders = require("../../models/order.model");
const admins = require("../../models/admin.model");

class Order {
	async addOrder(req, res, next) {
		const user = await users.findById(req.app.locals.userCurrent);
		req.body.user = user._id;
		req.body.products = user.carts.filter((item) => {
			if (item.isActive) return item;
		});
		const order = await orders.create(req.body);
		const notification = {
			user: user._id,
			title: "Ban co don hang moi",
			order: order._id,
		};
		const adminList = await admins.updateMany(
			{},
			{ $push: { notifications: notification } }
		);
		res.render("user/afterPay.pug");
	}

	async getOrder(req, res, next) {
		const user = await users.findById(req.app.locals.userCurrent);
		const orderList = await orders
			.find({ user: user._id })
			.sort({ createdAt: -1 });
		const message = req.query.isDelete ? "Xóa thành công" : "";
		res.render("user/order.pug", { orderList, message });
	}

	async detailOrder(req, res, next) {
		const user = await users.findById(req.app.locals.userCurrent);
		const orderList = await orders
			.find({ user: user._id })
			.sort({ createdAt: -1 });
		const id = req.params.id;
		const order = await orders.findById(id);
		res.render("user/order.pug", { orderList, order });
	}

	async deleteOrder(req, res, next) {
		const user = await users.findById(req.app.locals.userCurrent);
		const id = req.params.id;
		const order = await orders.findById(id);
		if (!order.isConfirmed) {
			const orderDelete = await orders.findByIdAndRemove(id, { new: true });
		}
		res.redirect("/order?isDelete=true");
	}
}

module.exports = new Order();
