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
import { formatPrice } from "../lib/currency";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);

  const { addToCart } = useCart();

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
        const querySnapshot = await getDocs(
          collection(db, "products")
        );

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
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-12 sm:py-20">

      {/* ==================== HEADING ==================== */}

      <div className="text-center mb-8 sm:mb-14">

        <p className="text-pink-600 uppercase tracking-widest font-semibold text-xs sm:text-base">
          Trending Products
        </p>

        <h2 className="text-3xl sm:text-5xl font-bold mt-2 sm:mt-3">
          Featured Products
        </h2>

        <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base">
          Discover our most popular products with amazing discounts.
        </p>

      </div>


      {/* ==================== NO PRODUCTS ==================== */}

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-600">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-4">
            Try searching with another keyword.
          </p>

        </div>
      )}


      {/* ==================== PRODUCT GRID ==================== */}

      {filteredProducts.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">

          {filteredProducts.map((product) => (

            <div
              key={product.id}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >

              {/* ==================== PRODUCT IMAGE ==================== */}

              <div className="relative h-32 sm:h-44 md:h-48 lg:h-72 overflow-hidden">

                <Link
                  href={`/product/${product.id}`}
                  className="relative block w-full h-full"
                >

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 767px) 33vw, (max-width: 1024px) 25vw, 25vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                </Link>


                {/* ==================== PRODUCT ICONS ==================== */}

                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition">

                  <button
                    onClick={() => handleWishlist(product)}
                    className={`bg-white p-1.5 sm:p-2 rounded-full shadow transition ${
                      isInWishlist(product.id)
                        ? "text-red-500"
                        : "hover:bg-pink-600 hover:text-white"
                    }`}
                  >

                    <Heart
                      size={14}
                      className="sm:hidden"
                      fill={
                        isInWishlist(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />

                    <Heart
                      size={18}
                      className="hidden sm:block"
                      fill={
                        isInWishlist(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />

                  </button>


                  <Link
                    href={`/product/${product.id}`}
                    className="bg-white p-1.5 sm:p-2 rounded-full shadow hover:bg-pink-600 hover:text-white"
                  >

                    <Eye
                      size={14}
                      className="sm:hidden"
                    />

                    <Eye
                      size={18}
                      className="hidden sm:block"
                    />

                  </Link>

                </div>

              </div>


              {/* ==================== PRODUCT CONTENT ==================== */}

              <div className="p-2 sm:p-4 lg:p-5">

                <Link
                  href={`/product/${product.id}`}
                  className="block group/product"
                >

                  <p className="text-gray-500 text-[10px] sm:text-sm truncate">
                    {product.category}
                  </p>

                  <h3 className="font-bold text-xs sm:text-lg lg:text-xl mt-1 group-hover/product:text-pink-600 transition line-clamp-2">
                    {product.name}
                  </h3>

                </Link>


                {/* ==================== RATING ==================== */}

                <div className="flex items-center mt-2 sm:mt-3 text-yellow-500">

                  <div className="flex">

                    {Array.from({ length: 5 }, (_, i) => {

                      const starNumber = i + 1;

                      return (
                        <Star
                          key={i}
                          size={11}
                          className="sm:hidden"
                          fill={
                            product.rating >= starNumber
                              ? "currentColor"
                              : "none"
                          }
                        />
                      );

                    })}

                    {Array.from({ length: 5 }, (_, i) => {

                      const starNumber = i + 1;

                      return (
                        <Star
                          key={i}
                          size={16}
                          className="hidden sm:block"
                          fill={
                            product.rating >= starNumber
                              ? "currentColor"
                              : "none"
                          }
                        />
                      );

                    })}

                  </div>

                  <span className="ml-1 sm:ml-2 text-[9px] sm:text-sm text-gray-600">
                    ({product.rating})
                  </span>

                </div>


                {/* ==================== PRICE ==================== */}

                <div className="flex flex-wrap items-center gap-1 sm:gap-3 mt-2 sm:mt-4">

                  <span className="text-pink-600 text-sm sm:text-xl lg:text-2xl font-bold">
                    {formatPrice(product.price)}
                  </span>

                  <span className="line-through text-gray-400 text-[10px] sm:text-sm">
                    {formatPrice(product.oldPrice)}
                  </span>

                </div>


                {/* ==================== PRODUCT ACTION ==================== */}

                {product.affiliateLink ? (

                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-full mt-3 sm:mt-5 bg-orange-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-orange-600 transition flex items-center justify-center font-semibold text-[9px] sm:text-sm lg:text-base text-center"
                  >
                    🛍️ Buy on AliExpress
                  </a>

                ) : (

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-3 sm:mt-5 bg-pink-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-pink-700 transition flex items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-sm lg:text-base font-semibold"
                  >

                    <ShoppingCart
                      size={14}
                      className="sm:hidden"
                    />

                    <ShoppingCart
                      size={18}
                      className="hidden sm:block"
                    />

                    Add To Cart

                  </button>

                )}

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}