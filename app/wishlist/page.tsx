"use client";

import Image from "next/image";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../hooks/useCart";

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">
            Your Wishlist is Empty ❤️
          </h2>

          <p className="text-gray-500 mt-3">
            Save products you like.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-xl p-5 shadow"
            >
              <div className="flex gap-5 items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-lg"
                />

                <div>
                  <h2 className="text-xl font-bold">
                    {item.name}
                  </h2>

                  <p>{item.category}</p>

                  <p className="text-pink-600 font-bold">
                    ${item.price}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                   addToCart(item);
                   removeFromWishlist(item.id);
                }}
                className="bg-pink-600 text-white px-5 py-2 rounded"
              >
                Move to Cart
             </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 text-white px-5 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}