import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-pink-600 mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-gray-700 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              1. Introduction
            </h2>

            <p>
              Welcome to Shazify Trendy Lifestyle. We respect your privacy
              and are committed to protecting the information you provide
              while using our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              2. Information We Collect
            </h2>

            <p>
              When you use Shazify, we may collect information such as your
              name, email address, account information, order information,
              reviews, questions, wishlist information, and other information
              that you voluntarily provide through our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              3. How We Use Your Information
            </h2>

            <p>
              We may use collected information to provide and improve our
              services, process orders, manage customer accounts, provide
              customer support, display reviews and questions, and maintain
              website security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              4. Orders and Payments
            </h2>

            <p>
              Order information may be stored securely to provide order
              processing, order tracking, customer support, and related
              services. Payment information is handled through the payment
              services used by the website and is not intentionally stored
              directly by Shazify unless required for legitimate business
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              5. Cookies and Website Technologies
            </h2>

            <p>
              Shazify may use cookies, local storage, analytics tools, or
              similar technologies to improve website functionality,
              remember preferences, understand website usage, and improve
              the user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              6. Affiliate Links
            </h2>

            <p>
              Some products displayed on Shazify may contain affiliate links.
              If you purchase a product through an affiliate link, Shazify
              may receive a commission at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              7. Third-Party Services
            </h2>

            <p>
              Shazify may use third-party services such as payment providers,
              email services, analytics services, hosting services, Firebase,
              and affiliate platforms. These services may process information
              according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              8. Data Security
            </h2>

            <p>
              We take reasonable measures to protect information from
              unauthorized access, misuse, alteration, or disclosure.
              However, no internet-based service can guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              9. Children's Privacy
            </h2>

            <p>
              Shazify is not intended to knowingly collect personal
              information from children without appropriate consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              10. Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time. Any
              changes will be published on this page with the updated
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              11. Contact Us
            </h2>

            <p>
              If you have questions about this Privacy Policy, you can
              contact us through the Shazify Contact page or by email at:
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