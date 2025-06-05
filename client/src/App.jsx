import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="products" element={<Dashboard />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
