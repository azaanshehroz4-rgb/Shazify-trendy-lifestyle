"use client";

import Image from "next/image";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCart } from "../hooks/useCart";
import { useSearch } from "../context/SearchContext";
import { useWishlist } from "../context/WishlistContext";
import Link from "next/link";
export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
   const { addToCart } = useCart()
   const {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} = useWishlist();
   const { search } = useSearch();
   const handleAddToCart = (product: any) => {
  console.log("Clicked:", product);
  addToCart(product);
};
const handleWishlist = (product: any) => {
  if (isInWishlist(product.id)) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
};
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProducts();
}, []);
const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
);
return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-pink-600 uppercase tracking-widest font-semibold">
          Trending Products
        </p>

        <h2 className="text-5xl font-bold mt-3">
          Featured Products
        </h2>

        <p className="text-gray-500 mt-4">
          Discover our most popular products with amazing discounts.
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 && (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold text-gray-600">
      No Products Found
    </h2>

    <p className="text-gray-500 mt-4">
      Try searching with another keyword.
    </p>
  </div>
      )}
      {filteredProducts.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            {/* Image */}
            <div className="relative h-72 overflow-hidden">
                 
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Discount Badge */}
              <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs px-3 py-1 rounded-full">
                -20%
              </span>

              {/* Icons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">

               <button
                 onClick={() => handleWishlist(product)}
                 className={`bg-white p-2 rounded-full shadow transition ${
                   isInWishlist(product.id)
                     ? "text-red-500"
                     : "hover:bg-pink-600 hover:text-white"
                 }`}
               >
                <Heart
                  size={18}
                  fill={isInWishlist(product.id) ? "currentColor" : "none"}
              />
            </button>

               <Link
                  href={`/product/${product.id}`}
                  className="bg-white p-2 rounded-full shadow hover:bg-pink-600 hover:text-white"
               >
                <Eye size={18} />
               </Link>

              </div>
            </div>

            {/* Content */}
            <div className="p-5">

              <p className="text-gray-500 text-sm">
                {product.category}
              </p>

              <h3 className="font-bold text-xl mt-1">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center mt-3 text-yellow-500">
  {Array.from({ length: 5 }, (_, i) => {
    const starNumber = i + 1;

    return (
      <Star
        key={i}
        size={16}
        fill={
          product.rating >= starNumber
            ? "currentColor"
            : "none"
        }
        className={
          product.rating >= starNumber
            ? "text-yellow-500"
            : "text-gray-300"
        }
      />
    );
  })}

  <span className="ml-2 text-sm text-gray-600">
    ({product.rating})
  </span>
</div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-4">

                <span className="text-pink-600 text-2xl font-bold">
                  ${product.price}
                </span>

                <span className="line-through text-gray-400">
                  ${product.oldPrice}
                </span>

              </div>

              {/* Button */}
              <button
                 onClick={() => handleAddToCart(product)}
                className="w-full mt-6 bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                
                Add To Cart
                
              </button>

            </div>
          </div>
        ))}
      </div>
      )}
    </section>
  );
}