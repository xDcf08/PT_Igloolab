import { useEffect } from "react";
import type { Product } from "../models/product";
import { useProductStore } from "../store/useProductStore";
import { toast } from "react-toastify";
import { useShallow } from "zustand/shallow";

interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>; // Función para recargar la lista manualmente
    removeProduct: (id: number) => Promise<void>; // Función para eliminar
}

export const useProducts = () : UseProductsResult => {
  const { 
        products, 
        loading, 
        error, 
        fetchProducts, 
        deleteProduct: removeProductAction, // Renombramos la acción para claridad
        clearError 
    } = useProductStore(useShallow((state) => ({ 
        products: state.products,
        loading: state.loading,
        error: state.error,
        fetchProducts: state.fetchProducts,
        deleteProduct: state.deleteProduct,
        clearError: state.clearError,
    }))
  );

    useEffect(() => {
      const controller = new AbortController();
      fetchProducts(controller.signal);

      return () => controller.abort();

    }, [fetchProducts]) 

    const removeProduct = async (id:number) => {
      if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            return;
        }
      try {
          await removeProductAction(id);
          toast.success("🗑️ Producto eliminado exitosamente.");
        } catch (err) {
          const errorMessage = ((err as Error).message || "Error al eliminar el producto.");
          toast.error(`❌ Error al eliminar: ${errorMessage}`);
          fetchProducts(); 
        }
    }

    const refetchWithCancellation = async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        await fetchProducts(signal);
    }

    return {
        products,
        loading,
        error,
        refetch: refetchWithCancellation,
        removeProduct,
    };
}