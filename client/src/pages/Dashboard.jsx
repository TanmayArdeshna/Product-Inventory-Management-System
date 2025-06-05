import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { RiSearchLine, RiFilterLine, RiAddLine, RiDeleteBinLine } from 'react-icons/ri'
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
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        toast.success('Product deleted successfully')
        fetchProducts(pagination.currentPage) // Refresh current page
      } catch (error) {
        toast.error('Failed to delete product')
        console.error(error)
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Product Inventory</h1>
        <Link to="/products/add" className="btn btn-primary flex items-center justify-center sm:justify-start">
          <RiAddLine className="mr-2" />
          Add New Product
        </Link>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <RiSearchLine className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name"
                  className="form-input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="w-full md:w-2/5">
            <div className="flex items-center space-x-2 mb-1">
              <RiFilterLine className="text-gray-500" />
              <label className="form-label m-0">Filter by Categories</label>
            </div>
            <MultiSelect
              options={categoryOptions}
              value={selectedCategories}
              onChange={handleCategoryChange}
              labelledBy="Select categories"
              className="text-sm"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 mb-4">No products found</p>
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
