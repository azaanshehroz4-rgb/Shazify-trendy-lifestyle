import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-pink-600 mb-10">
          Terms & Conditions
        </h1>

        <div className="space-y-8 text-gray-700 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>

            <p>
              By accessing or using Shazify Trendy Lifestyle, you agree to
              follow these Terms & Conditions. If you do not agree with these
              terms, please do not use the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              2. Website Use
            </h2>

            <p>
              You agree to use Shazify only for lawful purposes and in a way
              that does not interfere with the operation, security, or
              availability of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              3. Products and Information
            </h2>

            <p>
              We make reasonable efforts to provide accurate product names,
              descriptions, prices, images, availability, and other product
              information. However, information may change and occasional
              errors may occur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              4. Prices and Availability
            </h2>

            <p>
              Product prices and availability may change without prior notice.
              Any applicable price, availability, and purchase conditions
              presented by the relevant seller or third-party platform may
              apply to the final transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              5. Affiliate Links
            </h2>

            <p>
              Shazify may participate in affiliate programs. Some links on
              the website may be affiliate links, which means we may receive
              a commission if you make a qualifying purchase through them.
              This does not necessarily increase the price you pay.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              6. Third-Party Websites
            </h2>

            <p>
              Shazify may link to third-party websites and services. We are
              not responsible for the content, availability, policies, or
              practices of third-party websites. Your use of those websites
              is subject to their own terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              7. User Accounts
            </h2>

            <p>
              If you create an account, you are responsible for maintaining
              the confidentiality of your account information and for
              activities performed through your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              8. Reviews and Questions
            </h2>

            <p>
              Users may submit reviews and questions where these features are
              available. Content submitted by users should be truthful,
              lawful, respectful, and relevant. Shazify may remove content
              that violates applicable rules or negatively affects the
              website or its users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              9. Intellectual Property
            </h2>

            <p>
              Website design, branding, text, graphics, and other original
              content provided by Shazify may be protected by applicable
              intellectual property laws. You may not reproduce or use
              protected content without appropriate permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              10. Limitation of Liability
            </h2>

            <p>
              Shazify is provided on an as-available basis. To the extent
              permitted by applicable law, Shazify is not responsible for
              losses resulting from third-party websites, product
              availability, inaccurate third-party information, or temporary
              website interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              11. Changes to These Terms
            </h2>

            <p>
              We may update these Terms & Conditions from time to time.
              Updated terms will be published on this page. Continued use of
              the website after changes are published may constitute
              acceptance of the updated terms, where permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              12. Contact Us
            </h2>

            <p>
              If you have questions about these Terms & Conditions, you can
              contact Shazify through the Contact page or by email:
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