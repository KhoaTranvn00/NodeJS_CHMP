const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "public/uploads/product" });

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);
router.get("/search", controller.search);
router.get("/add", controller.getAdd);
router.post("/add", upload.array("img"), controller.postAdd);
router.delete("/:id", controller.delete);
router.get("/:slug/edit", controller.getEdit);
router.get("/:slug/detail", controller.detail);
router.put("/:id/edit", upload.array("img"), controller.putEdit);

module.exports = router;
