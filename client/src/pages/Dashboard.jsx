import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { RiSearchLine, RiFilterLine, RiAddLine, RiRefreshLine, RiInformationLine } from 'react-icons/ri'
import { getProducts, getCategories, deleteProduct } from '../services/api'
import { MultiSelect } from 'react-multi-select-component'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  })
  const limit = 8

  // Format categories for the multi-select component
  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category._id
  }))

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const categoriesData = await getCategories()
        setCategories(categoriesData.data)
        await fetchProducts(1)
      } catch (error) {
        toast.error('Failed to load data')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const fetchProducts = async (page) => {
    try {
      setLoading(true)
      const result = await getProducts(page, limit, searchTerm, selectedCategories)
      setProducts(result.data)
      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalProducts: result.totalProducts
      })
    } catch (error) {
      toast.error('Failed to load products')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page) => {
    fetchProducts(page)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchProducts(1) // Reset to first page when searching
  }

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected)
    // Wait a tick to ensure state is updated
    setTimeout(() => {
      fetchProducts(1) // Reset to first page when filtering
    }, 0)
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully');
      fetchProducts(pagination.currentPage); // Refresh current page
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    }
  }

  return (
    <div>
      {/* Header Section with animated gradient */}
      <div className="relative overflow-hidden rounded-3xl mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-500 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative px-6 py-12 sm:px-10 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white font-display mb-2">Product Inventory</h1>
              <p className="text-white/80 max-w-2xl">
                Manage your products efficiently. Search, filter, and organize your inventory.
              </p>
            </div>

          </div>
          
          {/* Stats overview */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white border border-white/30">
              <div className="flex items-center">
                <span className="bg-white/90 p-2 rounded-lg mr-3">
                  <RiInformationLine className="text-primary-600" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide">Total Products</p>
                  <p className="text-2xl font-bold">{pagination.totalProducts || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white border border-white/30">
              <div className="flex items-center">
                <span className="bg-white/90 p-2 rounded-lg mr-3">
                  <RiFilterLine className="text-primary-600" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide">Categories</p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white border border-white/30">
              <div className="flex items-center">
                <span className="bg-white/90 p-2 rounded-lg mr-3">
                  <RiSearchLine className="text-primary-600" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide">Current Page</p>
                  <p className="text-2xl font-bold">{pagination.currentPage} / {pagination.totalPages}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Card */}
      <div className="card mb-8 border-none shadow-lg">
        <div className="flex flex-col md:flex-row md:items-end space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex-1">
            <label htmlFor="search" className="form-label flex items-center">
              <RiSearchLine className="mr-1.5 text-primary-500" />
              Search Products
            </label>
            <form onSubmit={handleSearch} className="flex">
              <input
                id="search"
                type="text"
                placeholder="Enter product name..."
                className="form-input rounded-r-none focus:z-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary-600 text-white rounded-r-xl border-l-0 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Search
              </button>
            </form>
          </div>
          <div className="w-full md:w-2/5">
            <div className="flex items-center space-x-2 mb-1">
              <RiFilterLine className="text-primary-500" />
              <label className="form-label m-0">Filter by Categories</label>
            </div>
            <MultiSelect
              options={categoryOptions}
              value={selectedCategories}
              onChange={handleCategoryChange}
              labelledBy="Select categories"
              className="rounded-xl"
              overrideStrings={{
                selectSomeItems: "Select categories...",
                allItemsAreSelected: "All categories selected",
              }}
            />
          </div>
        </div>
        
        {(searchTerm || selectedCategories.length > 0) && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              {searchTerm && <span className="mr-2">Search: <span className="font-semibold">{searchTerm}</span></span>}
              {selectedCategories.length > 0 && (
                <span>Categories: {selectedCategories.map(c => c.label).join(', ')}</span>
              )}
            </div>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategories([]);
                setTimeout(() => fetchProducts(1), 0);
              }} 
              className="text-sm flex items-center text-primary-600 hover:text-primary-800 hover:bg-primary-50 px-2 py-1 rounded-full"
            >
              <RiRefreshLine className="mr-1" /> Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Products Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="card text-center py-16 border border-dashed border-gray-300">
              <img
                src="https://illustrations.popsy.co/amber/no-data.svg"
                alt="No products"
                className="w-64 h-64 mx-auto mb-6 opacity-75"
              />
              <p className="text-gray-500 mb-6 text-lg">No products found</p>
              <Link to="/products/add" className="btn btn-primary inline-flex items-center">
                <RiAddLine className="mr-1.5" />
                Add Your First Product
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onDelete={() => handleDelete(product._id)}
                  />
                ))}
              </div>

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                totalItems={pagination.totalProducts}
                itemsPerPage={limit}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard
