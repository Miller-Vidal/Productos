import { query } from "../../../database/mysql";
import { Product,UpdateProduct } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";


export class MysqlProductRepository implements ProductRepository{
    async registerProduct(product: Product): Promise<Product | null> {
        try {
            // Consulta SQL para insertar un nuevo producto
            const sql = `
                INSERT INTO products (uuid, name, description, price, url_img)
                VALUES (?, ?, ?, ?, ?)
            `;
            
            // Parámetros para la consulta SQL
            const params = [product.uuid, product.name, product.description, product.price, product.url_img];
            console.log(product.url_img)
            // Ejecutar la consulta
            await query(sql, params);

            // Devolver el producto insertado
            return product;
        } catch (error) {
            console.error("Error registering product:", error);
            return null;
        }
    }
    async getProduct(uuid: string): Promise<Product | null> {
        try {
            const sql = "SELECT * FROM products WHERE uuid = ?";
            const [rows]: any = await query(sql, [uuid]);

            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const row = rows[0]; // Como estamos buscando por ID, sólo debe haber una coincidencia

            const products = new Product(
                row.uuid,
                row.name,
                row.description,
                row.price,
                row.url_img
            );

            return products;

        } catch (error) {
            console.error('Error al obtener el libro:', error);
            return null;
        }
    }

    async getProducts (): Promise<Product[] | null> {
        try {
            const sql = "SELECT * FROM products"; // Asumiendo que tu tabla se llama 'books'
            const [rows]: any = await query(sql);

            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const books: Product[] = rows.map(row => {
                return new Product(
                    row.uuid,
                    row.name,
                    row.description,
                    row.price,
                    row.url_img,
                );
            });

            return books;

        } catch (error) {
            console.error("Error fetching books:", error);
            return null;
        }
    }

    async updateProductosByUuid(product: UpdateProduct): Promise<UpdateProduct| null| boolean> {
        try {
            // Consulta SQL para actualizar un producto existente
            const sql = `
                UPDATE products
                SET name = ?, description = ?, price = ?
                WHERE uuid = ?
            `;
            
            // Parámetros para la consulta SQL
            const params = [product.name, product.description, product.price, product.uuid];
            
            // Ejecutar la consulta
            await query(sql, params);
            
            // Si la actualización fue exitosa, devolver true
            return true;
        } catch (error) {
            console.error("Error updating product:", error);
            // Si ocurre un error, devolver false
            return false;
        }
    }
    
}