"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">

        <CheckCircle
          size={80}
          className="mx-auto text-green-500"
        />

        <h1 className="text-4xl font-bold mt-6">
          Order Successful!
        </h1>

        <p className="text-gray-500 mt-4">
          Thank you for shopping with SHAZIFY.
        </p>

        <p className="text-gray-500">
          Your order has been placed successfully.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-pink-600 text-white px-8 py-3 rounded-xl hover:bg-pink-700 transition"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}