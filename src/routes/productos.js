import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.js";


const productRouter = Router();

productRouter.get("/", getProducts)

productRouter.get("/:pid", getProduct)

productRouter.post("/", createProduct)

productRouter.put("/:pid", updateProduct)

productRouter.delete("/:pid", deleteProduct)

export default productRouter