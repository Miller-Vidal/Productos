import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";
import { v4 as uuid } from "uuid";


export class RegisterProductUseCase {
    constructor(readonly productRepository: ProductRepository) {}

    async run(product: Product): Promise<Product | null> {

        try {
            const newProduct = {
                uuid : product.uuid,
                name: product.name,
                description: product.description,
                price: product.price,
                url_img: product.url_img
            };

            return await this.productRepository.registerProduct(newProduct);
        } catch (error) {
            return null;
        }
    }
}
