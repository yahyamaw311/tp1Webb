import express from 'express';
import productRoutes from "./routes/product.route";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { ProductController } from './controllers/product.controller';

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product API',
            version: '1.0.0',
            description: 'The API to manage the products',
        },
    },
    servers: [
        {
            url: 'https://localhost:3000',
        },
    ],
    apis: ['./routes/*.route.ts']
};



const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/products', productRoutes);

app.use('/', (req, res) => {
    res.send("This is the store api v1");
});



export default app;