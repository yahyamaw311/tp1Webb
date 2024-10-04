import { Product } from '../interfaces/product.interface';
import { ProductModel } from '../models/product.model';
import * as fs from 'fs';


export class ProductService{

    productList: Product[] = [];
    private static path: string = "products.json";

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
                
                fs.writeFileSync(this.path, JSON.stringify(json, null, 2))
            })
    }

    public static async getAllProducts(): Promise<Product[]> {
        const productList = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
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
                this.createJsonFile(this.path, res)
            }  
        );
        
        return 200;
    }

    public static async deleteProduct(productId: number): Promise<boolean>{
        return await this.getAllProducts().then(
            productList => {
                const productToDeleteIndex = productList.findIndex(p => p.id === productId);

                if(productToDeleteIndex === -1) return false;

                const deletedProduct = productList.splice(productToDeleteIndex, 1);

                this.createJsonFile(this.path, productList);
                return true;
            }
        )
    }

    public static async modifyProduct(productToModify: Product): Promise<boolean>{
        console.log(productToModify);

        return await this.getAllProducts().then(
            productList => {
                const product = productList.findIndex(p => p.id === productToModify.id)
                if(product === -1) return false;

                productList.splice(product, 1, productToModify)
                this.createJsonFile(this.path, productList);
                return true;
            }    
        )
    } 

    
}