import { Product,UpdateProduct} from "./product"

export interface ProductRepository{

    registerProduct(product:Product):Promise<Product| null>

    getProduct(uuid:string):Promise<Product| null>;

    getProducts():Promise<Product[] | null>

    updateProductosByUuid(product:UpdateProduct):Promise<UpdateProduct | null| boolean>
}