
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function ReturnRequestPage() {
  const { user } = useAuth();

  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!orderId.trim() || !reason) {
      setMessage("Please enter your Order ID and select a reason.");
      return;
    }

    if (!user && !email.trim()) {
      setMessage("Please enter the email used for your order.");
      return;
    }

    setLoading(true);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (user) {
        const token = await user.getIdToken();
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch("/api/return-request", {
        method: "POST",
        headers,
        body: JSON.stringify({
          orderId: orderId.trim(),
          email: email.trim(),
          reason,
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit your request.");
      }

      setSuccess(true);
      setMessage(data.message || "Your return request has been submitted.");
      setOrderId("");
      setEmail("");
      setReason("");
      setDescription("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-5 py-14">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-3">
          Return Request
        </h1>

        <p className="text-gray-600 mb-8">
          Need to return a Shazify order? Submit your request using the form below.
        </p>

        <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mb-8">
          <p className="text-gray-700 text-sm leading-6">
            Return requests must be submitted within 3 days (72 hours)
            of delivery. Your order must be marked as Delivered.
            Affiliate purchases follow the original seller's return policy.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border p-6 md:p-8 space-y-5"
        >
          <div>
            <label className="block font-semibold mb-2">
              Order ID *
            </label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Example: SHZ-123456789"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {!user && (
            <div>
              <label className="block font-semibold mb-2">
                Order Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the email used at checkout"
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold mb-2">
              Reason for Return *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select a reason</option>
              <option value="Damaged product">Product arrived damaged</option>
              <option value="Wrong product">Wrong product received</option>
              <option value="Defective product">Product is defective</option>
              <option value="Missing items">Items are missing</option>
              <option value="Other">Other reason</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Additional Details
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please explain the issue with your order..."
              rows={5}
              maxLength={2000}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {message && (
            <div
              className={`rounded-lg p-4 text-sm ${
                success
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-semibold rounded-lg py-3"
          >
            {loading ? "Submitting..." : "Submit Return Request"}
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
