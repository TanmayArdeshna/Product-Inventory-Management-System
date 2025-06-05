import axios from 'axios'

const API_URL = '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Product APIs
export const getProducts = async (page = 1, limit = 10, search = '', categories = []) => {
  let url = `/products?page=${page}&limit=${limit}`
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`
  }
  
  if (categories && categories.length > 0) {
    const categoryIds = categories.map(c => c.value).join(',')
    url += `&categories=${categoryIds}`
  }
  
  const response = await api.get(url)
  return response.data
}

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData)
  return response.data
}

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}

export const getCategories = async () => {
  const response = await api.get('/products/categories')
  return response.data
}
