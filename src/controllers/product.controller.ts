import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { Product } from "../interfaces/product.interface";
import { string } from "joi";
import { ProductModel } from "../models/product.model";

export class ProductController{
    
    public async generateProductJson(req: Request, res: Response): Promise<void>{

        const products = await ProductService.generateProductJson();
        res.json(products);
    }

    public async getAllProducts(req: Request, res: Response): Promise<void>{
        
        try{
            const allProducts = await ProductService.getAllProducts();
            res.status(200).json(allProducts);
        }catch(error){
            console.log("erreur fetching data")
            res.status(400).send("error fetching data probably because data set is empty")
        }
    }

    public async createProduct(req: Request, res: Response): Promise<void>{
        const productTitle: string = req.body.productTitle;
        const productDescription: string = req.body.productDescription;
        const productPrice: number = req.body.productPrice;
        const productQuantity: number = req.body.productQuantity;

        let newProduct: ProductModel = new ProductModel(productTitle, productPrice, productDescription, productQuantity);
    
        const createdProductResult = await ProductService.createProduct(newProduct);
        console.log(createdProductResult)
    
    }

}