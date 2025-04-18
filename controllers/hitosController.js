import hitosModel from '../models/hitosModel.js';

const obtenerHitosAgrupados = async (req, res) => {
  try {
    const hitos = await hitosModel.obtenerHitosAgrupados();
    
    if (hitos.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron hitos',
        encontrado: 0
      });
    }
    
    res.status(200).json({
      mensaje: 'Hitos encontrados',
      hitos: hitos
    });
  } catch (error) {
    console.error('Error en obtenerHitosAgrupados:', error);
    res.status(500).json({
      mensaje: 'Error del servidor',
      encontrado: 0
    });
  }
};

export default {
  obtenerHitosAgrupados,
};