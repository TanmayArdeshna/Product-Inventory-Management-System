import { Link, NavLink } from 'react-router-dom'
import { RiDashboardLine, RiAddCircleLine } from 'react-icons/ri'

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-5">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            ProductHub
          </Link>
          
          <div className="flex items-center space-x-4">
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-600 hover:text-primary-600'
                }`
              }
            >
              <RiDashboardLine className="mr-1.5" />
              Products
            </NavLink>
            <NavLink 
              to="/products/add" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-600 hover:text-primary-600'
                }`
              }
            >
              <RiAddCircleLine className="mr-1.5" />
              Add Product
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
