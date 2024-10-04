import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { Product } from "../interfaces/product.interface";

export class ProductController{
    
    public async generateProductJson(req: Request, res: Response): Promise<void>{

        const products = await ProductService.generateProductJson();

        res.json(products);
    }

    public async getAllProducts(req: Request, res: Response): Promise<void>{

        const allProducts = await ProductService.getAllProducts();
        res.json(allProducts);
    }
}