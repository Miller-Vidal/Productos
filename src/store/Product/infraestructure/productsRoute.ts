import express from 'express';
import { registerProductController,getProdutController, getProductsController, updateProductByUuidController } from './dependencies';


export const productRouter = express.Router();


productRouter.post("/", registerProductController.run.bind(registerProductController))

productRouter.get("/:uuid", getProdutController.getByPublic.bind(getProdutController))

productRouter.get("/", getProductsController.getAllPublications.bind(getProductsController))

productRouter.put("/:uuid", updateProductByUuidController.run.bind(updateProductByUuidController))


