const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Product Inventory System. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
