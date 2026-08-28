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

        {/* Dark overlay */}
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
      <div className="md:hidden relative w-full aspect-[9/16] overflow-hidden">

        <Image
          src="/images/hero-banner-mobile.png"
          alt="Shazify Mobile Hero Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Invisible clickable areas */}
        <Link
          href="/deals"
          aria-label="Shop Now"
          className="absolute left-[6%] top-[44%] w-[40%] h-[7%] z-10"
        />

        <Link
          href="/categories"
          aria-label="Explore"
          className="absolute left-[6%] top-[52%] w-[40%] h-[7%] z-10"
        />

      </div>

    </section>
  );
}