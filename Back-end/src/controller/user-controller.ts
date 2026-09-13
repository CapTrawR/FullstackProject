import { type Request, type Response } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Rota de login do usuário
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // verifcio se mandaram email e password
    if (!email || !password) {
      res.status(400).json({ message: "E-mail e senha são obrigatórios!!" });
      return;
    }

    //meter o email em letras pequenas
    const normalizedEmail = email.trim().toLowerCase();

    //vou buscar o usuario
    // comando find first e como fazer um where email='x'
    const user = await prisma.user.findFirst({
      where: { email: normalizedEmail },
    });

    //Verifico se o usuario não existe, se o usuario nao existir mando erro !!
    if (!user) {
      res.status(404).json({ message: "Utilizador não encontrado!!" });
      return;
    }

    //comparar a password fornecida com a password armazenada no banco de dados
    const match = await bcrypt.compare(password, user?.password);

    //se a password nao for correta mando erro
    if (!match) {
      res.status(401).json({ message: "Password inválida." });
      return;
    }
    //User info
    const userInfos = {
      id: user.id,
      name: user.name,
      email: user.email,
      codigo_postal: user.codigo_postal,
    };

    // tenho que verificar se o jwt existe para ele assumir que tem
    if (!process.env.JWT_SECRET) {
      return;
    }

    // vou buscar a minha chave do jwt que esta no .env
    const token = jwt.sign(userInfos, process.env.JWT_SECRET);

    //cookies acessa info do user e metemos um timiing e jwt token assinaturas
    res.cookie("user", token, {
      maxAge: 18000000, // 5 hours in milliseconds
    });

    //se a password estiver correta, retorno os dados do usuario
    res.status(200).json(userInfos);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
    return;
  }
};

// Rota de registro de novo usuário
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, codigo_postal } = req.body;
    if (!name || !email || !password || !codigo_postal) {
      res
        .status(400)
        .json({ message: "Todas as informações são obrigatorias." });
      return;
    }

    // hashing da password
    const hash = await bcrypt.hash(password, 10);

    //dar trim ao email e garantir que ele vai em letra pequena
    const normalizedEmail = email.trim().toLowerCase();

    //garantir que o email nao esta registado
    const user = await prisma.user.findFirst({
      where: { email: normalizedEmail },
    });

    if (user?.email) {
      res.status(409).json({ message: "E-mail já registado." });
      return;
    }

    //criar novo usuario
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hash,
        codigo_postal: codigo_postal.trim(),
      },
    });

    res.status(201).json({
      message: "Utilizador criado com sucesso.",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
    return;
  }
};

// Rota de autenticação do usuário, retorna as informações decodificadas do JWT armazenado no cookie
export const auth = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    // Retornar as informações decodificadas do JWT armazenado no cookie
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  const { user } = req.cookies;
  try {
    res.clearCookie("user");
    res.status(200).json({ message: "Utilizador deslogado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
    return;
  }
};
