const express = require("express");
const router = express.Router();

const controller = require("../../controllers/user/authen.controller");
const userMiddleware = require("../../middleware/user.middleware");

router.get(
	"/register",
	userMiddleware.alreadyAuthenticated,
	controller.getRegister
);
router.post("/register", controller.postRegister);
router.get("/login", userMiddleware.alreadyAuthenticated, controller.getLogin);
router.get("/logout", controller.getLogout);
router.post("/login", controller.postLogin);
router.get("/user", controller.getUser);
router.patch("/user", controller.patchUser);

module.exports = router;
