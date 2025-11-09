import { Product } from "./ProductEntity";

/**
 * @openapi
 * components:
 *   schemas:
 *     ProductDTO:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: El ID generado del producto.
 *           example: 123
 *         name:
 *           type: string
 *           description: Nombre del producto.
 *           example: Laptop X1
 *         description:
 *           type: string
 *           description: Descripción detallada del producto.
 *           example: Potente laptop con procesador i7.
 *         price:
 *           type: number
 *           format: float
 *           description: Precio del producto.
 *           example: 999.99
 *
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto.
 *           example: "Camiseta Azul"
 *         description:
 *           type: string
 *           description: Descripción detallada del producto.
 *           example: "Camiseta de algodón premium"
 *         price:
 *           type: number
 *           format: float
 *           example: 49.99
 */
export class ProductDTO {
  id!: number;
  name!: string;
  description!: string;
  price!: number;

  static fromEntity(entity: Product) : ProductDTO{
    const dto = new ProductDTO();

    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.price = entity.price;

    return dto;
  }
}