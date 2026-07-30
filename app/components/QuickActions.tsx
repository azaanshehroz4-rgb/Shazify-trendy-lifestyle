"use client";

import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <Link
          href="/admin/products"
          className="bg-pink-600 text-white rounded-xl p-6 text-center hover:bg-pink-700 transition"
        >
          📦
          <p className="mt-3 font-bold">Manage Products</p>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-blue-600 text-white rounded-xl p-6 text-center hover:bg-blue-700 transition"
        >
          📋
          <p className="mt-3 font-bold">Manage Orders</p>
        </Link>

        <Link
          href="/admin/reviews"
          className="bg-green-600 text-white rounded-xl p-6 text-center hover:bg-green-700 transition"
        >
          ⭐
          <p className="mt-3 font-bold">Manage Reviews</p>
        </Link>

        <Link
          href="/"
          className="bg-purple-600 text-white rounded-xl p-6 text-center hover:bg-purple-700 transition"
        >
          🌐
          <p className="mt-3 font-bold">Visit Store</p>
        </Link>

      </div>

    </div>
  );
}