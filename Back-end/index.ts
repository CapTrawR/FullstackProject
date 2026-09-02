import express from "express";
import { connection } from "./src/db.js";

const app = express();



//metodo get
app.get("/", (req, res) => {
  console.log("Alguem a usar a rota");
  res.send("Hello World");
});

//metodo get com json
app.get("/teste", (req, res) => {
  res.json({
    ok: true,
    message: "API a funcionar",
  });
});

app.listen(3000, () => {
  console.log("servidor a rodar na porta 3000 - ok!");
  connection()
});
