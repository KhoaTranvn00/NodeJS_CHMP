const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user/order.controller");

router.post("/add", controller.addOrder);
router.get("/:id", controller.detailOrder);
router.delete("/:id", controller.deleteOrder);
router.get("/", controller.getOrder);

module.exports = router;
