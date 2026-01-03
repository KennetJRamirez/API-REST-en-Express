import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import joi from "joi";

class UserController {
	async userGet(req, res) {
		const { limit = 5, from = 0 } = req.query;
		const query = { status: true };

		const limitInt = Number(limit);
		const fromInt = Number(from);

		if (isNaN(limitInt) || isNaN(fromInt)) {
			return res.status(400).json({
				msg: "Los parametros de la paginacion deber ser numeros",
			});
		}

		if (limitInt < 0 || fromInt < 0) {
			return res.status(400).json({
				msg: "Los parametros de paginacion no deber ser negativos",
			});
		}

		const [total, usuarios] = await Promise.all([
			User.countDocuments(query),
			User.find(query).skip(fromInt).limit(limitInt),
		]);
		res.json({ total, usuarios });
	}

	async userPost(req, res) {
		try {
			const { name, email, password, role } = req.body;
			// Hasheando la contraseña
			const salt = await bcrypt.genSalt(
				parseInt(process.env.ROUND_SALTS)
			);
			const hashedPassword = await bcrypt.hash(password, salt);
			// Guardando
			const user = await User.create({
				name,
				email,
				password: hashedPassword,
				role,
			});
			res.status(201).json({
				msg: "Creado correctamente",
				user: publicUser(user),
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Error interno del servidor" });
		}
	}

	async userPatch(req, res) {
		try {
			const { id } = req.params;
			const { _id, password, google, email, ...resto } = req.body;

			if (password) {
				// Hasheando la contraseña
				const salt = await bcrypt.genSalt(
					parseInt(process.env.ROUND_SALTS)
				);
				resto.password = await bcrypt.hash(password, salt);
			}

			const user = await User.findByIdAndUpdate(id, resto, { new: true });

			return res.json({
				msg: "Usuario actualizado",
				user: publicUser(user),
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ msg: "Error al actualizar usuario" });
		}
	}

	async userDelete(req, res) {
		const { id } = req.params;
		const user = await User.findOneAndUpdate(
			{ _id: id, status: true },
			{ status: false },
			{ new: true }
		);

		if (!user) {
			return res.status(400).json({ msg: "Usuario ya estaba eliminado" });
		}

		res.status(200).json({
			msg: "Usuario borrado con exito",
			user: publicUser(user),
		});
	}
}

function publicUser(user) {
	return {
		id: user.id,
		name: user.name,
	};
}

export default new UserController();
