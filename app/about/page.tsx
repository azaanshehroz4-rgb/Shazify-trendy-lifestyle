import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-center mb-10">
          About Shazify
        </h1>

        <p className="text-lg text-gray-600 leading-8 text-center">
          Welcome to Shazify, your trusted destination for trendy lifestyle
          products. We carefully select quality products in Fashion,
          Electronics, Beauty, Home, and Sports to give our customers the
          best shopping experience.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-3">
              🚀 Our Mission
            </h2>

            <p className="text-gray-600">
              Deliver quality products at affordable prices.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-3">
              🔒 Secure Shopping
            </h2>

            <p className="text-gray-600">
              Safe, trusted and reliable shopping experience.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-3">
              ❤️ Customer First
            </h2>

            <p className="text-gray-600">
              Customer satisfaction is always our top priority.
            </p>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}