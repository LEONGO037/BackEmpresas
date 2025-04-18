import express from 'express';
import hitosController from '../controllers/hitosController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   definitions:
 *     Hito:
 *       type: object
 *       properties:
 *         descripcion:
 *           type: string
 * 
 * tags:
 *   - name: Hitos
 *     description: Operaciones con hitos de empresas
 * 
 * /hitos:
 *   get:
 *     tags:
 *       - Hitos
 *     summary: Obtiene hitos agrupados por descripción
 *     description: Retorna una lista de hitos agrupados por descripción
 *     responses:
 *       200:
 *         description: Lista de hitos agrupados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 hitos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/definitions/Hito'
 *       404:
 *         description: No se encontraron hitos
 *       500:
 *         description: Error interno del servidor
 */

router.get('/hitos', hitosController.obtenerHitosAgrupados);

/**
 * @swagger
 * /hitos:
 *   post:
 *     tags:
 *       - Hitos
 *     summary: Crea un nuevo hito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_empresa:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               fecha_h:
 *                 type: string
 *                 format: date
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hito creado correctamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error interno del servidor
 */

router.post('/hitos', hitosController.crearHito);

export default router;