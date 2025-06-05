import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { RiDashboardLine, RiAddCircleLine, RiMenuLine, RiCloseLine, RiBarChartBoxLine, RiSunLine, RiMoonLine } from 'react-icons/ri'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])
  
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-md shadow-md' 
        : 'bg-white dark:bg-dark-900 shadow-sm dark:shadow-dark-800'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 p-2 rounded-lg">
              <RiBarChartBoxLine className="text-white text-xl" />
            </span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500 font-display">
              ProductHub
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `flex items-center px-4 py-2.5 rounded-xl transition ${
                  isActive 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/20'
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
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/20'
                }`
              }
            >
              <RiAddCircleLine className="mr-2" />
              Add Product
            </NavLink>
            
            {/* Theme toggle - Moved to the right */}
            <button 
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
            </button>
          </div>
          
          <div className="flex items-center md:hidden">
            {/* Theme toggle for mobile */}
            <button 
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
            </button>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {isMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
            </button>
          </div>
        </nav>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-dark-700 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <NavLink 
                to="/products" 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-xl transition ${
                    isActive 
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`
                }
              >
                <RiDashboardLine className="mr-3" />
                Products
              </NavLink>
              <NavLink 
                to="/products/add" 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-xl transition ${
                    isActive 
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
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
