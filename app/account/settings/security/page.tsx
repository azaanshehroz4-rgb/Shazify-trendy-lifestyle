"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useAuth } from "../../../context/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SecurityPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const isPasswordLogin = user.providerData?.some(
    (provider) => provider.providerId === "password"
  );

  const handleVerifyEmail = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setMessage("");

      await sendEmailVerification(user);

      setMessage(
        "Verification email has been sent. Please check your inbox."
      );
    } catch (error: any) {
      console.error(error);

      if (error.code === "auth/too-many-requests") {
        setMessage(
          "Too many requests. Please wait a little and try again."
        );
      } else {
        setMessage("Unable to send verification email.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error(error);
      setMessage("Unable to sign out. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 md:p-10">

        {/* Back Button */}
        <button
          onClick={() => router.push("/account/settings")}
          className="mb-6 text-pink-600 font-semibold hover:text-pink-700"
        >
          ← Back to Account Settings
        </button>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Security
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

          {/* Account Security */}
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-bold">
              🛡️ Account Security
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your account security and protect your account.
            </p>
          </div>

          {/* Email Verification */}
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-bold">
              📧 Email Verification
            </h2>

            <p className="text-gray-500 mt-2">
              Your login email:
            </p>

            <p className="font-semibold mt-1">
              {user.email}
            </p>

            <div className="mt-4">

              {user.emailVerified ? (
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                  ✓ Email Verified
                </div>
              ) : (
                <>
                  <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-semibold">
                    ⚠ Email Not Verified
                  </div>

                  <br />

                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={loading}
                    className="mt-4 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
                  >
                    {loading
                      ? "Sending..."
                      : "Send Verification Email"}
                  </button>
                </>
              )}

            </div>
          </div>

         
          {/* Login Method */}
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-bold">
              🔑 Login Method
            </h2>

            <p className="text-gray-500 mt-2">
              Your account is currently using:
            </p>

            <p className="font-semibold mt-1">
              {isPasswordLogin
                ? "Email & Password"
                : user.providerData?.[0]?.providerId || "Unknown"}
            </p>
          </div>

          {/* Account Email */}
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-bold">
              👤 Account Information
            </h2>

            <p className="text-gray-500 mt-2">
              Account name:
            </p>

            <p className="font-semibold">
              {user.displayName || "No Name"}
            </p>

            <p className="text-gray-500 mt-3">
              Account email:
            </p>

            <p className="font-semibold">
              {user.email}
            </p>
          </div>

          {/* Sign Out */}
          <div className="border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-600">
              🚪 Sign Out
            </h2>

            <p className="text-gray-500 mt-2">
              Sign out from your Shazify account on this device.
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className="border rounded-lg p-4 bg-gray-50 text-gray-700">
              {message}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}