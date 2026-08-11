"use client";

import Link from "next/link";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white px-6">

      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center">

        <CheckCircle
          size={90}
          className="mx-auto text-green-500"
        />

        <h1 className="text-4xl font-extrabold mt-6">
          Order Successful 🎉
        </h1>

        <p className="text-gray-600 mt-4">
          Thank you for shopping with
        </p>

        <h2 className="text-pink-600 text-2xl font-bold">
          SHAZIFY
        </h2>

        <p className="text-gray-500 mt-4">
          Your order has been placed successfully.
        </p>

        <div className="bg-pink-50 rounded-xl p-5 mt-8">

          <div className="flex items-center justify-center gap-2">

            <Package className="text-pink-600" />

            <span className="font-semibold">
              Payment Status
            </span>

          </div>

          <p className="mt-2 text-green-600 font-bold">
            Pending (Cash on Delivery)
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">

          <Link
            href="/orders"
            className="bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition flex items-center justify-center gap-2"
          >
            <Package size={18} />
            My Orders
          </Link>

          <Link
            href="/"
            className="border border-pink-600 text-pink-600 py-3 rounded-xl hover:bg-pink-50 transition flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Shop Again
          </Link>

        </div>

      </div>

    </div>
  );
}