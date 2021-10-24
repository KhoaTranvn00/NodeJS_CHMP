const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "public/uploads/band" });

const controller = require("../../controllers/admin/order.controller");

router.get("/:id", controller.detail);
router.get("/", controller.index);
router.patch("/:id", controller.confirm);

module.exports = router;
