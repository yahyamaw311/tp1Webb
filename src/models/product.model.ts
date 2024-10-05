
import {Product} from '../interfaces/product.interface';


export class ProductModel implements Product{
    id?: number;
    title: string;
    price: number;
    description: string;
    category?: string;
    quantity: number;

    constructor(title: string, price: number, description: string, quantity:number, id?: number){
        this.title = title;
        this.price = price;
        this.description = description;
        this.quantity = quantity;

        if(id !== undefined) this.id = id;
    }
}