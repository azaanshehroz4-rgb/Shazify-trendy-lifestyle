"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SignupPage() {
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [loading, setLoading] = useState(false);
const router = useRouter();
const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    setLoading(true);

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account Created Successfully!");

    router.push("/");

  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <>
    

      <Navbar />

      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6">

        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

          <h1 className="text-4xl font-bold text-center text-pink-600">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Join Shazify today
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
           <input
             type="text"
             placeholder="Full Name"
             value={name}
             onChange={(e) => setName(e.target.value)}
             className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
           />
           <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
           />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
           />

            <button
               type="submit"
               disabled={loading}
               className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
            >
               {loading ? "Creating Account..." : "Create Account"}
            </button>
              
             

          </form>

              
          

          

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-pink-600 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

      <Footer />
    </>
  );
}