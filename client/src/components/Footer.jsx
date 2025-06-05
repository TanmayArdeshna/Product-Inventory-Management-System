const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500 font-bold text-xl font-display">
              ProductHub
            </p>
            <p className="text-gray-500 text-sm mt-1">Manage your inventory with ease</p>
          </div>
          <div className="text-center md:text-right text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Product Inventory System</p>
            <p className="mt-1">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
