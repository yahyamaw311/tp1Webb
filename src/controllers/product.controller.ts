import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { Product } from "../interfaces/product.interface";
import { string } from "joi";
import { ProductModel } from "../models/product.model";

export class ProductController{
    
    public static async generateProductJson(req: Request, res: Response): Promise<void>{
        const products = await ProductService.generateProductJson();
        res.json(products);

        // mettre la condition de fichier doit etre vide ici
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


    public async deleteProduct(req: Request, res: Response): Promise<void>{
        const idRegex: RegExp = /^[0-9]+$/;
        if(!idRegex.test(req.params.id)){
            res.status(400).json({ message: "Erreur de donnée"});
            return;
        }
        const productId: number = parseInt(req.params.id);
        const deleteStatus: void = await ProductService.deleteProduct(productId).then(
            Deleted => {
                Deleted ? res.status(204).json() : res.status(404).json({message: "l'élément est introuvable"});
            }
        )
    }

    public async modifyProduct(req: Request, res: Response): Promise<void>{
        const productNameRegex: RegExp = /^[A-Za-z\s]{3,50}$/;
        const priceRegex: RegExp = /^\d+(\.\d+)?$/;
        const quantityRegex: RegExp = /^[1-9]\d*$/;
        const idRegex: RegExp = /^[0-9]+$/;
        if(!idRegex.test(req.params.id) || !productNameRegex.test(req.body.title)
            || !priceRegex.test(req.body.price) || !quantityRegex.test(req.body.quantity)){
            res.status(400).json({ message: "Erreur de donnée"});
            return;
        }
        
        const productToModify : Product = new ProductModel(req.body.title, parseFloat(req.body.price), req.body.description,  parseInt(req.body.quantity),  parseInt(req.params.id))
        
        await ProductService.modifyProduct(productToModify).then(
            result => {
                result ? res.status(201).json({ message: "création réussie"}) : res.status(404).json({ message: "l'élément est introuvable"}) 
            }
        )
        
    }

}