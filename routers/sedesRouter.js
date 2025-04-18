import express from 'express';
import sedesController from '../controllers/sedesController.js';

const router = express.Router();

/**
 * @swagger
 * /sedes/empresa/{id}:
 *   get:
 *     summary: Obtener las sedes de una empresa
 *     tags:
 *       - Sedes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Detalle de las sedes de la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_edificio:
 *                   type: string
 *                 zona:
 *                   type: string
 *                 calle:
 *                   type: string
 *                 referencias:
 *                   type: string
 *                 nombre_municipio:
 *                   type: string
 *                 nombre_ciudad:
 *                   type: string
 *                 nombre_depto:
 *                   type: string
 *                 fecha_inicio:
 *                   type: string
 *                   format: date
 *                 fecha_fin:
 *                   type: string
 *                   format: date
 *                   nullable: yes
 *       404:
 *         description: Sedes no encontradas
 *       500:
 *         description: Error interno del servidor
 */

router.get('/empresa/:id', sedesController.obtenerSedesById);

/**
 * @swagger
 * /sedes/munciudeptos:
 *   get:
 *     summary: Obtener los municipios, ciudades y departamentos de las sedes de las empresas
 *     tags:
 *       - Sedes
 *     responses:
 *       200:
 *         description: Municipios, ciudades y departamentos de las sedes de las empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_municipio:
 *                   type: string
 *                 nombre_ciudad:
 *                   type: string
 *                 nombre_departo:
 *                   type: string
 *       404:
 *         description: unicipios, ciudades y departamentos no encontrados
 *       500:
 *         description: Error interno del servidor
 */

router.get('/munciudeptos', sedesController.obtenerMunCiuDeptos);

export default router;
