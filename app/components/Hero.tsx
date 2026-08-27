import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">

      <Image
        src="/images/hero-banner-2.jpg"
        alt="Hero Banner"
        fill
        priority
        className="object-cover object-right"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12">

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

    </section>
  );
}