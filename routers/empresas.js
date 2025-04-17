
import express from 'express';
import { getEmpresaDetalle } from '../controllers/empresaController.js';

const router = express.Router();

router.get('/empresa/:id', getEmpresaDetalle);

export default router;

