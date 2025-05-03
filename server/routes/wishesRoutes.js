import express from 'express';
import { getWishes, createWish, updateWish, deleteWish } from '../controllers/wishController.js';

const router = express.Router();

// Obtener todos los deseos
router.get('/wishes', getWishes);

// Crear un nuevo deseo
router.post('/wishes', createWish);

// Actualizar un deseo
router.put('/wishes/:id', updateWish);

// Eliminar un deseo
router.delete('/wishes/:id', deleteWish);

export default router; 