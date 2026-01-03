import User from "../models/user.js";

const EmailValidator = async (req, res, next) => {
	try {
		const { email } = req.body;
		const existEmail = await User.findOne({ email });
		if (existEmail) {
			return res.status(400).json({ msg: "Correo ya registrado" });
		}
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: "Error validando correo" });
	}
};

export default EmailValidator;
