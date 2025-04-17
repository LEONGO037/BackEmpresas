const express = require('express');
const app = express();
const port = 3000;

// Importar y usar el router
const empresaRouter = require('./routers/empresaRouter');

// Middleware para parsing de JSON
app.use(express.json());

// Usar el router de empresa
app.use('/empresa', empresaRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
