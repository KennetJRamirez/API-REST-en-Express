import User from "../models/user.js";

const UserValidatorById = async (req, res, next) => {
	const { id } = req.params;
	const existIdUser = await User.findById(id);

	if (!existIdUser) {
		return res.status(400).json({ msg: "ID registrada o invalida" });
	}
	next();
};

export default UserValidatorById;
