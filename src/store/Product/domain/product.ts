import { v4 as uuid } from "uuid";

export class Product {
    public uuid: string;
    public name: string;
    public description: string;
    public price: number;
    public url_img: string;

    constructor(uuid:string,name: string, description: string, price: number, url_img: string) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.price = price;
        this.url_img = url_img;
    }

}

export class UpdateProduct{

    public uuid: string;
    public name: string;
    public description: string;
    public price: number;
    

    constructor(uuid:string,name: string, description: string, price: number) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.price = price;
    }

}
