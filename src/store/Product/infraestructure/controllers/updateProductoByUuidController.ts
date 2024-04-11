import { Request, Response } from "express";
import { UpdateProductByUuidUsecase } from "../../appliaction/updateProductByUuidUseCase";


export class UpdateProductByUuidController{
    constructor(readonly updateProductByUuidUsecase:UpdateProductByUuidUsecase){}

    async run (req:Request, res:Response){
        try {
            const {uuid} = req.params
            const {name,description, price} = req.body;

            const productt = {uuid,name,description,price}

            const updateProduct = await this.updateProductByUuidUsecase.run(productt);

            if (updateProduct) {
                return res.status(200).send({ 
                    status: "success",
                    data: {
                        message: updateProduct
                    }
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Public not found."
                });
            }

            
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            } 
            return res.status(500).send({
                status: "error",
                message: "An error occurred while fetching the book."
            });
        }
    }
}