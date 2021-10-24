const express = require("express");
const router = express.Router();

const authenRouter = require("./authen.route");
const cartRouter = require("./cart.route");
const orderRouter = require("./order.route");

const controller = require("../../controllers/user/index.controller");
const userMiddleware = require("../../middleware/user.middleware");

router.use("/user", authenRouter);
router.use("/cart", userMiddleware.authentication, cartRouter);
router.use("/order", userMiddleware.authentication, orderRouter);
router.get("/search", controller.search);
router.get("/category/:slug", controller.productCategory);
router.get("/band/:slug", controller.productBand);
router.get("/:slug", controller.productDetail);
router.get("/", controller.index);

module.exports = router;
