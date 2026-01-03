import joi from "joi";

const userSchema = joi.object({
	name: joi.string().alphanum().min(3).max(30).required(),
	email: joi.string().email().required(),
	password: joi
		.string()
		.min(8)
		.pattern(/[A-Z]/)
		.pattern(/[a-z]/)
		.pattern(/[0-9]/)
		.pattern(/[^a-zA-Z0-9]/)
		.required(),
	role: joi.string().required(),
});

const UserValidator = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ msg: error.details[0].message });
	}
	next();
};

export default UserValidator;
