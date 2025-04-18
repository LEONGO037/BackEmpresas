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

const crearHito = async (req, res) => {
  const { id_empresa, descripcion, fecha_h, url } = req.body;

  if (!id_empresa || !descripcion || !fecha_h || !url) {
    return res.status(400).json({
      mensaje: 'Faltan campos obligatorios',
      creado: 0
    });
  }

  try {
    const nuevoHito = await hitosModel.crearHito({ id_empresa, descripcion, fecha_h, url });
    res.status(201).json({
      mensaje: 'Hito creado correctamente',
      hito: nuevoHito
    });
  } catch (error) {
    console.error('Error en crearHito:', error);
    res.status(500).json({
      mensaje: 'Error del servidor',
      creado: 0
    });
  }
};

export default {
  obtenerHitosAgrupados,
  crearHito,
};
