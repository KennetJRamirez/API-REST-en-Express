import mongoose from "mongoose";

const IdValidator = (req, res, next) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: "ID no válido" });
	}
	next();
};

export default IdValidator;
