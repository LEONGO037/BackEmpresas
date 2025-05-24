import { busquedaModel } from '../models/busquedas.model.js';

// Función mejorada para sanitización y validación
const sanitizeSearchParam = (param) => {
    if (param === undefined || param === null) return null;
    
    // Convertir a string y eliminar espacios
    const str = param.toString().trim();
    
    // Validar longitud máxima razonable para parámetros de búsqueda
    if (str.length > 100) {
        throw new Error('El parámetro de búsqueda excede la longitud máxima permitida');
    }
    
    // Eliminar caracteres potencialmente peligrosos (ajustar según necesidades)
    const cleanStr = str.replace(/[;'"\\\-\-]/g, '');
    
    // Validar que el string no esté vacío después de limpieza
    if (cleanStr.length === 0) return null;
    
    return cleanStr;
};

const validateSearchParams = (params) => {
    // Validar que al menos un parámetro tenga valor válido
    const hasValidParam = Object.values(params).some(
        param => param !== null && param !== undefined && param.toString().trim().length > 0
    );
    
    if (!hasValidParam) {
        throw new Error('Debe proporcionar al menos un criterio de búsqueda válido');
    }
};

const getEmpresasFiltradas = async (req, res) => {
    try {
        // Sanitización y validación de parámetros
        const searchParams = {
            nombre_empresa: sanitizeSearchParam(req.query.nombre_empresa),
            nombre_fundador: sanitizeSearchParam(req.query.nombre_fundador),
            item: sanitizeSearchParam(req.query.item),
            actividad: sanitizeSearchParam(req.query.actividad),
            rubro: sanitizeSearchParam(req.query.rubro),
            tipo_societario: sanitizeSearchParam(req.query.tipo_societario)
        };

        // Validación de parámetros
        validateSearchParams(searchParams);

        // Array para almacenar las subconsultas
        const subqueries = [];
        const params = [];
        
        // Construcción dinámica de consultas con parámetros posicionales
        if (searchParams.nombre_empresa) {
            params.push(`%${searchParams.nombre_empresa}%`);
            subqueries.push(`
                SELECT id_empresa FROM empresas 
                WHERE nombre_comercial ILIKE $${params.length} 
                OR denominacion_social ILIKE $${params.length}
            `);
        }

        if (searchParams.nombre_fundador) {
            params.push(`%${searchParams.nombre_fundador}%`);
            subqueries.push(`
                SELECT ets.id_empresa 
                FROM empresas_tipos_societarios ets
                JOIN tipos_societarios ts ON ets.id_tipsoc = ts.id_tipsoc
                WHERE ts.nombre_tipsoc ILIKE $${params.length}
            `);
        }

        if (searchParams.item) {
            params.push(`%${searchParams.item}%`);
            subqueries.push(`
                SELECT ei.id_empresa
                FROM empresas_items ei
                JOIN items i ON ei.id_item = i.id_item
                WHERE i.nombre_item ILIKE $${params.length}
            `);
        }

        if (searchParams.actividad) {
            params.push(`%${searchParams.actividad}%`);
            subqueries.push(`
                SELECT e.id_empresa
                FROM empresas e
                JOIN actividades a ON e.id_actividad = a.id_actividad
                WHERE a.nombre_actividad ILIKE $${params.length}
            `);
        }

        if (searchParams.rubro) {
            params.push(`%${searchParams.rubro}%`);
            subqueries.push(`
                SELECT re.id_empresa
                FROM rubros_empresas re
                JOIN rubros r ON re.id_rubro = r.id_rubro
                WHERE r.nombre_rubro ILIKE $${params.length}
            `);
        }

        if (searchParams.tipo_societario) {
            params.push(`%${searchParams.tipo_societario}%`);
            subqueries.push(`
                SELECT ets.id_empresa
                FROM empresas_tipos_societarios ets
                JOIN tipos_societarios ts ON ets.id_tipsoc = ts.id_tipsoc
                WHERE ts.nombre_tipsoc ILIKE $${params.length}
                AND (ets.fecha_fin IS NULL OR ets.fecha_fin > CURRENT_DATE)
            `);
        }

        // Construcción de la consulta final usando parámetros posicionales
        let query = `
            SELECT DISTINCT 
                e.id_empresa, 
                e.nombre_comercial, 
                e.denominacion_social,
                e.fecha_fundacion, 
                e.nit, 
                e.url,
                e.direccion_web,
                a.nombre_actividad,
                te.nombre_tamanio,
                (
                    SELECT STRING_AGG(DISTINCT ts.nombre_tipsoc, ', ')
                    FROM empresas_tipos_societarios ets
                    JOIN tipos_societarios ts ON ets.id_tipsoc = ts.id_tipsoc
                    WHERE ets.id_empresa = e.id_empresa
                    AND (ets.fecha_fin IS NULL OR ets.fecha_fin > CURRENT_DATE)
                ) AS tipos_societarios,
                (
                    SELECT STRING_AGG(DISTINCT r.nombre_rubro, ', ')
                    FROM rubros_empresas re
                    JOIN rubros r ON re.id_rubro = r.id_rubro
                    WHERE re.id_empresa = e.id_empresa
                ) AS rubros,
                (
                    SELECT STRING_AGG(DISTINCT i.nombre_item, ', ')
                    FROM empresas_items ei
                    JOIN items i ON ei.id_item = i.id_item
                    WHERE ei.id_empresa = e.id_empresa
                    AND (ei.fecha_fin_c IS NULL OR ei.fecha_fin_c > CURRENT_DATE)
                ) AS items,
                (
                    SELECT STRING_AGG(DISTINCT CONCAT(m.nombre_municipio, ', ', c.nombre_ciudad, ', ', d.nombre_depto), '; ')
                    FROM sedes s
                    JOIN municipios m ON s.id_municipio = m.id_municipio
                    JOIN ciudades c ON m.id_ciudad = c.id_ciudad
                    JOIN departamentos d ON c.id_departamento = d.id_departamento
                    WHERE s.id_empresa = e.id_empresa
                ) AS ubicaciones
            FROM empresas e
            JOIN actividades a ON e.id_actividad = a.id_actividad
            JOIN tamanios_empresas te ON e.id_tamanio = te.id_tamanio
        `;

        if (subqueries.length > 0) {
            query += `WHERE e.id_empresa IN (\n${subqueries.join('\nINTERSECT\n')}\n)`;
        }

        query += `\nORDER BY e.nombre_comercial ASC LIMIT 100`;

        // Ejecutar consulta con parámetros separados
        const empresas = await busquedaModel.buscarEmpresas(query, params);
        
        if (empresas.length === 0) {
            return res.status(404).json({ 
                message: 'No se encontraron empresas con los criterios proporcionados',
                parametros_usados: searchParams,
                sugerencia: 'Intente con términos más generales o verifique los datos'
            });
        }

        // Formatear resultados
        const resultadosFormateados = empresas.map(empresa => ({
            id_empresa: empresa.id_empresa,
            nombre_comercial: empresa.nombre_comercial,
            denominacion_social: empresa.denominacion_social,
            fecha_fundacion: empresa.fecha_fundacion,
            nit: empresa.nit,
            url: empresa.url,
            direccion_web: empresa.direccion_web,
            actividad: empresa.nombre_actividad,
            tamanio: empresa.nombre_tamanio,
            tipos_societarios: empresa.tipos_societarios?.split(', ') ?? [],
            rubros: empresa.rubros?.split(', ') ?? [],
            items: empresa.items?.split(', ') ?? [],
            ubicaciones: empresa.ubicaciones?.split('; ').map(ubic => {
                const [municipio, ciudad, departamento] = ubic.split(', ');
                return { municipio, ciudad, departamento };
            }) ?? []
        }));

        res.json(resultadosFormateados);
    } catch (error) {
        console.error('Error en búsqueda:', error);
        
        if (error.message.includes('longitud máxima') || error.message.includes('criterio de búsqueda')) {
            return res.status(400).json({ 
                error: error.message,
                ejemplo_valido: '/busquedas?nombre_empresa=tech&rubro=tecnologia'
            });
        }
        
        res.status(500).json({ 
            error: 'Error en la búsqueda',
            detalle: process.env.NODE_ENV === 'development' ? error.message : 'Contacte al administrador'
        });
    }
};

export const busquedaController = {
    getEmpresasFiltradas
};