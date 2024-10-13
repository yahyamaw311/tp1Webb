import app from './app';
import { config } from './config/config';
import https from 'https';
import fs from 'fs';
import { ProductService } from './services/product.service';

const port = config.port;
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

https.createServer(options, app).listen(port, () => {
  ProductService.generateProductJson();
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${port}`);
})

