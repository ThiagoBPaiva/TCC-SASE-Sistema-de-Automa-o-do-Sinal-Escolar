import { Router, Request, Response } from "express";
import { Controllers } from "../controllers/constrollers";

const controller = new Controllers();

export const router = Router();

// Methodes GET
// Esses metodos aqui, iram apenas renderizar as páginas
router.get("/login", controller.getLogin.bind(controller)); // exibir tela de logim
router.get("/signUp", controller.getSignUp.bind(controller)); // exibir tea de cadastro

// Já esses aqui, são subordinados aos get's, onde para cada interassão cliente -> servidor, esses aqui serão os responsáveis
router.post("/login", controller.postLogin.bind(controller)); // Logou na conta
router.post("/signUp", controller.postSignUp.bind(controller)); // Criou a conta

// router.post("/home", controller.postLogin.bind(controller));
