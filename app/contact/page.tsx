import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-center mb-10">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-2xl font-bold mb-6">
              Get In Touch
            </h2>

            <p className="mb-4">
              📧 Email: support@shazify.com
            </p>

            <p className="mb-4">
              📞 Phone: +92 300 1234567
            </p>

            <p>
              📍 Address: Lahore, Pakistan
            </p>
          </div>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg p-3"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border rounded-lg p-3"
            />

            <button
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}