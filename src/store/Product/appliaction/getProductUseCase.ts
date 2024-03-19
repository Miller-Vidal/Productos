import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";

export class GetProductUseCase{
    constructor( readonly productRepository: ProductRepository){}

    async getProduct(uuid:string):Promise<Product | null>{

        try {
            const get = await this.productRepository.getProduct(uuid);
            return get;
        } catch (error) {
            return null;
        }
    }
}