import dotenv from "dotenv";
dotenv.config();
import dbConnection from "../database/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "../routes/user.routes.js";
export class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.userRoute = "/api/v1/users";

		// Conexion BD
		this.dbConn();

		// Middlewares
		this.middlewares();

		// Routes
		this.routes();
	}

	async dbConn() {
		await dbConnection();
	}

	routes() {
		this.app.use(this.userRoute, router);
	}

	middlewares() {
		this.app.use(morgan("dev"));
		this.app.use(express.static("public"));
		this.app.use(express.json());
		this.app.use(cors());
	}

	listen() {
		this.app.listen(this.port, () => {
			console.info(`Server running on port ${this.port}`);
		});
	}
}

export default Server;
