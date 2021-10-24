const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user/cart.controller");

router.patch("/add/:id", controller.addCart);
router.patch("/delete/:id", controller.deleteCart);
router.patch("/updateCart", controller.updateCart);
router.patch("/updateCartBuy", controller.updateCartBuy);
router.get("/", controller.getCart);

module.exports = router;
