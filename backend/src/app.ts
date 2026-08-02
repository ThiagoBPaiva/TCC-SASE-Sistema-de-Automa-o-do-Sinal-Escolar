import express from "express";
import { Request, Response } from "express";
import path from "path";

import { ArduinoConexion } from "./communication"

const app = express();
const port: number = 3000;
const arduino = new ArduinoConexion();


app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend")));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(
    path.join(__dirname,"../../frontend")
));


app.post('/envio', (req: Request, res: Response) => {
    const resultado = req.body.time;
    console.log(resultado);

    const [hora, minuto] = resultado.split(":");

    arduino.setTimeList(hora, minuto);

    res.sendFile(
        path.join(__dirname, "../../frontend/mesage.html")
    );

})

app.listen(port, () => {
    console.log("porta rodando");
})
