import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import readline from "readline";

export class ArduinoConexion {
    private arduino: SerialPort;
    private parser: ReadlineParser;
    private horarios: Array<String> = [];
    private ultimoSinal: Array<string> = [];

    constructor() {

        // Conexão com a porta Serial USB COM3
        this.arduino = new SerialPort({
            path: "COM3",
            baudRate: 9600
        });

        // Formatar toda saida ou mensagem do Arduino
        this.parser = this.arduino.pipe(
            new ReadlineParser({
                delimiter: "\n"
            })
        );

        // Retorno do Arduino
        this.parser.on("data", (mensagem) => {
            console.log("Arduino:", mensagem);
        });

        setInterval(() => {
            this.setDateInArduino();
        }, 1000);
    }

    setTimeList(hora: string, minuto: string): void {
        const newDate = new Date();

        newDate.setHours(
            Number(hora),
            Number(minuto),
            0,
            0
        )

        console.log(newDate);
        const horarioArual = `${newDate.getHours()}:${newDate.getMinutes()}`
        this.horarios.push(horarioArual);
    }

    // date vai receber como valor padrão o formato "XX:ZZ"
    setDateInArduino(): void {
        const agora = new Date();
        const horarioAtual = `${agora.getHours()}:${agora.getMinutes()}`;
        console.log("teste");
        console.log(horarioAtual);
        console.log(this.horarios);
        if(this.horarios.includes(horarioAtual) && !this.ultimoSinal.includes(horarioAtual)){
            console.log("Enviando sinal");
            this.arduino.write("LIGADO\n");
            this.ultimoSinal.push(horarioAtual);
        }
    }
}
