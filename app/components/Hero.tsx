import Image from "next/image";
import Link from "next/link";

export default function Hero() {
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

              <p className="uppercase tracking-[4px] text-pink-400 font-semibold mb-3">
                NEW COLLECTION 2026
              </p>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                Discover Your
                <span className="block text-pink-500">
                  Perfect Style
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-200">
                Shop premium fashion, beauty and lifestyle products.
              </p>

              <div className="mt-8 flex gap-4">

                <Link
                  href="/deals"
                  className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition"
                >
                  Shop Now
                </Link>

                <Link
                  href="/categories"
                  className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition"
                >
                  Explore
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ==================== MOBILE BANNER ==================== */}
      <div className="md:hidden relative w-full min-h-[620px] overflow-hidden">

        {/* Original Hero Image */}
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
                NEW COLLECTION 2026
              </p>


              {/* Mobile Heading */}
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.05]">
                Discover Your
                <span className="block text-pink-500">
                  Perfect Style
                </span>
              </h1>


              {/* Mobile Description */}
              <p className="mt-5 text-sm sm:text-base text-gray-200 leading-relaxed max-w-xs">
                Shop premium fashion, beauty and lifestyle products.
              </p>


              {/* Mobile Buttons */}
              <div className="mt-7 flex gap-3">

                <Link
                  href="/deals"
                  className="bg-pink-600 text-white px-5 sm:px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-pink-700 transition text-center shadow-lg"
                >
                  Shop Now
                </Link>

                <Link
                  href="/categories"
                  className="border-2 border-white text-white px-5 sm:px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-white hover:text-black transition text-center shadow-lg"
                >
                  Explore
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}