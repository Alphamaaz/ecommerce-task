import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Shop the latest products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <CartProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
}