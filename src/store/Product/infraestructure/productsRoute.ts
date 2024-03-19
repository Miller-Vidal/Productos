import express from 'express';
import { registerProductController,getProdutController, getProductsController } from './dependencies';


export const productRouter = express.Router();


productRouter.post("/", registerProductController.run.bind(registerProductController))

productRouter.get("/:uuid", getProdutController.getByPublic.bind(getProdutController))

productRouter.get("/", getProductsController.getAllPublications.bind(getProductsController))

