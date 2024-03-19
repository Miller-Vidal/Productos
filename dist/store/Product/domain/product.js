"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(uuid, name, description, price, url_img) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.price = price;
        this.url_img = url_img;
    }
}
exports.Product = Product;
