import AddToCartButton from '@/components/AddToCartButton'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

async function getProduct(id: number) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  return res.json()
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product: Product = await getProduct(Number(params.id))

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 p-6 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-96 object-contain"
          />
        </div>
        <div className="md:w-1/2 p-6">
          <span className="text-sm text-gray-500">{product.category}</span>
          <h1 className="text-2xl font-bold mt-2">{product.title}</h1>
          <p className="text-xl font-semibold text-gray-800 my-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}