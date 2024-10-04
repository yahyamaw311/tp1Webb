import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import Joi from 'joi';




const ProductRoutes = Router();
const productController = new ProductController();

ProductRoutes.get('/', productController.generateProductJson);


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
ProductRoutes.get('/products', productController.getAllProducts)

export default ProductRoutes;