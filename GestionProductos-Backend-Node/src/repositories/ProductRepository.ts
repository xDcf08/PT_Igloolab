import { AppDataSource } from "../db/AppDataSource";
import { Product } from "../models/ProductEntity";

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findAllProducts() {
    return await this.find();
  },

  async createProduct(product : Omit<Product, 'id'>) : Promise<Product>{
    const newProduct = this.create(product)
    return await this.save(newProduct)
  },

  async deleteProduct(id: number) {
    const result = await this.delete(id);
    return result.affected && result.affected > 0;
  }
});