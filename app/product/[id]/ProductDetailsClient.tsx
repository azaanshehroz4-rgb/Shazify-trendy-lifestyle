"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../context/WishlistContext";
import Link from "next/link";
import products from "../../data/products";

export default function ProductDetails({
  product,
}: {
  product: any;
}) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  const relatedProducts = products.filter(
  (item) =>
    item.category === product.category &&
    item.id !== product.id
);
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-xl border"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-2">
            {product.category}
          </p>

          <p className="text-yellow-500 text-xl mt-3">
            {"⭐".repeat(product.rating)}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-3xl font-bold text-pink-600">
              ${product.price.toFixed(2)}
            </span>

            <span className="text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          </div>

          <p className="mt-6 text-gray-600">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-8">

            <button
              onClick={() =>
                quantity > 1 && setQuantity(quantity - 1)
              }
              className="border p-2 rounded-lg"
            >
              <Minus size={18} />
            </button>

            <span className="text-xl font-bold">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="border p-2 rounded-lg"
            >
              <Plus size={18} />
            </button>

          </div>

          <div className="flex flex-col gap-4 mt-8">

            <button
              onClick={handleAddToCart}
              className="bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
            >
              Add {quantity} To Cart
            </button>

            <button
              onClick={() => {
                if (!isInWishlist(product.id)) {
                  addToWishlist(product);
                }
              }}
              className={`border py-3 rounded-lg ${
                isInWishlist(product.id)
                  ? "bg-red-500 text-white"
                  : "border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Heart size={18} />
                {isInWishlist(product.id)
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
              </div>
            </button>

            <button
              onClick={() => router.push("/checkout")}
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Buy Now
            </button>

            <div className="mt-8 space-y-3 border-t pt-6">

              <p className="text-green-600 font-semibold">
                ✅ In Stock
              </p>

              <p className="text-gray-600">
                🚚 Free Shipping on orders over $50
              </p>

              <p className="text-gray-600">
                🔒 100% Secure Checkout
              </p>

              <p className="text-gray-600">
                ↩️ Easy 30-Day Returns
              </p>
                  {/* Customer Reviews */}
<div className="mt-12">
  <h2 className="text-2xl font-bold mb-6">
    Customer Reviews
  </h2>

  {product.reviews?.length > 0 ? (
    <div className="space-y-6">
      {product.reviews.map((review: any) => (
        <div
          key={review.id}
          className="border rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold">
              {review.name}
            </h3>

            <span className="text-gray-500 text-sm">
              {review.date}
            </span>
          </div>

          <p className="text-yellow-500 mt-2">
            {"⭐".repeat(review.rating)}
          </p>

          <p className="text-gray-600 mt-3">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">
      No reviews yet.
    </p>
  )}
</div>
{/* Related Products */}
<div className="mt-16">
  <h2 className="text-3xl font-bold mb-8">
    Related Products
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {relatedProducts.map((item) => (
      <Link
        key={item.id}
        href={`/product/${item.id}`}
        className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
      >
        <Image
          src={item.image}
          alt={item.name}
          width={300}
          height={250}
          className="w-full h-56 object-cover"
        />

        <div className="p-4">
          <h3 className="font-bold">{item.name}</h3>

          <p className="text-pink-600 font-bold mt-2">
            ${item.price}
          </p>
        </div>
      </Link>
    ))}
  </div>
</div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}