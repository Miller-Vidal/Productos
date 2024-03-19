"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterProductController = void 0;
const saveImg_1 = __importDefault(require("../../../../helpers/saveImg"));
const uuid_1 = require("uuid");
class RegisterProductController {
    constructor(registerProductUseCase) {
        this.registerProductUseCase = registerProductUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, description, price } = req.body;
                const imgFile = req.files ? req.files.img : null;
                console.log(req.files);
                if (!imgFile) {
                    return res.status(400).send({
                        status: "error",
                        message: "No file uploaded."
                    });
                }
                // Subir imagen a Firebase y obtener la URL
                const imageUrl = yield (0, saveImg_1.default)(imgFile);
                // Generar un UUID único para el producto
                const uuid = (0, uuid_1.v4)();
                // Crear un objeto Product con los datos recibidos
                const productData = {
                    uuid,
                    name,
                    description,
                    price,
                    url_img: imageUrl
                };
                // Llamar al método run de registerProductUseCase con los datos del producto
                const product = yield this.registerProductUseCase.run(productData);
                // Retornar la URL de la imagen
                return res.status(200).send({
                    status: "success",
                    data: {
                        product
                    }
                });
            }
            catch (error) {
                console.error("Error:", error);
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while uploading the image."
                });
            }
        });
    }
}
exports.RegisterProductController = RegisterProductController;
