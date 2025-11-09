import { useState } from 'react';
import './App.css'
import { TableProducts } from './components'
import { ProductModal } from './components/ProductModal/ProductModal'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="main-content-wrapper">
      
      {/* 1. Cabecera con Título y Botón */}
      <header className="page-header">
        <h1>Gestión de Productos</h1>
        <button 
          className="add-product-button"
          onClick={() => setIsModalOpen(true)} // Lógica para abrir modal
        >
          <span style={{ fontSize: '1.2rem' }}>+</span> Agregar Nuevo Producto
        </button>
      </header>

      {/* 2. Modal (se mostrará u ocultará con estado) */}
      <ProductModal 
        isModalOpen={isModalOpen} 
        closeModal={closeModal}
      /> 

      {/* 3. Tabla de Productos */}
      <TableProducts />
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} />
    </div>
  )
}

export default App
