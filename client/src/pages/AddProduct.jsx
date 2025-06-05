import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { RiArrowLeftLine, RiSaveLine } from 'react-icons/ri'
import { getCategories, createProduct } from '../services/api'
import { MultiSelect } from 'react-multi-select-component'
import LoadingSpinner from '../components/LoadingSpinner'

const AddProduct = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: ''
  })
  const [errors, setErrors] = useState({})

  // Format categories for the multi-select component
  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category._id
  }))

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const result = await getCategories()
        setCategories(result.data)
      } catch (error) {
        toast.error('Failed to load categories')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required'
    } else if (isNaN(formData.quantity) || Number(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a positive number'
    }
    
    if (selectedCategories.length === 0) {
      newErrors.categories = 'At least one category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      setSubmitting(true)
      // Extract category IDs from selected categories
      const categoryIds = selectedCategories.map(item => item.value)
      
      await createProduct({
        name: formData.name,
        description: formData.description,
        quantity: Number(formData.quantity),
        categories: categoryIds
      })
      
      toast.success('Product added successfully')
      navigate('/products')
    } catch (error) {
      console.error(error)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to add product')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center my-12">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/products')} 
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <RiArrowLeftLine size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="form-label">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter product name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="description" className="form-label">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-input min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter product description"
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="quantity" className="form-label">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              className={`form-input ${errors.quantity ? 'border-red-500' : ''}`}
              placeholder="Enter quantity"
            />
            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
          </div>

          <div>
            <label className="form-label">
              Categories <span className="text-red-500">*</span>
            </label>
            <MultiSelect
              options={categoryOptions}
              value={selectedCategories}
              onChange={setSelectedCategories}
              labelledBy="Select categories"
              className={`${errors.categories ? 'border-red-500' : ''}`}
            />
            {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full flex items-center justify-center"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <RiSaveLine className="mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
