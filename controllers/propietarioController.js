import Propietario from '../models/Propietario.js';
import Familia from '../models/Familia.js';
import HistorialPropiedad from '../models/HistorialPropiedad.js';

export const createPropietario = async (req, res) => {
  try {
    const { familiaNombre, ...propietarioData } = req.body;
    
    const familiaId = await Familia.create(familiaNombre);
    const propietarioId = await Propietario.create({
      ...propietarioData,
      id_familia: familiaId
    });

    await HistorialPropiedad.create({
      id_propietario: propietarioId,
      id_empresa: propietarioData.id_empresa,
      fecha_inicio: propietarioData.fecha_inicio,
      fecha_fin: propietarioData.fecha_fin,
      familia_activo: propietarioData.es_familia
    });

    res.status(201).json({ success: true, id: propietarioId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropietariosByEmpresa = async (req, res) => {
  try {
    const { empresaId } = req.params;
    const result = await Propietario.getByEmpresa(empresaId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPropietarios = async (req, res) => {
  try {
    const result = await Propietario.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createPropietario,
  getPropietariosByEmpresa,
  getAllPropietarios
};