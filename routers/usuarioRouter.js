import express from 'express';
import usuarioController from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/login', usuarioController.loginUsuario);

export default router;
