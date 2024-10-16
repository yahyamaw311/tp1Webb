import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authentificateToken, authorizeRole} from "../middlewares/user.middleware"

const productRoutes = Router();
const productController = new ProductController();

//productRoutes.get('/', productController.generateProductJson);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your access token here
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /products/:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrive a list of products from the API. Can be used to view all the products currently availible
 *     tags: [product]
 *     security:
 *       - bearerAuth: []
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
 *                   title:
 *                     type: string
 *                     example: Samsung S24 Ultra 
 *                   price:
 *                     type: float
 *                     example: 1499.99
 *                   description:
 *                     type: string
 *                     example: Samsung mobile phone
 *                   category:
 *                     type: string
 *                     example: Mobile phone
 *                   quantity:
 *                     type: integer
 *                     example: 25
 *       400:
 *          description: erreur de donnée. Probablement parcequ'il n'y a aucun produit
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                      example: erreur de donnée, probablement dans le filtrage
 *       401:
 *          description: utilisateur non autorisé
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                      example: utilisateur non autorisé à effectuer de telles requêtes
 *       500:
 *          description: erreur dinterne
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                      example: erreur internes, veuillez réessayer plus tard
 */
productRoutes.get('/', authentificateToken, authorizeRole(["gestionnaire", "employee"]), productController.getAllProducts)




/**
 * @swagger
 * /products/:
 *   post:
 *     summary: Creates a product
 *     description: Creates a product and sends it to the database
 *     tags: [product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productTitle:
 *                 type: string
 *                 example: iphone
 *               productDescription:
 *                 type: string
 *                 example: A mobile phone made by Apple
 *               productPrice:
 *                 type: float
 *                 example: 899.99
 *               productQuantity:
 *                 type: integer
 *                 example: 29
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: produit créé
 *       400:
 *         description: Error in product validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wrong Data format
 *       401:
 *        description: User not allowed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: User not allowed to make such requests
 */
productRoutes.post('/', authentificateToken, authorizeRole(["gestionnaire"]), productController.createProduct)

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Modifies a product
 *     description: Modifies a product in the database
 *     tags: [product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric id of the product to modify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: iphone 16
 *               description:
 *                 type: string
 *                 example: A mobile phone made by Apple
 *               price:
 *                 type: float
 *                 example: 899.99
 *               quantity:
 *                 type: integer
 *                 example: 29
 *     responses:
 *       200:
 *         description: Product modified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: produit modifié
 *       400:
 *         description: Error in product validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wrong Data format
 *       401:
 *         description: User not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not allowed to make such requests
 *       404:
 *         description: Product not in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product has not been found in the database
 */
productRoutes.put('/:id', authentificateToken, authorizeRole(["gestionnaire"]), productController.modifyProduct)



/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deletes a product
 *     description: Deletes a product in the database
 *     tags: [product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric id of the product to modify
 *     responses:
 *       204:
 *         description: Product deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product Deleted
 *       400:
 *         description: Error in product validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wrong Data format
 *       401:
 *         description: User not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not allowed to make such requests
 *       404:
 *         description: Product not in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product has not been found in the database
 */
productRoutes.delete('/:id' ,authentificateToken, authorizeRole(["gestionnaire"]), productController.deleteProduct)

export default productRoutes;