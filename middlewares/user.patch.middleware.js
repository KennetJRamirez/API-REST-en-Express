import joi from "joi";

const userSchemaPatch = joi
	.object({
		name: joi.string().alphanum().min(3).max(30),
		email: joi.string().email(),
		password: joi
			.string()
			.min(8)
			.pattern(/[A-Z]/)
			.pattern(/[a-z]/)
			.pattern(/[0-9]/)
			.pattern(/[^a-zA-Z0-9]/),
		role: joi.string(),
	})
	.min(1);

const UserValidatorPatch = (req, res, next) => {
	const { error } = userSchemaPatch.validate(req.body);
	if (error) {
		return res.status(400).json({ msg: error.details[0].message });
	}
	next();
};

export default UserValidatorPatch;
