import Role from "../models/role.js";

const RoleValidator = async (req, res, next) => {
	// No viene rol
	const { role } = req.body;
	if (!role) {
		return res.status(400).json({ msg: "Rol obligatorio" });
	}

	// Buscarlo en MongoDB
	const result = await Role.findOne({ role: role });

	if (!result) {
		return res.status(400).json({ msg: `El rol ${role} no es valido` });
	}

	// Continua
	next();
};

export default RoleValidator;
