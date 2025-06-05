import { RiDeleteBinLine } from 'react-icons/ri'

const ProductCard = ({ product, onDelete }) => {
  // Format the date without using date-fns
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const formattedDate = formatDate(product.createdAt);
  
  return (
    <div className="card hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
        <button 
          onClick={() => onDelete(product._id)} 
          className="text-gray-400 hover:text-red-600 transition"
          aria-label="Delete product"
        >
          <RiDeleteBinLine size={18} />
        </button>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
      
      <div className="mb-3">
        <span className="text-sm font-medium text-gray-700">Quantity: </span>
        <span className="text-sm text-gray-600">{product.quantity}</span>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {product.categories.map(category => (
            <span 
              key={category._id} 
              className="badge bg-primary-100 text-primary-800"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
        Added on {formattedDate}
      </div>
    </div>
  )
}

export default ProductCard
