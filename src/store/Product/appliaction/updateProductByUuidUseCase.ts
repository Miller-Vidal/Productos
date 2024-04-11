import { UpdateProduct } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";


export class UpdateProductByUuidUsecase{
    constructor(readonly productRepository: ProductRepository){}

    async run(updateProduct:UpdateProduct):Promise<UpdateProduct | null| boolean >{
        try {
            const UpdateProducts = {
                uuid : updateProduct.uuid,
                name: updateProduct.name,
                description: updateProduct.description,
                price: updateProduct.price,
            };
            return await this.productRepository.updateProductosByUuid(UpdateProducts);
        } catch (error) {
            return null
        }
    }
}