const orders = require("../../models/order.model");
const products = require("../../models/product.model");
const admins = require("../../models/admin.model");
const users = require("../../models/user.model");

class Order {
	index(req, res, next) {
		orders
			.find({})
			.sort({ createdAt: -1 })
			.then((orders) => res.render("admin/order/index", { orders }))
			.catch((err) => console.error(err));
	}

	async detail(req, res, next) {
		const id = req.params.id;
		const admin = await admins.findById(req.app.locals.adminCurrent);
		const notice = admin.notifications.map((item) => {
			if (item.order == id) {
				item.isWatched = true;
				return item;
			} else return item;
		});
		const adminUpdate = await admins.findByIdAndUpdate(
			req.app.locals.adminCurrent,
			{ notifications: notice }
		);
		orders
			.findById(id)
			.populate({
				path: "products",
				populate: { path: "product" },
			})
			.then((order) => res.render("admin/order/detail", { order }));
	}

	async confirm(req, res, next) {
		const id = req.params.id;
		let order = await orders.findByIdAndUpdate(
			id,
			{ isConfirmed: true },
			{ new: true }
		);

		// Cập nhật số lượng sản phẩm sau khi xác nhận đơn hàng
		const data = await Promise.all(
			order.products.map((product) => {
				return products.findByIdAndUpdate(
					product.product,
					{
						$inc: { quantity: -product.quantity, sold: product.quantity },
					},
					{ new: true }
				);
			})
		);
		order = await orders.findById(id).populate({
			path: "products",
			populate: { path: "product" },
		});

		// Tìm user để thêm thông báo
		const user = await users.findById(order.user);
		user.notifications.push({
			title: "Đơn hàng đã được xác nhận",
		});
		const userUpdate = await users.findByIdAndUpdate(order.user, {
			notifications: user.notifications,
		});
		res.render("admin/order/detail", { order });
	}
}

module.exports = new Order();
