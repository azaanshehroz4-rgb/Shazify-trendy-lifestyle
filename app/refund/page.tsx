import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RefundPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-pink-600 mb-10">
          Refund & Return Policy
        </h1>

        <div className="space-y-8 text-gray-700 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              1. Introduction
            </h2>

            <p>
              Shazify Trendy Lifestyle may feature products available through
              third-party sellers and affiliate platforms. Because purchases
              may be completed through an external seller, refund and return
              conditions are generally determined by the seller or platform
              from which the purchase is made.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              2. Affiliate Purchases
            </h2>

            <p>
              When you purchase a product through an affiliate link on
              Shazify, the transaction is completed with the relevant
              third-party seller or marketplace. Shazify does not directly
              process the product purchase unless specifically stated on the
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              3. Returns
            </h2>

            <p>
              Return eligibility, return periods, shipping requirements, and
              product-condition requirements are determined by the seller or
              marketplace. Customers should review the applicable seller's
              return policy before completing a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              4. Refunds
            </h2>

            <p>
              Refunds for purchases made through third-party sellers are
              processed according to the seller's refund policy. Shazify does
              not guarantee or independently determine whether a third-party
              seller will approve a refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              5. Damaged or Incorrect Products
            </h2>

            <p>
              If a product arrives damaged, defective, incomplete, or
              different from the product ordered, customers should contact
              the seller or marketplace through which the purchase was made
              and follow its dispute or return process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              6. Order Information
            </h2>

            <p>
              Shazify may provide order-related information and customer
              support where applicable. However, the final responsibility for
              fulfilling an order, shipping the product, handling returns,
              and issuing refunds remains with the relevant seller or
              marketplace when the purchase is completed externally.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              7. Contact Us
            </h2>

            <p>
              If you have questions about a product or an order, you may
              contact us through the Shazify Contact page.
            </p>

            <p className="text-pink-600 font-semibold mt-2">
              azaanshehroz4@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              8. Policy Updates
            </h2>

            <p>
              Shazify may update this Refund & Return Policy when our
              services, business model, or third-party relationships change.
              Updated information will be published on this page.
            </p>
          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}