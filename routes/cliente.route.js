import { Router } from 'express';
import clientRoute from './cliente.route.js';

const router = Router();

router.use("/cliente", clientRoute);

export default router;