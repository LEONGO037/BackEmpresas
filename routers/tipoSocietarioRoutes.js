import express from 'express';
import {
  getTiposSocietarios,
  createEmpresaTipoSocietario
} from '../controllers/tipoSocietarioController.js';

const router = express.Router();

router.get('/tipos-societarios', getTiposSocietarios);
router.post('/empresa-tipo-societario', createEmpresaTipoSocietario);

export default router;
