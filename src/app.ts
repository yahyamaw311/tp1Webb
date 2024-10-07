import express from 'express';
import productRoutes from "./routes/product.route";
import userRoutes from "./routes/user.route";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as testies from './middlewares/user.middleware'

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Store API',
            version: '1.0.0',
            description: 'A simple API to manage products',
        },
    },
    apis: ['src/routes/*.route.ts']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json())
app.use('/products', productRoutes);
app.use('/users', userRoutes)

app.use('/', (req, res) => {
    res.send("This is the store api v1");
});





export default app;