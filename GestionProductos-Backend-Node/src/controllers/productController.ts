import { Request, Response } from "express";
import productService from "../services/ProductService";

class ProductController {

  public async GetProduct(req : Request, res : Response){
    try {
      const products = await productService.getAllProducts();
  
      return res.status(200).json({
        message: "Lista de productos",
        data: products
      });
    } catch (error) {
      console.error("Error en el controlador:", error);
      return res.status(500).json({ 
        message: "Ocurrió un error al obtener los productos."
      });
    }
  }

  public async CreateProduct(req : Request, res: Response){
    try {
      const productData = req.body;
      if (!productData.name || !productData.price) {
          return res.status(400).json({ message: "Nombre y precio son obligatorios." });
      }
      const newProduct = await productService.createProduct(productData);
      return res.status(201).json({
        message: "Producto creado exitosamente",
        data: newProduct
      })
      
    } catch (error) {
      console.error("Error en el controlador:", error);
      return res.status(500).json({
        message: "Ocurrió un error al crear el producto."
      });
    }
  }

  public async DeleteProduct(req : Request, res : Response){
    try {
      const { id } = req.params;
      const productId = Number(id);
      if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({ message: "ID de producto inválido." });
      }
      const success = await productService.deleteProduct(productId);

      if(!success){
        return res.status(404).json({
          message: "Producto no encontrado"
        })
      }
  
      return res.status(204).send();
    } catch (error) {
      console.error("Error en el controlador:", error);
      return res.status(500).json({
        message: "Ocurrió un error al eliminar el producto."
      });
    }
  }
}

export default new ProductController();