import ingresarEmpresaModel from '../models/ingresarEmpresaModel.js';
import logsModel from '../models/logsModel.js';

const crearEmpresa = async (req, res) => {
  const requiredFields = [
    'denominacion_social',
    'nombre_comercial',
    'fecha_fundacion',
    'nit',
    'vision',
    'mision',
    'descripcion',
    'url',
    'direccion_web',
    'id_actividad',
    'id_tamanio'
  ];

  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      mensaje: `Faltan campos requeridos: ${missingFields.join(', ')}`
    });
  }

  try {
    const idEmpresa = await ingresarEmpresaModel.insertarEmpresa(req.body);
    const { id_usuario } = req.body;
    await logsModel.registrarLog({id_usuario, tabla: 'empresas', tipo_log: 'INSERT'});

    res.status(201).json({
      mensaje: 'Empresa creada exitosamente',
      id_empresa: idEmpresa
    });
  } catch (error) {
    console.error('Error en crearEmpresa:', error);
    res.status(500).json({
      mensaje: 'Error del servidor al crear la empresa'
    });
  }
};



export default {
  crearEmpresa,
};
