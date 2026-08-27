import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[600px] md:h-[80vh] md:min-h-[600px] overflow-hidden">

      <Image
        src="/images/hero-banner-2.jpg"
        alt="Hero Banner"
        fill
        priority
        sizes="100vw"
        className="
          object-cover
          object-[68%_center]
          sm:object-[70%_center]
          md:object-right
        "
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/15" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[520px] sm:min-h-[600px] md:h-full items-center">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

          <div className="max-w-xl text-white">

            {/* Small Heading */}
            <p className="uppercase tracking-[3px] sm:tracking-[4px] text-pink-400 font-semibold text-xs sm:text-sm mb-3">
              NEW COLLECTION 2026
            </p>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05]">
              Discover Your
              <span className="block text-pink-500">
                Perfect Style
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 sm:mt-6 text-sm sm:text-lg text-gray-200 max-w-md leading-relaxed">
              Shop premium fashion, beauty and lifestyle products.
            </p>

            {/* Buttons */}
            <div className="mt-7 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">

              <Link
                href="/deals"
                className="
                  bg-pink-600
                  text-white
                  px-6 sm:px-8
                  py-3
                  rounded-lg
                  text-sm sm:text-base
                  font-semibold
                  hover:bg-pink-700
                  transition
                  text-center
                "
              >
                Shop Now
              </Link>

              <Link
                href="/categories"
                className="
                  border border-white
                  text-white
                  px-6 sm:px-8
                  py-3
                  rounded-lg
                  text-sm sm:text-base
                  font-semibold
                  hover:bg-white
                  hover:text-black
                  transition
                  text-center
                "
              >
                Explore
              </Link>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}