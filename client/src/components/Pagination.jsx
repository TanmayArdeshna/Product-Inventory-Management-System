import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  // Generate page numbers
  const pageNumbers = []
  const maxPagesToShow = 5

  if (totalPages <= maxPagesToShow) {
    // If we have fewer pages than our maximum, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    // Always include first page
    pageNumbers.push(1)
    
    // Calculate start and end of the current visible range
    let startPage = Math.max(2, currentPage - 1)
    let endPage = Math.min(totalPages - 1, currentPage + 1)
    
    // Adjust if we're near the beginning
    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, maxPagesToShow - 1)
    }
    
    // Adjust if we're near the end
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - (maxPagesToShow - 2))
    }
    
    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pageNumbers.push('...')
    }
    
    // Add the visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('...')
    }
    
    // Always include last page
    pageNumbers.push(totalPages)
  }

  // Calculate the range of items showing
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6 mt-8">
      <div className="text-sm text-gray-600 mb-4 sm:mb-0 bg-white px-4 py-2 rounded-full shadow-sm">
        Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> products
      </div>

      <nav className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-primary-100 hover:text-primary-700'
          }`}
          aria-label="Previous page"
        >
          <RiArrowLeftSLine size={20} />
        </button>

        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-400">...</span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                currentPage === page
                  ? 'bg-primary-600 text-white font-medium shadow-md'
                  : 'text-gray-700 hover:bg-primary-100 hover:text-primary-700'
              }`}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-primary-100 hover:text-primary-700'
          }`}
          aria-label="Next page"
        >
          <RiArrowRightSLine size={20} />
        </button>
      </nav>
    </div>
  )
}

export default Pagination
