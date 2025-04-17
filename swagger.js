import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestión Empresarial',
    version: '1.0.0',
    description: 'Documentación completa de la API para el sistema de gestión empresarial',
    contact: {
      name: 'Equipo de Desarrollo',
      email: 'soporte@empresa.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo local'
    },
    {
      url: 'https://api.empresa.com/v1',
      description: 'Servidor de producción'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Empresa: {
        type: 'object',
        properties: {
          id_empresa: {
            type: 'integer',
            example: 1
          },
          nombre_comercial: {
            type: 'string',
            example: 'Tech Solutions'
          },
          fecha_fundacion: {
            type: 'string',
            format: 'date',
            example: '2010-05-15'
          },
          nit: {
            type: 'string',
            example: '123456789'
          },
          url: {
            type: 'string',
            example: 'http://techsolutions.com'
          },
          propietarios: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['Juan Pérez López', 'María García Fernández']
          },
          items: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['Software empresarial', 'Soporte técnico']
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Mensaje de error descriptivo'
          },
          detalle: {
            type: 'string',
            example: 'Detalle técnico del error (solo en desarrollo)'
          }
        }
      },
      BusquedaParams: {
        type: 'object',
        properties: {
          nombre_empresa: {
            type: 'string',
            description: 'Nombre o parte del nombre comercial de la empresa',
            example: 'tech'
          },
          nombre_fundador: {
            type: 'string',
            description: 'Nombre del fundador (solo busca por nombre)',
            example: 'juan'
          },
          item: {
            type: 'string',
            description: 'Nombre o parte del nombre de un item asociado',
            example: 'software'
          },
          actividad: {
            type: 'string',
            description: 'Nombre o parte del nombre de una actividad',
            example: 'tecnologia'
          }
        }
      }
    },
    responses: {
      NotFound: {
        description: 'Recurso no encontrado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse'
            },
            example: {
              error: 'No se encontraron empresas con los criterios proporcionados',
              parametros_usados: {
                nombre_empresa: 'tech',
                nombre_fundador: 'juan',
                item: 'app',
                actividad: 'de'
              }
            }
          }
        }
      },
      BadRequest: {
        description: 'Petición incorrecta',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse'
            },
            example: {
              error: 'Debe proporcionar al menos un criterio de búsqueda',
              ejemplo_valido: '/busquedas?nombre_empresa=tech'
            }
          }
        }
      },
      ServerError: {
        description: 'Error interno del servidor',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse'
            },
            example: {
              error: 'Error en la búsqueda',
              detalle: 'Mensaje detallado del error (solo en desarrollo)'
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Búsquedas',
      description: 'Endpoints para búsqueda avanzada de empresas'
    },
    {
      name: 'Empresas',
      description: 'Gestión de empresas'
    },
    {
      name: 'Usuarios',
      description: 'Gestión de usuarios'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: [
    './routers/*.js',
    './controllers/*.js' // También puedes documentar directamente en los controladores
  ]
};

const swaggerSpec = swaggerJSDoc(options);

// Configuración adicional de la UI de Swagger
const swaggerUiOptions = {
  explorer: true,
  customSiteTitle: 'Documentación API Empresas',
  customCss: '.swagger-ui .topbar { display: none }',
  customfavIcon: '/favicon.ico'
};

export { swaggerUi, swaggerSpec, swaggerUiOptions };