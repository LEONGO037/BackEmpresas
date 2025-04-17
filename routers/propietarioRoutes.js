import express from 'express';
import {
  createPropietario,
  getPropietariosByEmpresa,
  getAllPropietarios
} from '../controllers/propietarioController.js';

const router = express.Router();

router.post('/', createPropietario);
router.get('/empresa/:empresaId', getPropietariosByEmpresa);
router.get('/', getAllPropietarios);

export default router;