import { ProductDTO } from "../models/ProductDTO";
import { CreateProductInput } from "../models/ProductSchema";
import { ProductRepository } from "../repositories/ProductRepository";

class ProductService {
  public async getAllProducts() : Promise<ProductDTO[]> {
    const products = await ProductRepository.findAllProducts();

    return products.map(ProductDTO.fromEntity);
  }

  public async createProduct(product: CreateProductInput) : Promise<ProductDTO>{
    const newProduct = await ProductRepository.createProduct(product);
    return ProductDTO.fromEntity(newProduct)
  }

  public async deleteProduct(id: number) {
    return await ProductRepository.deleteProduct(id);
  }
}

export default new ProductService();