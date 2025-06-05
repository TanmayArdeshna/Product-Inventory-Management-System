import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { RiArrowLeftLine, RiSaveLine, RiErrorWarningLine, RiInformationLine } from 'react-icons/ri'
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

  return (
    <div className="max-w-3xl mx-auto">
      {/* Enhanced header with gradient bg */}
      <div className="relative overflow-hidden rounded-2xl mb-10 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-500"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <button 
          onClick={() => navigate('/products')} 
          className="relative m-4 bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition"
          aria-label="Go back"
        >
          <RiArrowLeftLine size={20} />
        </button>
        <h1 className="relative text-3xl font-bold text-white font-display py-8 pl-2 pr-8">
          Add New Product
        </h1>
      </div>

      <div className="card border-none shadow-lg">
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields with enhanced styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className="form-label flex items-center">
                  Product Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input pl-10 ${errors.name ? 'border-red-500 bg-red-50' : ''}`}
                  placeholder="Enter product name"
                />
                <div className="absolute left-3 bottom-3 text-gray-400">
                  <RiInformationLine />
                </div>
                {errors.name && (
                  <div className="mt-2 text-sm text-red-600 flex items-start">
                    <RiErrorWarningLine className="mr-1 mt-0.5 flex-shrink-0" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div className="relative">
                <label htmlFor="quantity" className="form-label flex items-center">
                  Quantity <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  className={`form-input pl-10 ${errors.quantity ? 'border-red-500 bg-red-50' : ''}`}
                  placeholder="Enter quantity"
                />
                <div className="absolute left-3 bottom-3 text-gray-400">
                  <RiInformationLine />
                </div>
                {errors.quantity && (
                  <div className="mt-2 text-sm text-red-600 flex items-start">
                    <RiErrorWarningLine className="mr-1 mt-0.5 flex-shrink-0" />
                    <span>{errors.quantity}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <label htmlFor="description" className="form-label flex items-center">
                Description <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`form-input min-h-[120px] resize-none pl-10 ${errors.description ? 'border-red-500 bg-red-50' : ''}`}
                placeholder="Enter product description"
              ></textarea>
              <div className="absolute left-3 top-10 text-gray-400">
                <RiInformationLine />
              </div>
              {errors.description && (
                <div className="mt-2 text-sm text-red-600 flex items-start">
                  <RiErrorWarningLine className="mr-1 mt-0.5 flex-shrink-0" />
                  <span>{errors.description}</span>
                </div>
              )}
            </div>

            <div>
              <label className="form-label flex items-center">
                Categories <span className="text-red-500 ml-1">*</span>
              </label>
              <MultiSelect
                options={categoryOptions}
                value={selectedCategories}
                onChange={setSelectedCategories}
                labelledBy="Select categories"
                className={`rounded-xl ${errors.categories ? 'border-red-500' : ''}`}
                overrideStrings={{
                  selectSomeItems: "Select product categories...",
                  allItemsAreSelected: "All categories selected",
                  noOptions: "No categories available",
                }}
              />
              {errors.categories && (
                <div className="mt-2 text-sm text-red-600 flex items-start">
                  <RiErrorWarningLine className="mr-1 mt-0.5 flex-shrink-0" />
                  <span>{errors.categories}</span>
                </div>
              )}
            </div>

            {/* Improved buttons with gradient effect */}
            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="btn btn-secondary mr-3 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn bg-gradient-to-r from-primary-600 to-secondary-600 text-white min-w-[140px] hover:from-primary-700 hover:to-secondary-700"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <RiSaveLine className="mr-2" />
                    Add Product
                  </div>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
      
      {/* Enhanced tips card */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 text-blue-800 text-sm border border-blue-100 shadow-sm">
        <p className="font-medium mb-2 flex items-center text-indigo-800">
          <RiInformationLine size={18} className="mr-1.5" /> Tips for adding products:
        </p>
        <ul className="space-y-1.5 pl-6">
          <li className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 mr-2"></span>
            Product names must be unique across your inventory
          </li>
          <li className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 mr-2"></span>
            Choose at least one category to help with organization
          </li>
          <li className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 mr-2"></span>
            Provide a detailed description for better inventory management
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AddProduct
