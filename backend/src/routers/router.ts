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
router.get("/auth/home", AsyncMiddlwares, auth.homePage)

// Criação de novos usuarios
router.get("/signUp", AsyncMiddlwares, auth.getSignUp); // exibir tela de cadastro
router.post("/auth/signUp", AsyncMiddlwares, auth.postSignUp); // Criou a conta


