const users = require("../models/user.model");

class userMiddleware {
	async authentication(req, res, next) {
		if (req.app.locals.userCurrent) {
			const user = await users.findById(req.app.locals.userCurrent).populate({
				path: "notifications",
				options: { sort: { createdAt: -1 } },
			});
			res.app.locals.unreadNotice = user.notifications.reduce(
				(sum, notice) => (!notice.isWatched ? ++sum : sum),
				0
			);
			req.app.locals.userCurrent = user;
			next();
		} else res.redirect("/user/login");
	}

	alreadyAuthenticated(req, res, next) {
		if (!req.app.locals.userCurrent) {
			next();
		} else res.redirect("/");
	}
}

module.exports = new userMiddleware();
