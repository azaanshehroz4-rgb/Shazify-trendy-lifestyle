"use client";

import Link from "next/link";
import { XCircle, ShoppingCart } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-6">

      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center">

        <XCircle
          size={90}
          className="mx-auto text-red-500"
        />

        <h1 className="text-4xl font-extrabold mt-6">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mt-4">
          Your payment was not completed.
        </p>

        <p className="text-gray-500">
          No worries, you can try again anytime.
        </p>

        <div className="bg-red-50 rounded-xl p-5 mt-8">

          <p className="font-bold text-red-600">
            Payment Status
          </p>

          <p className="mt-2">
            Cancelled
          </p>

        </div>

        <Link
          href="/checkout"
          className="mt-8 inline-flex items-center gap-2 bg-pink-600 text-white px-8 py-3 rounded-xl hover:bg-pink-700 transition"
        >
          <ShoppingCart size={18} />
          Back to Checkout
        </Link>

      </div>

    </div>
  );
}