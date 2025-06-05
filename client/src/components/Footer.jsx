import { RiHeart2Line } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <div className="text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500 font-bold text-xl font-display">
              ProductHub
            </div>
            <p className="text-gray-500 text-sm mt-1">Manage your inventory with ease</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm flex items-center justify-center md:justify-end">
              Made with <RiHeart2Line className="text-red-500 mx-1" /> using MERN Stack
            </p>
            <p className="mt-1 text-gray-400 text-sm">© {new Date().getFullYear()} Product Inventory System</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
