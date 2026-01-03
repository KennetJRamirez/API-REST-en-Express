import UserController from "../controllers/user.controller.js";
import express from "express";
import RoleValidator from "../middlewares/role.middleware.js";
import UserValidator from "../middlewares/user.middleware.js";
import EmailValidator from "../middlewares/email.middleware.js";
import IdValidator from "../middlewares/id.middleware.js";
import UserValidatorById from "../middlewares/exist.user.middleware.js";
import UserValidatorPatch from "../middlewares/user.patch.middleware.js";

const router = express.Router();

router.get("/", UserController.userGet);
router.post(
	"/",
	[EmailValidator, UserValidator, RoleValidator],
	UserController.userPost
);
router.patch(
	"/:id",
	[IdValidator, UserValidatorById, UserValidatorPatch],
	UserController.userPatch
);
router.delete(
	"/:id",
	[IdValidator, UserValidatorById],
	UserController.userDelete
);

export default router;
