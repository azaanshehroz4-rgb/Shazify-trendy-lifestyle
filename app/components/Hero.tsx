import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* Desktop Banner */}
      <div className="hidden md:block relative w-full h-[80vh] min-h-[600px]">
        <Image
          src="/images/hero-banner-2.jpg"
          alt="Hero Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10"></div>

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

{/* Mobile Banner */}
<div className="md:hidden relative w-full bg-black">

  <div className="relative w-full aspect-[9/16]">
    <Image
      src="/images/hero-banner-mobile.png"
      alt="Shazify Mobile Hero Banner"
      fill
      priority
      sizes="100vw"
      className="object-contain"
    />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/25"></div>

    {/* Mobile Content */}
    <div className="absolute inset-0 z-10 flex items-center">
      <div className="w-full px-5 text-white">

        <p className="uppercase tracking-[3px] text-pink-400 font-semibold text-xs mb-3">
          NEW COLLECTION 2026
        </p>

        <h1 className="text-4xl font-extrabold leading-[1.05]">
          Discover Your
          <span className="block text-pink-500">
            Perfect Style
          </span>
        </h1>

        <p className="mt-4 text-sm text-gray-200 max-w-xs">
          Shop premium fashion, beauty and lifestyle products.
        </p>

        <div className="mt-6 flex gap-3">

          <Link
            href="/deals"
            className="bg-pink-600 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-pink-700 transition"
          >
            Shop Now
          </Link>

          <Link
            href="/categories"
            className="border border-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition"
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