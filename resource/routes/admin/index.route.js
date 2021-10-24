const express = require("express");
const router = express.Router();
const categoryRouter = require("./category.route");
const bandRouter = require("./band.route");
const productRouter = require("./product.route");
const orderRouter = require("./order.route");

const controller = require("../../controllers/admin/admin.controller");
const adminMiddleware = require("../../middleware/admin.middleware");

router.get("/login", adminMiddleware.alreadyAuthenticated, controller.getLogin);
router.get("/", controller.index);
router.get("/logout", controller.logout);
router.post("/login", controller.postLogin);
router.use("/category", adminMiddleware.authentication, categoryRouter);
router.use("/product", adminMiddleware.authentication, productRouter);
router.use("/order", adminMiddleware.authentication, orderRouter);
router.use("/band", adminMiddleware.authentication, bandRouter);

module.exports = router;
