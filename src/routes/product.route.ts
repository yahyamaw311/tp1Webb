import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import Joi from 'joi';




const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/', productController.generateProductJson);


/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: utilisateur non trouvé
 */
productRoutes.get('/products', productController.getAllProducts)

productRoutes.post('/product', productController.createProduct)

export default productRoutes;