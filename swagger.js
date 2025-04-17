// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Empresas',
    version: '1.0.0',
    description: 'Documentación de la API para consultar detalles de empresas',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routers/*.js'], // Acá irán tus anotaciones JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
