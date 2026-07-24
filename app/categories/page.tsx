import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const categories = [
  "Fashion",
  "Electronics",
  "Beauty",
  "Home",
  "Sports",
];

export default function CategoriesPage() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-16 px-6">

        <h1 className="text-5xl font-bold text-center mb-12">
          Shop by Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="bg-pink-600 text-white rounded-2xl p-10 text-center text-2xl font-bold hover:bg-pink-700 transition"
            >
              {category}
            </Link>
          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}