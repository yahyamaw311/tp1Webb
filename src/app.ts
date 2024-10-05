import express from 'express';
import productRoutes from "./routes/product.route";
import userRoutes from "./routes/user.route";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const app = express();


app.use(express.json())
app.use('/products', productRoutes);
app.use('/users', userRoutes)

app.use('/', (req, res) => {
    res.send("This is the store api v1");
});



export default app;