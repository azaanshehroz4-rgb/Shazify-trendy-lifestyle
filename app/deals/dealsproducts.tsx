"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../lib/currency";
import { useCurrency } from "../context/CurrencyContext";

export default function DealsProducts({
  products,
}: {
  products: any[];
}) {
  const { currency } = useCurrency();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product: any) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition"
        >
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />

            {product.isDeal && !product.affiliateLink && (
              <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs px-3 py-1 rounded-full">
                -20%
              </span>
            )}
          </div>

          <div className="p-5">
            <h2 className="font-bold text-xl">
              {product.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {product.category}
            </p>

            <div className="flex gap-3 mt-3">
              <span className="text-pink-600 font-bold text-xl">
                {formatPrice(product.price, currency)}
              </span>

              <span className="line-through text-gray-400">
                {formatPrice(product.oldPrice, currency)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}