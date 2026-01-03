import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.URL_CONNECTION_MONGO);
		console.info("Conexion exitosa");
	} catch (error) {
		console.error(error);
		throw new Error("Error a la hora de inicializar el proceso");
	}
};

export default dbConnection;
