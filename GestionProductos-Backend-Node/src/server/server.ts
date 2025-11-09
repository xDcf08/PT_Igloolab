import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import productRoutes from '../routes/productRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '../config/swagger.config';

const app = express();

const swaggerSpec = swaggerJsdoc(swaggerOptions);
const allowedOrigins = ['http://localhost:5173'];

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan('dev'));

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(express.json());

app.use('/v1/product', productRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

export default app;