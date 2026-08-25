import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-pink-600 mb-10">
          Affiliate Disclosure
        </h1>

        <div className="space-y-8 text-gray-700 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              1. Our Affiliate Relationship
            </h2>

            <p>
              Shazify Trendy Lifestyle may participate in affiliate marketing
              programs. This means that some links on our website may be
              affiliate links.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              2. How Affiliate Links Work
            </h2>

            <p>
              When you click an affiliate link on Shazify and make a
              qualifying purchase through the linked third-party website,
              Shazify may receive a commission from that purchase.
            </p>

            <p className="mt-4">
              In most cases, using an affiliate link does not increase the
              price you pay for the product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              3. AliExpress Affiliate Links
            </h2>

            <p>
              Some products featured on Shazify may be promoted through the
              AliExpress affiliate program. When you follow an affiliate link
              and complete an eligible purchase, Shazify may earn a
              commission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              4. Product Recommendations
            </h2>

            <p>
              Our affiliate relationships do not mean that every product
              recommendation is guaranteed to be the best option for every
              customer. Product prices, availability, specifications, seller
              information, shipping conditions, and other details may change.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              5. Third-Party Transactions
            </h2>

            <p>
              When you click an affiliate link and purchase from a
              third-party marketplace, the transaction is completed according
              to that marketplace's terms, policies, pricing, shipping,
              refund, and return conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              6. Transparency
            </h2>

            <p>
              We aim to clearly disclose our affiliate relationships so that
              visitors understand that Shazify may receive compensation from
              qualifying purchases made through certain links.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              7. Contact Us
            </h2>

            <p>
              If you have any questions about our affiliate relationships,
              please contact us at:
            </p>

            <p className="text-pink-600 font-semibold mt-2">
              azaanshehroz4@gmail.com
            </p>
          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}