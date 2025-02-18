import { Router } from "express";
import { createCart, deleteCart, deleteProductCart, getCart, insiderProductCart, updateProductsCart, updateQuantityProductCart } from "../controllers/carts.js";


const cartRouter = Router();

cartRouter.get("/:cid", getCart)

cartRouter.post("/", createCart)

cartRouter.post("/:cid/products/:pid", insiderProductCart)

cartRouter.put("/:cid", updateProductsCart)

cartRouter.post("/:cid/products/:pid", updateQuantityProductCart)

cartRouter.delete("/:cid", deleteCart)

cartRouter.delete("/:cid/products/:pid", deleteProductCart)

export default cartRouter