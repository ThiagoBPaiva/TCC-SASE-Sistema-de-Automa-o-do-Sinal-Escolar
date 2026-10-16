import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import readline from "readline";

export class ArduinoConexion {
    private arduino: SerialPort;
    private parser: ReadlineParser;
    private horarios: Array<string> = []; // Não sera usado
    private ultimoSinal: Array<string> = []; // Não sera usado

    constructor() {

        // Conexão com a porta Serial USB COM3
        this.arduino = new SerialPort({
            path: "COM3",
            baudRate: 9600
        });

        // Recebendo mensagem do Arduino
        this.parser = this.arduino.pipe(
            new ReadlineParser({
                delimiter: "\n"
            })
        );

        // Retorno do Arduino
        this.parser.on("data", (mensagem) => {
            console.log("Arduino:", mensagem);
        });
    }

    validationPort(): void {
        this.arduino.open((erro) => {
            if (erro && erro.message !== "Port is already open") {
                console.error("Não foi possível abrir a COM3:", erro.message);
                return;
            }

            console.log("Porta COM3 aberta com sucesso!")
        })
    }


    // // esse método foi realocado a classe de Regras de Negocios ./AuthUserService.ts
    // setTimeList(hora: string, minuto: string): void {
    //     const newDate = new Date();

    //     newDate.setHours(
    //         Number(hora),
    //         Number(minuto),
    //         0,
    //         0
    //     )

    //     console.log(newDate);
    //     const horarioArual = `${newDate.getHours()}:${newDate.getMinutes()}`;
    //     this.horarios.push(horarioArual);
    // }

    // date vai receber como valor padrão o formato "XX:ZZ"
    onArduino(): void {
        console.log("Enviando sinal");
        this.arduino.write("LIGADO\n");
        // const agora = new Date();
        // const horarioAtual = `${agora.getHours()}:${agora.getMinutes()}`;

        // console.log("teste");
        // console.log(horarioAtual);
        // console.log(this.horarios);

        // if (this.horarios.includes(horarioAtual) && !this.ultimoSinal.includes(horarioAtual)) {
        //     console.log("Enviando sinal");
        //     this.arduino.write("LIGADO\n");
        //     this.ultimoSinal.push(horarioAtual);
        // }
    }
}
