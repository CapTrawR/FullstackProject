import express, { type Request, type Response } from "express";
import { connection } from "./src/db.js";
import cors from "cors";
import {router} from "./src/routes.js";
import cookieParser from "cookie-parser";


const app = express();
// o express por padrao nao le ficheiros json entao temos que lhe dizer para ler
app.use(express.json());
// habilita que os outros sites tenaham acesso as requesicoes do servidor
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
// router tem que ser usado depois do express.json e do cors!
app.use(cookieParser());
app.use(router);
connection();

app.listen(3000, () => {
  console.log("servidor a rodar na porta 3000 - ok!");
});
