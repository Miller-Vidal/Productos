import { RegisterProductUseCase } from "../../appliaction/registerProductUseCase";
import { Request, Response } from "express";
import uploadToFirebase from "../../../../helpers/saveImg";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";


export class RegisterProductController {
    constructor(readonly registerProductUseCase: RegisterProductUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let { name, description, price } = req.body;

            const imgFile = req.files ? req.files.img as UploadedFile : null;


            if (!imgFile) {
                return res.status(400).send({
                    status: "error",
                    message: "No file uploaded."
                });
            }
            
            
            // Subir imagen a Firebase y obtener la URL
            const imageUrl = await uploadToFirebase(imgFile);

            console.log(imageUrl)

            // Generar un UUID único para el producto
            const uuid = uuidv4();

            // Crear un objeto Product con los datos recibidos
            const productData = {
                uuid,
                name,
                description,
                price,
                url_img: imageUrl
            };

            // Llamar al método run de registerProductUseCase con los datos del producto
            const product = await this.registerProductUseCase.run(productData);

            // Retornar la URL de la imagen
            return res.status(200).send({
                status: "success",
                data: {
                    product
                }
            });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while uploading the image."
            });
        }
    }
}
