import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { Communication } from "./config/communication";
import readline from "readline";
import { Tables } from "./utils/enum/Tables";

export class ArduinoConexion extends Communication {
    private arduino: SerialPort;
    private parser: ReadlineParser;
    private horarios: Array<string> = [];
    private ultimoSinal: Array<string> = [];

    constructor() {
        super()
        // Conexão com a porta Serial USB COM3
        this.arduino = new SerialPort({
            path: "COM3",
            baudRate: 9600
        });
        this.validationPort();

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

    // date vai receber como valor padrão o formato "XX:ZZ"
    async onArduino(): Promise<void> {

        const localTime = new Date(); // Pegando o horário local
        const dateFormat = `${localTime.getHours()}:${localTime.getMinutes()}`; // Formatar a horá local

        const groupActivity = await this.DBGetValues(Tables.grupoDeHorarios, 'activity', 'on'); // Pegando o grupo ativo
        const timeOfTheActivity = await this.DBGetValues(Tables.horarios, 'id_group', groupActivity[0].id); // Pegando os horários do grupo ativo
        timeOfTheActivity.forEach((element) => {
            const time = element.time;
            if (!this.horarios.includes(time)) {
                this.horarios.push(time);
            }
        })

        if (this.horarios.includes(dateFormat) && !this.ultimoSinal.includes(dateFormat)) {
            console.log("Enviando sinal");
            this.arduino.write("LIGADO\n");
            this.ultimoSinal.push(dateFormat);
        }
    }
}
