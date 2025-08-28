import express from 'express';
import celularesRoute from './celulares.route.js';

const router = express.Router();

router.use('/celulares', celularesRoute);

router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

export default router;