import 'dotenv/config';
import express from 'express';
import { Mongocelular } from './configs/mongodb.config.js';
import routes from './routes/index.route.js';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.use('/api', routes);

Mongocelular.connectToServer((err) => {
    if (err) {
        console.error('Error conectando a MongoDB:', err);
        return;
    }
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
});