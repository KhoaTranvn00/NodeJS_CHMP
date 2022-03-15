const adminRouter = require("./admin/index.route");
const userRouter = require("./user/index.route");

function route(app) {
	app.use("/admin", adminRouter);
	app.use("/", userRouter);
}
module.exports = route;
