import express from 'express'
import ProductController from '../controllers/productController'
import { validate } from '../middlewares/validationMiddleware';
import { CreateProductSchema } from '../models/ProductSchema';

const router = express.Router();

/**
 * @openapi
 * /product/get-all:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente.
 */
router.get('/get-all', 
  ProductController.GetProduct);

/**
 * @openapi
 * /v1/product/create:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDTO'
 *       400:
 *         description: Error de validación o datos inválidos
 */
router.post('/create',
  validate(CreateProductSchema),
  ProductController.CreateProduct);

/**
 * @openapi
 * /product/delete/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *       404:
 *         description: Producto no encontrado.
 */
router.delete('/delete/:id', ProductController.DeleteProduct)

export default router;

