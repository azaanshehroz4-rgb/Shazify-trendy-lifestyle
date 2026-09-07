"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "../lib/currency";
import { useCurrency } from "../context/CurrencyContext";

export default function CategoryProducts({
  products,
}: {
  products: any[];
}) {
  const { currency } = useCurrency();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="border rounded-xl p-4 hover:shadow-lg transition"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-lg"
          />

          <h2 className="text-xl font-bold mt-4">
            {product.name}
          </h2>

          <p className="text-pink-600 font-bold mt-2">
            {formatPrice(product.price, currency)}
          </p>
        </Link>
      ))}
    </div>
  );
}