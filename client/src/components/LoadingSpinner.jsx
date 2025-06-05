const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-4 border-transparent border-b-secondary-500 rounded-full animate-spin absolute top-0 left-0 opacity-70"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
