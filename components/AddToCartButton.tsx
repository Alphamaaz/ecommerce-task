"use client";

import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() =>
        addToCart({
          ...product,
          quantity: 1, // ✅ Now TypeScript will not complain
        })
      }
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Add to Cart
    </button>
  );
}
