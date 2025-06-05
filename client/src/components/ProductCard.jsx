import { useState } from 'react';
import { RiDeleteBinLine, RiInformationLine, RiAlertLine } from 'react-icons/ri';
import Modal from './Modal';

const ProductCard = ({ product, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Format the date without using date-fns
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const formattedDate = formatDate(product.createdAt);
  
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  
  const confirmDelete = () => {
    onDelete(product._id);
    setShowDeleteModal(false);
  };
  
  return (
    <>
      <div className="card group">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition duration-200">{product.name}</h3>
          <button 
            onClick={handleDelete} 
            className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition duration-200"
            aria-label="Delete product"
          >
            <RiDeleteBinLine size={18} />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">{product.description}</p>
        
        <div className="flex items-center mb-4">
          <span className="inline-flex items-center justify-center p-1.5 bg-primary-100 text-primary-800 rounded-full mr-2">
            <RiInformationLine size={16} />
          </span>
          <span className="text-sm font-medium text-gray-700">{product.quantity} in stock</span>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {product.categories.map(category => (
              <span 
                key={category._id} 
                className="badge bg-secondary-100/70 text-secondary-800 border border-secondary-200"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
          <span>Added on {formattedDate}</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        footer={
          <>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="btn btn-secondary mr-2"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="btn btn-danger"
            >
              Delete
            </button>
          </>
        }
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-4">
            <RiAlertLine size={24} />
          </div>
          <div>
            <p className="text-gray-800 font-medium mb-2">Are you sure you want to delete this product?</p>
            <p className="text-gray-600 text-sm">{product.name}</p>
            <p className="text-red-600 text-sm mt-4">This action cannot be undone.</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
