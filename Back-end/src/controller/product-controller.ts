import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
      res.status(404).json({ message: "Nao foram encotrados produtos." });
      return;
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Id nao encontrado." });
      return;
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: id },
    });

    if (!deletedProduct) {
      res.status(404).json({ message: "Erro ao apagar o produto." });
      return;
    }
    res.json(id);
  } catch (error: any) {
    if (error.code === "P2025") {
      res.json({ message: "Produto nao encontrado." });
      return;
    }
    res.status(500).json({ message: "Erro no servidor." });
    return;
  }
};
