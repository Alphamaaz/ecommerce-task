import Link from 'next/link'
import AddToCartButton from '../components/AddToCartButton'

interface Product {
  id: number
  title: string
  price: number
  image: string
}

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  return res.json()
}

export default async function Home() {
  const products: Product[] = await getProducts()

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-black">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/product/${product.id}`}>
              <div className="p-4">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-48 object-contain mb-4"
                />
                <h2 className="text-lg font-semibold line-clamp-2 text-black">{product.title}</h2>
                <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
              </div>
            </Link>
            <div className="p-4 border-t">
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}