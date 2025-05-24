import {
  getEmpresaPorId,
  getTodasEmpresasResumen
} from '../models/empresaModel.js';

export async function obtenerTodasEmpresasResumen(req, res) {
  try {
    const empresas = await getTodasEmpresasResumen();
    res.json(empresas);
  } catch (error) {
    console.error('Error al obtener resumen de empresas:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
}
export async function obtenerEmpresaPorId(req, res) {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID inválido, debe ser numérico' });
  }

  try {
    const empresa = await getEmpresaPorId(Number(id));
    if (!empresa) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    res.json(empresa);
  } catch (error) {
    console.error('❌ Error al obtener empresa:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
}