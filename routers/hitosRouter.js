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

export default router;