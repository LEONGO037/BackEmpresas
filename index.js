const express = require('express');
const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Configuración de Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Definir opciones de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'APIS',
      version: '1.0.0',
      description: 'Documentación de las APIS',
    },
  },
  apis: ['./controllers/*.js', './routes/*.js'], // Rutas y controladores a documentar
};

// Generar especificaciones Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Usar Swagger UI para visualizar la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Importar y usar rutas
const usuarioRoutes = require('./routers/usuarioRouter');
app.use('/usuarios', usuarioRoutes); // Las rutas estarán bajo /usuarios

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
