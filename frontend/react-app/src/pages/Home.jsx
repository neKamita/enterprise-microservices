import { Link } from 'react-router-dom'
import { Package, ShoppingCart, TrendingUp } from 'lucide-react'

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Enterprise Store
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your one-stop shop for quality products
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
          <p className="text-gray-600">
            Browse through our extensive collection of products
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
          <p className="text-gray-600">
            Simple and secure checkout process
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Track Orders</h3>
          <p className="text-gray-600">
            Monitor your orders in real-time
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
