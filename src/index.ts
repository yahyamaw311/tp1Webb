import app from './app';
import { config } from './config/config';
import https from 'https';
import fs from 'fs';

const port = config.port;
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

https.createServer(options, app).listen(port, () => {
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${port}`);
})