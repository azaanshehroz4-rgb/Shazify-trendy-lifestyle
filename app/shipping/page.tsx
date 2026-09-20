import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ShippingPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-pink-600 mb-10">
          Shipping & Delivery Policy
        </h1>

        <div className="space-y-8 text-gray-700 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              1. Introduction
            </h2>

            <p>
              Shazify Trendy Lifestyle offers products that may either be sold
              directly by Shazify or promoted through affiliate links to
              third-party retailers and marketplaces.
            </p>

            <p className="mt-4">
              Shipping and delivery arrangements depend on whether the product
              is purchased directly from Shazify or through a third-party
              retailer using an affiliate link.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              2. Shipping for Products Purchased Directly from Shazify
            </h2>

            <p>
              For products purchased directly from Shazify, we are responsible
              for processing the order and arranging applicable shipping and
              delivery.
            </p>

            <p className="mt-4">
              Available shipping methods, delivery charges, and estimated
              delivery times may vary depending on the product, destination,
              and other order-related factors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              3. Order Processing
            </h2>

            <p>
              Orders for products sold directly by Shazify are processed after
              successful payment confirmation.
            </p>

            <p className="mt-4">
              Processing times may vary depending on product availability,
              order volume, holidays, weekends, and other circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              4. Delivery Times
            </h2>

            <p>
              Estimated delivery times for direct Shazify purchases may vary
              depending on the delivery location, shipping method, product
              availability, and courier service.
            </p>

            <p className="mt-4">
              Any delivery estimate provided at the time of purchase is an
              estimate and may be affected by circumstances outside our
              reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              5. Shipping Charges
            </h2>

            <p>
              Shipping charges for products purchased directly from Shazify
              may vary depending on the product, delivery location, order
              size, and available shipping method.
            </p>

            <p className="mt-4">
              Any applicable shipping charges will be communicated to the
              customer before the order is completed, where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              6. Delays and Delivery Issues
            </h2>

            <p>
              Delivery may occasionally be delayed due to courier issues,
              weather, public holidays, incorrect delivery information,
              operational disruptions, or other circumstances beyond our
              reasonable control.
            </p>

            <p className="mt-4">
              If you experience a delivery issue with a product purchased
              directly from Shazify, please contact us so we can review the
              order and assist you where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              7. Incorrect or Incomplete Delivery Information
            </h2>

            <p>
              Customers are responsible for providing accurate and complete
              delivery information when placing an order directly with
              Shazify.
            </p>

            <p className="mt-4">
              Delays or additional delivery costs resulting from incorrect or
              incomplete information may be the customer's responsibility,
              where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              8. Affiliate and Third-Party Products
            </h2>

            <p>
              Some products displayed on Shazify are promoted through affiliate
              links to third-party retailers or marketplaces, such as
              AliExpress.
            </p>

            <p className="mt-4">
              When you click an affiliate link and complete a purchase on a
              third-party website, the order is processed and fulfilled by the
              applicable third-party retailer or seller.
            </p>

            <p className="mt-4">
              Shazify does not process payment, package, ship, or deliver
              products purchased directly from third-party websites through
              affiliate links.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              9. Third-Party Delivery Policies
            </h2>

            <p>
              Shipping charges, delivery times, available shipping methods,
              tracking, customs requirements, and other delivery conditions for
              affiliate purchases are determined by the applicable
              third-party retailer or seller.
            </p>

            <p className="mt-4">
              Customers should review the shipping and delivery information
              provided on the third-party website before completing an
              affiliate purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              10. Customs, Duties, and Taxes
            </h2>

            <p>
              For purchases made through third-party retailers or marketplaces,
              any applicable customs duties, import charges, taxes, or other
              fees may be determined by the destination country and the
              applicable retailer, seller, or shipping provider.
            </p>

            <p className="mt-4">
              Customers should review the applicable information provided by
              the third-party retailer before completing an international
              purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              11. Tracking Information
            </h2>

            <p>
              Where tracking is available for direct Shazify purchases,
              tracking information may be provided to the customer when
              available.
            </p>

            <p className="mt-4">
              For affiliate purchases, tracking information and delivery
              updates are provided according to the policies and systems of
              the relevant third-party retailer or seller.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              12. Contact Us
            </h2>

            <p>
              If you have questions about shipping or delivery for a product
              purchased directly from Shazify, please contact us at:
            </p>

            <p className="text-pink-600 font-semibold mt-2">
              shazifyofficial@gmail.com
            </p>

            <p className="mt-4">
              For purchases completed directly on a third-party website,
              customers should also contact the relevant retailer or seller
              according to their applicable support and delivery policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              13. Policy Updates
            </h2>

            <p>
              Shazify may update this Shipping & Delivery Policy from time to
              time. Any updated version will be published on this page.
            </p>
          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}