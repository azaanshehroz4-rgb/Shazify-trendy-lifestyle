"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleForgotPassword = async () => {
  if (!user?.email) {
    alert("No email found.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, user.email);

    alert(
      "Password reset email has been sent. Please check your inbox."
    );
  } catch (error) {
    console.error(error);
    alert("Failed to send password reset email.");
  }
};

const handleUpdatePassword = async () => {
  if (!user || !user.email) return;

  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("Please fill all fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("New Password and Confirm Password do not match.");
    return;
  }

  if (newPassword.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);

    alert("Password updated successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    router.push("/login");

  } catch (error: any) {
    console.error(error);

    if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
      alert("Current password is incorrect.");
    } else {
      alert(error.message);
    }
  }
};


  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Change Password
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="relative mb-5">
  <input
    type={showCurrentPassword ? "text" : "password"}
    placeholder="Current Password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
    className="w-full border rounded-lg p-3 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowCurrentPassword(!showCurrentPassword)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showCurrentPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>
</div>

         <div className="relative mb-5">
  <input
    type={showNewPassword ? "text" : "password"}
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="w-full border rounded-lg p-3 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowNewPassword(!showNewPassword)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showNewPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>
</div>

         <div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm New Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full border rounded-lg p-3 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword(!showConfirmPassword)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showConfirmPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>
</div>

<div className="mt-4 text-right">
 <button
  type="button"
  onClick={handleForgotPassword}
  className="text-pink-600 hover:underline font-medium"
>
  Forgot Password?
</button>
</div>

          <button
          onClick={handleUpdatePassword}
            className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Update Password
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}