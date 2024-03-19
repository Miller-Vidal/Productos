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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterProductUseCase = void 0;
class RegisterProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    run(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = {
                    uuid: product.uuid,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    url_img: product.url_img
                };
                return yield this.productRepository.registerProduct(newProduct);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.RegisterProductUseCase = RegisterProductUseCase;
