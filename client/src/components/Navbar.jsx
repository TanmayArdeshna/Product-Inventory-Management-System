import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RiDashboardLine, RiAddCircleLine, RiMenuLine, RiCloseLine } from 'react-icons/ri'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-5">
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500 font-display">
            ProductHub
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {isMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `flex items-center px-4 py-2.5 rounded-xl transition ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50/50'
                }`
              }
            >
              <RiDashboardLine className="mr-2" />
              Products
            </NavLink>
            <NavLink 
              to="/products/add" 
              className={({ isActive }) => 
                `flex items-center px-4 py-2.5 rounded-xl transition ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50/50'
                }`
              }
            >
              <RiAddCircleLine className="mr-2" />
              Add Product
            </NavLink>
          </div>
        </nav>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <NavLink 
                to="/products" 
                onClick={toggleMenu}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-xl transition ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-600 hover:text-primary-600'
                  }`
                }
              >
                <RiDashboardLine className="mr-3" />
                Products
              </NavLink>
              <NavLink 
                to="/products/add" 
                onClick={toggleMenu}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-xl transition ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-600 hover:text-primary-600'
                  }`
                }
              >
                <RiAddCircleLine className="mr-3" />
                Add Product
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
