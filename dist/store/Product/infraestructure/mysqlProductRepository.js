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
exports.MysqlProductRepository = void 0;
const mysql_1 = require("../../../database/mysql");
const product_1 = require("../domain/product");
class MysqlProductRepository {
    registerProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Consulta SQL para insertar un nuevo producto
                const sql = `
                INSERT INTO products (uuid, name, description, price, url_img)
                VALUES (?, ?, ?, ?, ?)
            `;
                // Parámetros para la consulta SQL
                const params = [product.uuid, product.name, product.description, product.price, product.url_img];
                // Ejecutar la consulta
                yield (0, mysql_1.query)(sql, params);
                // Devolver el producto insertado
                return product;
            }
            catch (error) {
                console.error("Error registering product:", error);
                return null;
            }
        });
    }
    getProduct(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM products WHERE uuid = ?";
                const [rows] = yield (0, mysql_1.query)(sql, [uuid]);
                // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
                if (!Array.isArray(rows) || rows.length === 0) {
                    return null;
                }
                const row = rows[0]; // Como estamos buscando por ID, sólo debe haber una coincidencia
                const products = new product_1.Product(row.uuid, row.name, row.description, row.price, row.url_img);
                return products;
            }
            catch (error) {
                console.error('Error al obtener el libro:', error);
                return null;
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM products"; // Asumiendo que tu tabla se llama 'books'
                const [rows] = yield (0, mysql_1.query)(sql);
                if (!Array.isArray(rows) || rows.length === 0) {
                    return null;
                }
                const books = rows.map(row => {
                    return new product_1.Product(row.uuid, row.name, row.description, row.price, row.url_img);
                });
                return books;
            }
            catch (error) {
                console.error("Error fetching books:", error);
                return null;
            }
        });
    }
}
exports.MysqlProductRepository = MysqlProductRepository;
