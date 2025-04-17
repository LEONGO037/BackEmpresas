
import { obtenerEmpresaPorId } from '../models/empresaModel.js';

export const getEmpresaDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await obtenerEmpresaPorId(id);

    if (!empresa) {
      return res.status(404).json({ mensaje: 'Empresa no encontrada' });
    }

    res.json(empresa);
  } catch (error) {
    console.error('Error al obtener detalles de la empresa:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
