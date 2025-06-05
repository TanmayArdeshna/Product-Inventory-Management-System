import { Link } from 'react-router-dom'
import { RiArrowLeftLine } from 'react-icons/ri'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link to="/" className="btn btn-primary flex items-center">
        <RiArrowLeftLine className="mr-2" />
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
