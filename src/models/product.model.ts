
import {Product} from '../interfaces/product.interface';


export class ProductModel implements Product{
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    quantity: number;

    constructor(id: number, title: string, price: number, description: string, category: string, quantity:number){
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
    }
    
    public getId(): number {
        return this.id;
    }
    
    public setId(id: number): void {
        this.id = id;
    }
    
    public getTitle(): string {
        return this.title;
    }
    
    public setTitle(title: string): void {
        this.title = title;
    }
    
    public getPrice(): number {
        return this.price;
    }
    
    public setPrice(price: number): void {
        this.price = price;
    }
    
    public getDescription(): string {
        return this.description;
    }
    
    public setDescription(description: string): void {
        this.description = description;
    }
    
    public getCategory(): string {
        return this.category;
    }
    
    public setCategory(category: string): void {
        this.category = category;
    }

    public getQuantity(): number {
        return this.quantity;
    }
    
    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

}