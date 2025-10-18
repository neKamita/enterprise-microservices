import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { productService } from '../services/productService'
import { orderService } from '../services/orderService'
import { useAuthStore } from '../store/authStore'
import { ShoppingCart, Loader, ArrowLeft } from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()
  const [quantity, setQuantity] = useState(1)

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
  })

  const createOrderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      alert('Order created successfully!')
      navigate('/orders')
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to create order')
    },
  })

  const handleOrder = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const orderData = {
      userId: user.id,
      items: [
        {
          productId: product.id,
          quantity: quantity,
        },
      ],
    }

    createOrderMutation.mutate(orderData)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Product not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate('/products')}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="bg-gray-200 rounded-lg flex items-center justify-center h-96">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400 text-8xl">📦</span>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {product.category && (
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4">
                {product.category}
              </span>
            )}

            <p className="text-gray-600 text-lg mb-6">
              {product.description || 'No description available'}
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">
                ${product.price?.toFixed(2)}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Stock:</span> {product.stock} units
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Status:</span>{' '}
                {product.active ? (
                  <span className="text-green-600">Available</span>
                ) : (
                  <span className="text-red-600">Unavailable</span>
                )}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleOrder}
              disabled={!product.active || product.stock < 1 || createOrderMutation.isPending}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>
                {createOrderMutation.isPending ? 'Processing...' : 'Order Now'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
