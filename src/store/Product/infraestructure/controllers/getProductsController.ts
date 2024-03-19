import { Request,Response } from "express";
import { GetProductsUseCase } from "../../appliaction/getProductsUseCase";


export class GetProductsController{
    constructor(readonly getProductsUseCase: GetProductsUseCase){}


    async getAllPublications(req:Request, res:Response){
        try {
            let getAll = await this.getProductsUseCase.run()

            if(getAll){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: getAll
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "Product not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the product."
            });
        }
    }
}