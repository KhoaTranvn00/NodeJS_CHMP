const users = require("../../models/user.model");

class User {
	getRegister(req, res, next) {
		res.render("user/authen/register", { values: {} });
	}

	async postRegister(req, res, next) {
		const user = await users.findOne({ userName: req.body.userName });
		if (user) {
			res.render("user/authen/register", {
				values: req.body,
				isSuccess: false,
				messageAlert: "Tên tài khoản đã tồn tại",
			});
		}
		if (req.body.password !== req.body.rePassword) {
			res.render("user/authen/register", {
				values: req.body,
				isSuccess: false,
				messageAlert: "Mật khẩu không khớp",
			});
		}
		users.create(req.body).then(() => {
			res.render("user/authen/register", {
				values: req.body,
				isSuccess: true,
				messageAlert: "Tạo tài khoản thành công",
			});
		});
	}

	getLogin(req, res, next) {
		res.render("user/authen/login", { values: {} });
	}

	async postLogin(req, res, next) {
		const user = await users.findOne({ userName: req.body.userName });
		if (!user) {
			res.render("user/authen/login", {
				values: req.body,
				isSuccess: false,
				messageAlert: "Tên tài khoản không tồn tại",
			});
		}
		if (req.body.password !== user.password) {
			res.render("user/authen/login", {
				values: req.body,
				isSuccess: false,
				messageAlert: "Mật khẩu không đúng",
			});
		}
		res.app.locals.userCurrent = user;
		res.redirect("/");
	}

	getLogout(req, res) {
		res.app.locals.userCurrent = "";
		res.redirect("/");
	}

	async getUser(req, res) {
		const user = await users.findById(req.app.locals.userCurrent);
		res.render("user/authen/user", { user });
	}

	async patchUser(req, res) {
		const user = await users.findByIdAndUpdate(
			req.app.locals.userCurrent,
			req.body,
			{ new: true }
		);
		req.app.locals.userCurrent = user;
		res.render("user/authen/user", {
			user,
			isSuccess: true,
			messageAlert: "Cập nhật thông tin thành công",
		});
	}
}

module.exports = new User();
