"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountSettingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Account Settings
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

         <div className="border rounded-xl p-6">
  <h2 className="text-xl font-bold">
    👤 Profile
  </h2>

  <p className="text-gray-500 mt-2">
    Name: {user.displayName || "No Name"}
  </p>

  <p className="text-gray-500">
    Email: {user.email}
  </p>
</div>

         <div className="border rounded-xl p-6">
  <h2 className="text-xl font-bold">
    📧 Email
  </h2>

  <p className="text-gray-500 mt-2">
    Your login email:
  </p>

  <p className="font-semibold mt-1">
    {user.email}
  </p>
</div>

         <div className="border rounded-xl p-6">
  <h2 className="text-xl font-bold">
    🔒 Password
  </h2>

  <p className="text-gray-500 mt-2">
    Keep your account secure by updating your password.
  </p>

  <button
  onClick={() => router.push("/account/settings/password")}
  className="mt-4 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
>
  Change Password
</button>
</div>
         <div
  onClick={() => router.push("/account/settings/security")}
  className="border rounded-xl p-6 cursor-pointer hover:shadow-md hover:border-pink-500 transition"
>
  <h2 className="text-xl font-bold">
    🛡️ Security
  </h2>

  <p className="text-gray-500 mt-2">
    Manage your account security.
  </p>

  <button
    onClick={(e) => {
      e.stopPropagation();
      router.push("/account/settings/security");
    }}
    className="mt-4 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
  >
    Security Settings
  </button>
</div>
        </div>

      </div>

      <Footer />
    </>
  );
}