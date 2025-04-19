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

const insertarSede = async (req, res) => {
  const { id_empresa, id_municipio, zona, calle, referencias, nombre_edificio, longitud, latitud, fecha_inicio, fecha_fin, tipo } = req.body;
  
  if ( !id_empresa || !id_municipio || !zona || !calle || !referencias || !nombre_edificio || !longitud || !latitud || !fecha_inicio ) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
  }

  const row_exists = await sedesModel.verifySede(id_empresa, id_municipio, zona, calle, referencias, nombre_edificio);
  console.log(row_exists);
  if(row_exists === true){
    return res.status(400).json({ mensaje: 'La sede ya ha sido registrada.' });
  }

  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaRegex.test(fecha_inicio) || isNaN(new Date(fecha_inicio).getTime())) {
    return res.status(400).json({
      mensaje: 'Formato de fecha inválido. Use YYYY-MM-DD'
    });
  }

  if(fecha_fin) {
    if (!fechaRegex.test(fecha_fin) || isNaN(new Date(fecha_fin).getTime())) {
      return res.status(400).json({
        mensaje: 'Formato de fecha inválido. Use YYYY-MM-DD'
      });
    }
  }

  try {
      const id_ubicacion = await sedesModel.newSede(id_municipio, zona, calle, referencias, nombre_edificio, longitud, latitud);

      const msg = await sedesModel.newSedeEmpresa(id_empresa, id_ubicacion.id_ubicacion, fecha_inicio, fecha_fin, tipo);
      return res.status(200).json({ mensaje: msg });
  } catch (error) {
      console.error('Error al obtener los items de la empresa:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export default {
  obtenerSedesById,
  obtenerMunCiuDeptos,
  insertarSede
};
