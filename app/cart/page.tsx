'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { cartItems, removeFromCart, cartTotal } = useCart()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4 text-black">Your cart is empty</p>
          <Link 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="font-medium text-black">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-black">Total:</span>
              <span className="text-xl font-bold text-black">${cartTotal.toFixed(2)}</span>
            </div>
            <Link
  href="/checkout"
  className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-center block"
>
  Proceed to Checkout
</Link>
          </div>
        </div>
      )}
    </div>
  )
}