import { Router } from "express";
import { CartControllers } from "../controllers/carts.controllers.js"

const cartRouter = Router();

const cartControllers = new CartControllers();

cartRouter.get("/:cid", cartControllers.getCart);

cartRouter.post("/", cartControllers.createCart);

cartRouter.post("/:cid/products/:pid", cartControllers.insiderProductCart);

cartRouter.put("/:cid", cartControllers.updateProductsCart);

cartRouter.post("/:cid/products/:pid", cartControllers.updateQuantityProductCart);

cartRouter.delete("/:cid", cartControllers.deleteCart);

cartRouter.delete("/:cid/products/:pid", cartControllers.deleteProductCart);

export default cartRouter