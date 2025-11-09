import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Productos (Express + TypeORM)',
      version: '1.0.0',
      description: 'Documentación interactiva de la API de productos.',
    },
    servers: [
      {
        url: 'http://localhost:6505/v1',
        description: 'Servidor de Desarrollo',
      },
    ],
  },
  // Archivos donde buscará las anotaciones JSDoc
  apis: ['src/routes/*.ts', 'src/controllers/*.ts', 'src/models/*.ts', ],
};

export default swaggerOptions;
