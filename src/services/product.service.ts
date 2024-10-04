import { Product } from '../interfaces/product.interface';
import { ProductModel } from '../models/product.model';
import * as fs from 'fs';


export class ProductService{

    productList: Product[] = [];

    public static async generateProductJson() {
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json => {
                // to remove the exess data not used
                json.map((product: { [x: string]: any; }) => {
                   delete product["image"]; 
                   delete product["rating"];
                   product["quantity"] = Math.floor(Math.random() * 50);
                })
                
                fs.writeFileSync('products.json', JSON.stringify(json, null, 2))
            })
    }

    public static async getAllProducts(): Promise<Product[]> {
        const productList = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
        return productList;
    }

    private static async createJsonFile(path: string, products: Product[]): Promise<void> {
        fs.writeFileSync(path, JSON.stringify(products, null, 2))
    }

    public static async createProduct(product: Product): Promise<number>{
        const productNameRegex: RegExp = /^[A-Za-z\s]{3,50}$/;
        const priceRegex: RegExp = /^\d+(\.\d+)?$/;
        const quantityRegex: RegExp = /^[1-9]\d*$/;

        if(!productNameRegex.test(product.title) 
            || !priceRegex.test(String(product.price))
            || !quantityRegex.test(String(product.quantity))){
                return 400;
        }

        let productList = await this.getAllProducts().then(
            res => {
                res.push(product)
                this.createJsonFile('products.json', res)
            }  
        );
        
        return 200;
    }

    
}