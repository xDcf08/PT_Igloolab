import { FormCreateProduct } from '../FormCreateProduct/FormCreateProduct';
import './ProductModal.css';

interface ProductModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const ProductModal = ({ isModalOpen, closeModal }: ProductModalProps) => {

  if (!isModalOpen) {
    return null; // No renderizar nada si no está abierto
  }

  return (
    <div className="modal-backdrop is-open" onClick={closeModal}> 
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="modal-header">
          <h3>Crear nuevo producto</h3>
          <button className="close-modal-button" onClick={closeModal}>
            &times; 
          </button>
        </div>
        
        <div className="modal-body">
          <FormCreateProduct 
            closeModal={closeModal}
          />
        </div>
      </div>
    </div>
  );
}