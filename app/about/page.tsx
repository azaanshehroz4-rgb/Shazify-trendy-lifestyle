import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-pink-600 text-center mb-10">
          About Shazify
        </h1>

        <div className="space-y-8 text-gray-700 leading-8">

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Shazify
            </h2>

            <p>
              Welcome to Shazify Trendy Lifestyle, an online shopping and
              product discovery platform offering a variety of fashion,
              beauty, electronics, home, sports, and lifestyle products.
            </p>

            <p className="mt-4">
              Our goal is to make it easier for customers to discover useful,
              stylish, and interesting products in one convenient place.
            </p>
          </section>


          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Shazify Works
            </h2>

            <p>
              Shazify may offer products in two different ways. Some products
              are sold directly by Shazify, while other products are promoted
              through affiliate links to third-party retailers and
              marketplaces.
            </p>

            <p className="mt-4">
              When you purchase a product directly from Shazify, your order,
              payment, shipping, delivery, returns, and refunds are handled
              according to Shazify's applicable policies.
            </p>

            <p className="mt-4">
              When you click an affiliate link, you may be redirected to a
              third-party retailer or marketplace such as AliExpress. Any
              purchase made on that third-party website is completed directly
              with the applicable retailer or seller and is subject to their
              terms and policies.
            </p>
          </section>


          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>

            <p>
              Our mission is to provide customers with a convenient platform
              for discovering products across different categories while
              maintaining clear and transparent information about how our
              website and product links work.
            </p>
          </section>


          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Product Categories
            </h2>

            <p>
              Shazify features products across a range of categories,
              including:
            </p>

            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Fashion</li>
              <li>Electronics</li>
              <li>Beauty</li>
              <li>Home</li>
              <li>Sports</li>
              <li>Lifestyle Products</li>
            </ul>
          </section>


          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transparency
            </h2>

            <p>
              We believe customers should understand whether they are
              purchasing a product directly from Shazify or being referred to
              a third-party retailer.
            </p>

            <p className="mt-4">
              Some links on Shazify may be affiliate links. If you make a
              qualifying purchase through an affiliate link, Shazify may
              receive a commission at no additional cost to you.
            </p>
          </section>


          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Customer Support
            </h2>

            <p>
              We value our customers and aim to provide helpful support for
              products purchased directly from Shazify.
            </p>

            <p className="mt-4">
              For purchases completed directly on third-party websites through
              affiliate links, customers should contact the applicable
              retailer or seller regarding order processing, shipping,
              delivery, returns, refunds, and other transaction-related
              matters.
            </p>
          </section>


          <section className="bg-gray-50 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>

            <p className="text-gray-600">
              Have a question about Shazify or our products?
            </p>

            <a
              href="mailto:shazifyofficial@gmail.com"
              className="inline-block mt-4 text-pink-600 font-semibold hover:text-pink-500 transition"
            >
              shazifyofficial@gmail.com
            </a>
          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}