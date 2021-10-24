const jwt = require("jsonwebtoken");

const admins = require("../../models/admin.model");

class Admin {
	index(req, res, next) {
		res.render("admin/index");
	}

	getLogin(req, res, next) {
		res.render("admin/login");
	}

	async postLogin(req, res, next) {
		const phone = req.body.phone;
		const password = req.body.password;
		const err = [];

		const admin = await admins.findOne({ phone: phone });
		if (!admin) {
			res.render("admin/login", { message: "Không tìm thấy người dùng" });
			return;
		}
		if (password !== admin.password) {
			res.render("admin/login", { message: "Sai mật khẩu" });
			return;
		}
		const accessToken = jwt.sign(
			{
				id: admin._id,
				name: admin.name,
			},
			process.env.ACCESS_TOKEN_SECRET_KEY
		);

		res.cookie("accessToken", accessToken);
		res.app.locals.adminCurrent = admin;
		res.redirect("/admin/order");
	}

	logout(req, res, next) {
		res.app.locals.adminCurrent = "";
		res.redirect("/admin");
	}
}

module.exports = new Admin();
