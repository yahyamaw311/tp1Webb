import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { Product } from "../interfaces/product.interface";
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
            res.status(400).json({message: "error fetching data"})
        }
    }

    public async createProduct(req: Request, res: Response): Promise<void>{
        const productNameRegex: RegExp = /^[A-Za-z\s]{3,50}$/;
        const priceRegex: RegExp = /^\d+(\.\d+)?$/;
        const quantityRegex: RegExp = /^[1-9]\d*$/;

        const {productTitle, productDescription, productPrice, productQuantity} = req.body;
        if(!productNameRegex.test(productTitle) 
            || !priceRegex.test(String(productPrice))
            || !quantityRegex.test(String(productQuantity))){
                res.status(400).json({message: "creation failed"});
                return;
        }

        let newProduct: ProductModel = new ProductModel(productTitle, productPrice, productDescription, productQuantity);
    
        const createdProductResult = await ProductService.createProduct(newProduct).then(
            isCreated => {
                isCreated === true? res.status(201).json({message: "product created", product: newProduct}) : res.status(400).json({message: "creation failed"})
            }
        )
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
        const productNameRegex: RegExp = /^[A-Za-z0-9\s]{3,50}$/;
        const priceRegex: RegExp = /^\d+(\.\d+)?$/;
        const quantityRegex: RegExp = /^[1-9]\d*$/;
        const idRegex: RegExp = /^[0-9]+$/;
        const {title, price, description, quantity} = req.body;
        if(!idRegex.test(req.params.id) || (!productNameRegex.test(title) && title)
            || (!priceRegex.test(price) && price) || (!quantityRegex.test(quantity) && quantity)){
            res.status(400).json({ message: "Erreur de donnée"});
            return;
        }
        
        await ProductService.modifyProduct(parseInt(req.params.id), title, description, parseFloat(price), parseInt(quantity)).then(
            result => {
                result ? res.status(200).json({ message: "modification réussie"}) : res.status(404).json({ message: "l'élément est introuvable"}) 
            }
        )
        
    }

}