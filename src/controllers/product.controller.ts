import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { Product } from "../interfaces/product.interface";

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
        console.log(req.body.testies);
        // 1. verifier que tout les elements sont la, sinon retourner 400 or sum
        // 2 transformer en Product
        // 3. l<ajouter a la liste
    }

}