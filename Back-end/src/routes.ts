import { Router } from "express";
import { login, register, auth, logout } from "./controller/user-controller.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";
import { deleteProduct, getProducts } from "./controller/product-controller.js";
import { getCartItems } from "./controller/cartItem-controller.js";

export const router = Router();

//Rotas do utilizador
router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

//Rotas dos Produtos
router.get("/get-products", getProducts);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);

//Roata do carrinho
router.get("/get-cart-items", authMiddleware, getCartItems);
