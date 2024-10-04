import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const ProductRoutes = Router();
const productController = new ProductController();

ProductRoutes.get('/', productController.generateProductJson);


/**
 * @swagger
 * /products/products:
 *   get:
 *     summary: fetch products from website
 *     description: fetch a list of products from a website to populate the database
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
ProductRoutes.get('/products', productController.getAllProducts)

export default ProductRoutes;