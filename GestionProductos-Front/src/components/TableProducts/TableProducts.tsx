import { useProducts } from '../../hooks/useProduct';
import './TableProducts.css'

export const TableProducts= () => {

  const { products, loading, error, removeProduct } = useProducts();

  if (loading) return <p className='loading-message'>Cargando productos...</p>;
  if (error) return <p className='error-message' style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
  if (products.length === 0) return <p className='empty-message'>No hay productos registrados. ¡Crea uno!</p>;

  return (
    <table className="table-products">
      <thead className="table-head-content">
        <tr>
          <th>Nombre del producto</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="table-body-content"> 
        {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              {/* Usamos toFixed(2) para formatear el precio como moneda */}
              <td>${product.price}</td> 
              <td>
                {/* Llama a la acción del hook/store al hacer click */}
                <button 
                  onClick={() => removeProduct(product.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}