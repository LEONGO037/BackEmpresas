import sedesModel from '../models/sedesModel.js';

const obtenerSedesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sedes = await sedesModel.obtenerTodasSedesById(id);
    
    if (!sedes) {
      return res.status(404).json({ mensaje: 'Sedes no encontradas' });
    }
  
      res.json(sedes);
    } catch (error) {
      console.error('Error al obtener las sedes de la empresa:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const obtenerMunCiuDeptos = async (req, res) => {
  try {
    const sedes = await sedesModel.obtenerMunCiuDeptos();
    
    if (!sedes) {
      return res.status(404).json({ mensaje: 'Municipios, ciudades y departamentos no encontrados' });
    }
  
      res.json(sedes);
    } catch (error) {
      console.error('Error al obtener los municipios, ciudades y departamentos:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

export default {
  obtenerSedesById,
  obtenerMunCiuDeptos,
};
