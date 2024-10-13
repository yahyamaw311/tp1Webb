import { Product } from '../interfaces/product.interface';
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

    public static async getAllProductsFiltered(productFilters: any): Promise<Product[]> {
        return await this.getAllProducts().then(
            productList => {
                // si jamais minPrice et maxPrice sont tous les deux là et que minPrice est plus grand que maxPrice, alors la condition sera vrai
                // et vu qu'on veut éviter ca, on met un "!" devant pour que la condition finale devienne fausse.
                // si l'un d'eux est absent, alors la condition sera fausse ce qui va automatiquement donné une condition finale vraie
                if(! (productFilters.minPrice && productFilters.maxPrice && productFilters.minPrice > productFilters.maxPrice) ){
                    if(productFilters.minPrice){
                        productList = productList.filter(product => product.price >= productFilters.minPrice)
                    }
                    if(productFilters.maxPrice){
                        productList = productList.filter(product => product.price <= productFilters.maxPrice)
                    }
                }

                // meme logique ici
                if(! (productFilters.minQuantity && productFilters.maxQuantity && productFilters.minQuantity > productFilters.maxQuantity) ){
                    if(productFilters.minQuantity){
                        productList = productList.filter(product => product.quantity >= productFilters.minQuantity)
                    }
                    if(productFilters.maxQuantity){
                        productList = productList.filter(product => product.quantity <= productFilters.maxQuantity)
                    }
                }

                return productList;
            }
        )
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


    public static regexTester(){
        // to do because of redendency in regex testing in other functions
    }

}