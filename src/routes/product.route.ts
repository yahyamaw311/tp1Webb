import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import Joi from 'joi';

const productRoutes = Router();
const productController = new ProductController();

//productRoutes.get('/', productController.generateProductJson);


productRoutes.get('/', productController.getAllProducts)

productRoutes.post('/', productController.createProduct)

productRoutes.put('/:id', productController.modifyProduct)

productRoutes.delete('/:id', productController.deleteProduct)

export default productRoutes;