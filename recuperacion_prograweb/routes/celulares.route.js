import express from 'express';
import celularesController from '../controllers/celulares.controller.js';

const router = express.Router();

// GET /api/celulares - Obtener todos los celulares
router.get('/', celularesController.getAll);

// GET /api/celulares/:id - Obtener un celular por ID
router.get('/:id', celularesController.getById);

// POST /api/celulares - Crear un nuevo celular
router.post('/', celularesController.create);

export default router;