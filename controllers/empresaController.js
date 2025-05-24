import {
  getEmpresaPorId,
  obtenerTodasEmpresasResumen
} from '../models/empresaModel.js';

export const getTodasEmpresasResumen = async (req, res) => {
  try {
    const empresas = await obtenerTodasEmpresasResumen();
    res.json(empresas);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export async function obtenerEmpresaPorId(req, res) {
  const { id } = req.params;

  // Validación manual (sin express-validator)
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID inválido, debe ser numérico' });
  }

  try {
    const empresa = await getEmpresaPorId(Number(id));
    if (!empresa.length) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    res.json(empresa);
  } catch (error) {
    console.error('Error al obtener empresa:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
}