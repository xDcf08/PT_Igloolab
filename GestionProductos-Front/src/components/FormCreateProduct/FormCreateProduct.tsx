import { useForm, type SubmitHandler } from "react-hook-form";
import { ProductSchema, type CreateProductModel } from "../../models/productSchema";
import { CustomInput } from "../CustomInput/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import './FormCreateProduct.css'
import { useProductStore } from "../../store/useProductStore";
import { toast } from "react-toastify";

interface FormProps {
  closeModal: () => void
}

export const FormCreateProduct = ({ closeModal } : FormProps) => {

  const [isLoading, setIsLoading] = useState(false);

  const createProduct = useProductStore(state => state.createProduct);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<CreateProductModel>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0
    }
  });

  const onSubmit : SubmitHandler<CreateProductModel>  = async ( data) => {
    setIsLoading(true);
    console.log(data)
    try {
      await createProduct(data);

      toast.success("✅ Producto creado exitosamente.")
      reset();
      closeModal();
    } catch (error) {
      const errorMessage = (error as Error).message || "Ocurrió un error desconocido al crear el producto.";
      alert(errorMessage);
      toast.error(`❌ Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="form-container">
      <form className="form-create-product" onSubmit={handleSubmit(onSubmit)}>
        <h2>Crea un nuevo producto</h2>

        <CustomInput name="name" control={control} type="text" label="Nombre producto" error={errors.name} />
        <CustomInput name="description" control={control} type="text" label="Descripción producto" error={errors.description} />
        <CustomInput name="price" control={control} type="number" label="Precio producto" error={errors.price} />

        <button type="submit" className="create-product-button">
          {!isLoading ? 'Crear producto' : 'Creando producto...'}
        </button>
      </form>
    </div>
  )
}
