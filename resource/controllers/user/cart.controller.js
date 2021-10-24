const users = require("../../models/user.model");

class Cart {
	async addCart(req, res, next) {
		const id = req.params.id;
		const { quantity, name, img, price, slug } = req.body;
		const user = await users.findById(req.app.locals.userCurrent);
		const itemIndex = user.carts.findIndex((item) => item.product == id);
		if (itemIndex > -1) {
			user.carts[itemIndex].quantity += parseInt(quantity);
		} else {
			user.carts.unshift({
				product: id,
				quantity,
				name,
				img,
				price,
				slug,
			});
		}
		users
			.findByIdAndUpdate(user._id, { carts: user.carts }, { new: true })
			.then((user) => {
				res.app.locals.userCurrent = user;
				res.redirect(`/${slug}?isAdd=true`);
			});
	}

	async getCart(req, res, next) {
		let message = req.query.isUpdate ? "Thay đổi giỏ hàng thành công" : "";
		message = req.query.isDelete
			? "Xóa sản phẩm khỏi giỏ hành thành công"
			: message;
		const user = await users.findById(req.app.locals.userCurrent).populate({
			path: "carts",
			populate: { path: "product" },
		});
		res.render("user/cart.pug", { user, message });
	}

	async deleteCart(req, res, next) {
		const id = req.params.id;
		const user = await users.findById(req.app.locals.userCurrent);
		const itemIndex = user.carts.findIndex((item) => item.product == id);
		user.carts.splice(itemIndex, 1);
		users
			.findByIdAndUpdate(user._id, { carts: user.carts }, { new: true })
			.then((user) => {
				res.app.locals.userCurrent = user;
				res.redirect("/cart?isDelete=true");
			});
	}
	async updateCart(req, res, next) {
		try {
			let quantity = [];
			let active = [];
			for (let i in req.body) {
				if (i.split("-")[0] == "active") {
					active.push(i.split("-")[1]);
				}
				if (i.split("-")[0] == "quantity") {
					quantity.push(req.body[i]);
				}
			}
			const user = await users.findById(req.app.locals.userCurrent);
			user.carts.forEach((item, index) => {
				item.isActive = active.includes(String(item.product));
				item.quantity = quantity[index];
			});
			const usersUpdate = await users.findByIdAndUpdate(
				user._id,
				{ carts: user.carts },
				{ new: true }
			);
			res.redirect("/cart?isUpdate=true");
		} catch (error) {
			console.log(error);
			res.json("loi sv update cart");
		}
	}

	async updateCartBuy(req, res, next) {
		try {
			let quantity = [];
			let active = [];
			for (let i in req.body) {
				if (i.split("-")[0] == "active") {
					active.push(i.split("-")[1]);
				}
				if (i.split("-")[0] == "quantity") {
					quantity.push(req.body[i]);
				}
			}
			const user = await users.findById(req.app.locals.userCurrent);
			user.carts.forEach((item, index) => {
				item.isActive = active.includes(String(item.product));
				item.quantity = quantity[index];
			});
			const usersUpdate = await users.findByIdAndUpdate(
				user._id,
				{ carts: user.carts },
				{ new: true }
			);
			const total = user.carts.reduce((total, item) => {
				if (item.isActive) {
					return (total += item.price * item.quantity);
				} else return total;
			}, 0);
			res.render("user/pay", { user, total });
		} catch (error) {
			console.log(error);
			res.json("loi sv update cart buy");
		}
	}
}

module.exports = new Cart();
