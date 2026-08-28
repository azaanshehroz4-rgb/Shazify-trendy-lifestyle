"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Hero() {
  const [smallTitle, setSmallTitle] = useState("NEW COLLECTION 2026");
  const [headingLine1, setHeadingLine1] = useState("Discover Your");
  const [headingLine2, setHeadingLine2] = useState("Perfect Style");
  const [description, setDescription] = useState(
    "Shop premium fashion, beauty and lifestyle products."
  );

  const [shopNowText, setShopNowText] = useState("Shop Now");
  const [shopNowLink, setShopNowLink] = useState("/deals");

  const [exploreText, setExploreText] = useState("Explore");
  const [exploreLink, setExploreLink] = useState("/categories");

  useEffect(() => {
    const heroRef = doc(db, "settings", "hero");

    const unsubscribe = onSnapshot(
      heroRef,
      (heroSnap) => {
        if (heroSnap.exists()) {
          const data = heroSnap.data();

          setSmallTitle(
            data.smallTitle || "NEW COLLECTION 2026"
          );

          setHeadingLine1(
            data.headingLine1 || "Discover Your"
          );

          setHeadingLine2(
            data.headingLine2 || "Perfect Style"
          );

          setDescription(
            data.description ||
              "Shop premium fashion, beauty and lifestyle products."
          );

          setShopNowText(
            data.shopNowText || "Shop Now"
          );

          setShopNowLink(
            data.shopNowLink || "/deals"
          );

          setExploreText(
            data.exploreText || "Explore"
          );

          setExploreLink(
            data.exploreLink || "/categories"
          );
        }
      },
      (error) => {
        console.error(
          "Error loading hero settings:",
          error
        );
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section className="relative w-full overflow-hidden">

      {/* ==================== DESKTOP BANNER ==================== */}

      <div className="hidden md:block relative w-full h-[80vh] min-h-[600px]">

        <Image
          src="/images/hero-banner-2.jpg"
          alt="Hero Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />

        {/* Desktop Dark Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10"></div>

        {/* Desktop Content */}

        <div className="relative z-10 flex h-full items-center">

          <div className="w-full max-w-7xl mx-auto px-12">

            <div className="max-w-xl text-white">

              {/* Small Title */}

              <p className="uppercase tracking-[4px] text-pink-400 font-semibold mb-3">
                {smallTitle}
              </p>

              {/* Heading */}

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">

                {headingLine1}

                <span className="block text-pink-500">
                  {headingLine2}
                </span>

              </h1>

              {/* Description */}

              <p className="mt-6 text-lg text-gray-200">
                {description}
              </p>

              {/* Buttons */}

              <div className="mt-8 flex gap-4">

                <Link
                  href={shopNowLink}
                  className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition"
                >
                  {shopNowText}
                </Link>

                <Link
                  href={exploreLink}
                  className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition"
                >
                  {exploreText}
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ==================== MOBILE BANNER ==================== */}

      <div className="md:hidden relative w-full min-h-[620px] overflow-hidden">

        <Image
          src="/images/hero-banner-2.jpg"
          alt="Shazify Mobile Hero Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />

        {/* Mobile Dark Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent"></div>

        {/* Mobile Content */}

        <div className="relative z-10 flex min-h-[620px] items-center">

          <div className="w-full px-5 sm:px-8">

            <div className="max-w-[330px] text-white">

              {/* Mobile Collection Text */}

              <p className="uppercase tracking-[3px] text-pink-400 font-semibold text-xs sm:text-sm mb-3">
                {smallTitle}
              </p>

              {/* Mobile Heading */}

              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.05]">

                {headingLine1}

                <span className="block text-pink-500">
                  {headingLine2}
                </span>

              </h1>

              {/* Mobile Description */}

              <p className="mt-5 text-sm sm:text-base text-gray-200 leading-relaxed max-w-xs">
                {description}
              </p>

              {/* Mobile Buttons */}

              <div className="mt-7 flex gap-3">

                <Link
                  href={shopNowLink}
                  className="bg-pink-600 text-white px-5 sm:px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-pink-700 transition text-center shadow-lg"
                >
                  {shopNowText}
                </Link>

                <Link
                  href={exploreLink}
                  className="border-2 border-white text-white px-5 sm:px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-white hover:text-black transition text-center shadow-lg"
                >
                  {exploreText}
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}