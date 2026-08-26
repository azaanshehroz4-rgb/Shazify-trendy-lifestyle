import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Image from "next/image";
import Link from "next/link";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { formatPrice } from "../lib/currency";

export default async function DealsPage() {
  const snapshot = await getDocs(collection(db, "products"));

const products = snapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .filter((product: any) => product.isDeal === true);
    return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-6">

        <h1 className="text-5xl font-bold text-center mb-3">
          🔥 Today's Deals
        </h1>

        <p className="text-center text-gray-500 mb-12">
          Grab the best discounts before they're gone.
        </p>

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
                   {formatPrice(product.price)}
                 </span>

                 <span className="line-through text-gray-400">
                      {formatPrice(product.oldPrice)}
                </span>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}