import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import * as dotenv from "dotenv";
// ---
import { router } from "./routers/router"
import { conexion } from './config/db'
import { ArduinoConexion } from "./communication";
// ---
conexion();

dotenv.config();

const arduino = new ArduinoConexion();
const app = express();
const port: number = Number(process.env.PORT);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../frontend/public")));
app.use(express.urlencoded({ extended: true }));
app.use(router);

export { arduino };

app.listen(port, () => {
    console.log("porta rodando");
    setInterval(() => {
        arduino.validationPort();
        arduino.onArduino();
    }, 500);
})
