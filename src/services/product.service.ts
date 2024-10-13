import { Product } from '../interfaces/product.interface';
import { ProductModel } from '../models/product.model';
import * as fs from 'fs';


export class ProductService{

    private static path: string = "products.json";

    public static async generateProductJson() {
        // ilfaut mettre un await ici
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

    public static async createProduct(product: Product): Promise<boolean>{

        try{
            await this.getAllProducts().then(
                res => {
                    res.push(product)
                    this.createJsonFile(this.path, res)
                }  
            );
            return true;
            
        }catch(error){
            return false;
        }
        
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

    public static async modifyProduct(id:number, title?: string, description?: string, price?: number, quantity?: number): Promise<boolean>{

        return await this.getAllProducts().then(
            productList => {
                const product = productList.findIndex(p => p.id === id)
                if(product === -1) return false;

                productList[product] = {
                    ...productList[product],
                    title: title || productList[product].title,
                    description: description || productList[product].description,
                    price: price || productList[product].price,
                    quantity: quantity || productList[product].quantity
                };   

                this.createJsonFile(this.path, productList);
                return true;
            }    
        )
    } 

    
}