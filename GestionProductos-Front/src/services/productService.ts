import type { Product } from "../models/product";
import type { CreateProductModel } from "../models/productSchema";
import { apiClient } from "./apiClient";

interface ApiResponse<T> {
  message: string,
  data: T
}

export const productService = {
  getAllProducts: async(signal? : AbortSignal) : Promise<Product[]> => {
    const result: ApiResponse<Product[]> = await apiClient.get('get-all', {signal});
    console.log(result)
    return result.data;
  },
  createProduct: async (product: CreateProductModel) : Promise<Product> => {
    console.log(product)
    const result : ApiResponse<Product> = await apiClient.post('create', product)
    return result.data;
  },
  deleteProduct: async (id: number) : Promise<void>=> {
    return await apiClient.delete(`delete/${id}`);
  }
}