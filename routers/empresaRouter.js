// router.js
const express = require('express');
const router = express.Router();
const { getEmpresa, obtenerDetalleEmpresa} = require('../controllers/empresaController');

// Ruta para obtener detalle de empresa por ID (DEBE IR PRIMERO)
router.get('/detalle/:id', obtenerDetalleEmpresa);

// Ruta para obtener una empresa por ID (GENERAL)
router.get('/:id', getEmpresa);

module.exports = router;