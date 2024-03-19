import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";


export class GetProductsUseCase{
    constructor(readonly productRepository: ProductRepository){}

    async run():Promise<Product[] | null>{
        try {
            const getAll = await this.productRepository.getProducts();
            return getAll;
            
        } catch (error) {
            return null;
        }
    }
}