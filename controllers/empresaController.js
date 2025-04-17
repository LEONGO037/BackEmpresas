const { getEmpresaById, getEmpresaDetalleById } = require('../models/empresa');

const getEmpresa = async (req, res) => {
    const { id } = req.params;

    try {
        const empresa = await getEmpresaById(id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la empresa', error: error.message });
    }
};


const formatearFecha = (fecha) => {
    if (!fecha) return null;
    return new Date(fecha).toISOString().split('T')[0];
  };

const obtenerDetalleEmpresa = async (req, res) => {
  const { id } = req.params;

  try {
    const empresaDetalle = await getEmpresaDetalleById(id);

    if (empresaDetalle.length === 0) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    // Función para formatear fechas
    const formatearFecha = (fecha) => {
      if (!fecha) return null;
      return new Date(fecha).toISOString().split('T')[0];
    };

    // Estructura base
    const empresaConsolidada = {
      id_empresa: empresaDetalle[0].id_empresa,
      denominacion_social: empresaDetalle[0].denominacion_social,
      nombre_comercial: empresaDetalle[0].nombre_comercial,
      nit: empresaDetalle[0].nit,
      fecha_fundacion: formatearFecha(empresaDetalle[0].fecha_fundacion),
      fecha_cierre: formatearFecha(empresaDetalle[0].fecha_cierre),
      ubicacion_principal: {
        departamento: empresaDetalle[0].nombre_depto,
        ciudad: empresaDetalle[0].nombre_ciudad,
        municipio: empresaDetalle[0].nombre_municipio,
      },
      tipo_societario: {
        nombre: empresaDetalle[0].nombre_tipsoc,
        fecha_inicio: formatearFecha(empresaDetalle[0].fecha_inicio_societario),
        fecha_fin: formatearFecha(empresaDetalle[0].fecha_fin_societario),
      },
      premios: [],
      items: [],
      tamanio: {
        nombre: empresaDetalle[0].nombre_tamanio,
        fecha_inicio: formatearFecha(empresaDetalle[0].fecha_inicio_tamanio),
        fecha_fin: formatearFecha(empresaDetalle[0].fecha_fin_tamanio),
        num_empleados: empresaDetalle[0].num_empleados,
      },
      actividad: {
        nombre: empresaDetalle[0].nombre_actividad,
        fecha_inicio: formatearFecha(empresaDetalle[0].fecha_inicio_actividad),
        fecha_fin: formatearFecha(empresaDetalle[0].fecha_fin_actividad),
      },
      propietarios: [],
    };

    // Procesar arrays
    empresaDetalle.forEach((fila) => {
      // Premios
      if (fila.entidad_otorgadora && !empresaConsolidada.premios.some(p => p.entidad_otorgadora === fila.entidad_otorgadora)) {
        empresaConsolidada.premios.push({
          entidad_otorgadora: fila.entidad_otorgadora,
          fecha: formatearFecha(fila.fecha_premio),
        });
      }

      // Items
      if (fila.nombre_item && !empresaConsolidada.items.some(i => i.nombre === fila.nombre_item)) {
        empresaConsolidada.items.push({
          nombre: fila.nombre_item,
          fecha_inicio: formatearFecha(fila.fecha_inicio_item),
          fecha_fin: formatearFecha(fila.fecha_fin_item),
        });
      }

      // Propietarios
      if (fila.nombre_propietario && !empresaConsolidada.propietarios.some(p => p.nombre === `${fila.nombre_propietario} ${fila.apellido_paterno} ${fila.apellido_materno}`)) {
        empresaConsolidada.propietarios.push({
          nombre: `${fila.nombre_propietario} ${fila.apellido_paterno} ${fila.apellido_materno}`.trim(),
          fecha_inicio: formatearFecha(fila.fecha_inicio_propietario),
          fecha_fin: formatearFecha(fila.fecha_fin_propietario),
        });
      }
    });

    res.json(empresaConsolidada);

  } catch (error) {
    console.error('Error al obtener detalle de la empresa:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getEmpresa, obtenerDetalleEmpresa };
