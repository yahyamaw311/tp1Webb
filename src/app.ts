import express from 'express';
import ProductRoutes from "./routes/product.route";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

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
            url: 'http://localhost:3000',
        },
    ],
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json())

app.use('/v1/', (req, res) => {
    res.send("This is the store api v1")
});

app.use('/v1/products/', ProductRoutes);

export default app;