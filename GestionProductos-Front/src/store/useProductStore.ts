import { create } from "zustand";
import type { Product } from "../models/product";
import type { CreateProductModel } from "../models/productSchema";
import { productService } from "../services/productService";

interface ProductState {
  products: Product[];
  loading: boolean; 
  error: string | null;
}

interface ProductActions {
  fetchProducts: (signal?: AbortSignal) => Promise<void>;
  createProduct: (data: CreateProductModel) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useProductStore = create<ProductState & ProductActions>((set) => ({
  // ESTADO INICIAL
  products: [],
  loading: false,
  error: null,
  
  // ACCIONES (IMPLEMENTACIÓN)
  clearError: () => set({ error: null }),

  fetchProducts: async (signal) => {
    set({ loading: true, error: null });
    try {
      console.log('llegó')
      const data = await productService.getAllProducts(signal);
      set({ products: data });
    } catch (err) {
      console.log(err)
      const errorMessage = (err as Error).message || 'Fallo al obtener productos.';
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
  createProduct: async (data : CreateProductModel) => {
    set({ error: null });
    try {
      console.log(data)
      const newProduct = await productService.createProduct(data); 
      
      set((state) => ({ 
        products: [...state.products, newProduct] 
      }));
      
    } catch (err) {
      const errorMessage = (err as Error).message || 'Fallo al crear el producto.';
      throw new Error(errorMessage); 
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await productService.deleteProduct(id);
      
      set((state) => ({ 
        products: state.products.filter(p => p.id !== id) 
      }));
      
    } catch (err) {
      const errorMessage = (err as Error).message || 'Fallo al eliminar el producto.';
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
        set({ loading: false });
    }
  },
}));