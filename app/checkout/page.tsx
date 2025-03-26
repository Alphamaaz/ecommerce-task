'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    payment: 'credit-card'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process checkout logic here
    console.log('Order submitted:', { formData, cartItems })
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="divide-y">
            {cartItems.map((item) => (
              <div key={item.id} className="py-4 flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h3 className="font-medium text-black">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2 ">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border rounded-l flex items-center justify-center text-black"
                        aria-label="Decrease quantity "
                      >
                        -
                      </button>
                      <span className="w-10 h-8 border-t border-b flex items-center justify-center text-black">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border rounded-r flex items-center justify-center text-black"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:text-red-700 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Address
                </label>
                <textarea
                  id="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-black ">
                    <input
                      type="radio"
                      name="payment"
                      value="credit-card"
                      checked={formData.payment === 'credit-card'}
                      onChange={() => setFormData({...formData, payment: 'credit-card'})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Credit Card</span>
                  </label>
                  <label className="flex items-center space-x-2 text-black">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={formData.payment === 'paypal'}
                      onChange={() => setFormData({...formData, payment: 'paypal'})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span>PayPal</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Place Order (${cartTotal.toFixed(2)})
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}