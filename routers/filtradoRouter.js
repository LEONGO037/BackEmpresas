import { Router } from 'express';
import { filtrarController} from '../controllers/filtrarController.js';   

const router = Router();

// Rutas para el filtrado de empresas por Año de Fundacion
router.get('/anio_fundacion/:aniosCumplidos', filtrarController.filtrarAnioFundacion);

// Rutas para el filtrado de empresas por Departamento
router.get('/departamento/:nombre_depto', filtrarController.filtrarDepartamento);

// Rutas para el filtrado de empresas por Rubro
router.get('/rubro/:nombre_rubro', filtrarController.filtrarRubro);

export default router;