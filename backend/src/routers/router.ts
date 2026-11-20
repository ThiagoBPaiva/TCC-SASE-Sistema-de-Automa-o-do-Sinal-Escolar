import { Router, Request, Response } from "express";
import { Controllers } from "../controllers/Constrollers";
import { AuthConstrollers } from "../controllers/ConstrollersAuth";
import { AsyncMiddlwares } from '../middleware/Auth'

const controller = new Controllers();
const auth = new AuthConstrollers();


export const router = Router();

// Methodes GET
// Esses metodos aqui, iram apenas renderizar as páginas
router.get("/login", controller.getLogin.bind(controller)); // exibir tela de logim

// Já esses aqui, são subordinados aos get's, onde para cada interassão cliente -> servidor, esses aqui serão os responsáveis
router.post("/auth/login", controller.postLogin.bind(controller)); // Logou na conta


// -------------- ROTAS DOS AUTENTICADOS --------------

// Rota para autenticados
router.get("/auth/home", AsyncMiddlwares, auth.homePage.bind(auth))
router.get("/auth/createGroup", AsyncMiddlwares, auth.getCreateGroup.bind(auth))
router.get("/auth/createTime", AsyncMiddlwares, auth.getCreateTime.bind(auth))
router.get("/auth/groupTime", AsyncMiddlwares, auth.getGroupTime.bind(auth))
router.get("/auth/schedules", AsyncMiddlwares, auth.getTimeFromGroup.bind(auth));

// Criação de novos usuarios
router.get("/signUp", AsyncMiddlwares, auth.getSignUp.bind(auth)); // exibir tela de cadastro
router.post("/auth/signUp", AsyncMiddlwares, auth.postSignUp.bind(auth)); // Criou a conta

// Verificando a comunicação com o arduino
router.get("/auth/arduino/status", AsyncMiddlwares, auth.getArduinoCommunication.bind(auth));

// Criação de novos grupos
router.post("/auth/createGroup", AsyncMiddlwares, auth.postCreateGroupTime.bind(auth));
// Criação de um novo horário
router.post("/auth/createTime", AsyncMiddlwares, auth.postCreateTime.bind(auth));
// Atualizar o status de acionamento
router.post("/auth/update/activityTime", AsyncMiddlwares, auth.postUpdatGroupTimeeActivity.bind(auth));
// Mostrando todos os grupos de horários
router.get("/auth/allTime", AsyncMiddlwares, auth.getAllGroupTime.bind(auth));
// Mostrar horário ativo
router.get("/auth/timeActivity", AsyncMiddlwares, auth.getActivityGroupTime.bind(auth));
// Consultar horarios de cada grupo
router.get("/auth/schedules/get/:id", AsyncMiddlwares, auth.getTimeFromGroupBack.bind(auth));

