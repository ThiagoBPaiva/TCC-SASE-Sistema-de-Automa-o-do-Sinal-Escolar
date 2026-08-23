import express from "express";
import path from "path";
import * as dotenv from "dotenv";
// ---
import { router } from "./routers/router"
import { conexion } from './config/db'
// ---
conexion();

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/public")));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
    console.log("porta rodando");
})
