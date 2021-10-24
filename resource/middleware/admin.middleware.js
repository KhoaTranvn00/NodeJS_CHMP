const admins = require("../models/admin.model");

class adminMiddleware {
	async authentication(req, res, next) {
		if (req.app.locals.adminCurrent) {
			// const admin = await admins
			// 	.findById(req.app.locals.adminCurrent)
			// 	.populate({
			// 		path: "notifications",
			// 		options: { sort: { createdAt: -1 } },
			// 	});
			const admin = await admins
				.findById(req.app.locals.adminCurrent)
				.populate({
					path: "notifications",
					options: { sort: { createdAt: -1 } },
				});
			res.app.locals.unreadNotice = admin.notifications.reduce(
				(sum, notice) => (!notice.isWatched ? ++sum : sum),
				0
			);
			req.app.locals.adminCurrent = admin;
			next();
		} else res.render("admin/login");
	}

	alreadyAuthenticated(req, res, next) {
		if (!req.app.locals.adminCurrent) {
			next();
		} else res.render("admin");
	}
}

module.exports = new adminMiddleware();
