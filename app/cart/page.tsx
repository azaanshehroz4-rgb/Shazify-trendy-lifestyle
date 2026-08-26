"use client";

import Image from "next/image";
import { useCart } from "../hooks/useCart";
import Link from "next/link";
import { formatPrice } from "../lib/currency";
export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  return (
    <>
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">
            Your cart is empty 🛒
          </h2>

          <p className="text-gray-500 mt-2">
            Add some products to start shopping.
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-10">
          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

          <p className="mt-4">
            Total Products: {totalItems}
          </p>

          {cart.map((item) => (
            <div
              key={item.id}
              className="w-full flex items-center justify-between border rounded-xl p-5 mt-5 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-x1 object-cover"
                />

                <div>
                  <h2 className="font-bold text-lg">
                    {item.name}
                  </h2>

                  <p>{item.category}</p>

                <p>Price: {formatPrice(item.price)}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-pink-600 text-white px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 text-red-600 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>

             <div className="font-bold">
                {formatPrice(item.price * item.quantity)}
             </div>
            </div>
          ))}

          <div className="mt-10 border-t pt-6">
            <h2 className="text-2xl font-bold">
              Cart Summary
            </h2>

            <p className="mt-3">
              Total Items: <strong>{totalItems}</strong>
            </p>

            <p className="mt-2">
               Total Price: <strong>{formatPrice(totalPrice)}</strong>
            </p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>

             <Link
               href="/checkout"
                  className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
             >
                 Checkout
               </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}