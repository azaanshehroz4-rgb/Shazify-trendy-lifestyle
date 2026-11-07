
"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

type ReturnRequest = {
  id: string;
  orderId: string;
  reason: string;
  description: string;
  status: string;
  adminNote: string;
  createdAt: string | null;
  reviewedAt: string | null;
};

export default function MyReturnsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [requests, setRequests] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
      try {
        const token = await user.getIdToken();

        const response = await fetch("/api/my-return-requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load requests.");
        }

        setRequests(data.requests || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const statusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 min-h-[60vh]">
        <button
          onClick={() => router.push("/account")}
          className="text-pink-600 font-semibold mb-6"
        >
          ← Back to My Account
        </button>

        <h1 className="text-3xl font-bold mb-2">
          My Return Requests
        </h1>

        <p className="text-gray-500 mb-8">
          Check the latest status of your return requests.
        </p>

        {loading && (
          <p className="text-gray-500">Loading your requests...</p>
        )}

        {!loading && error && (
          <p className="text-red-600">{error}</p>
        )}

        {!loading && !error && requests.length === 0 && (
          <div className="border rounded-xl p-8 text-center">
            <p className="text-gray-600 mb-4">
              You have not submitted any return requests yet.
            </p>

            <button
              onClick={() => router.push("/return-request")}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg"
            >
              Submit Return Request
            </button>
          </div>
        )}

        <div className="space-y-5">
          {requests.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-6 shadow-sm"
            >
              <div className="flex flex-wrap justify-between gap-3 mb-4">
                <h2 className="font-bold text-lg">
                  Order: {item.orderId}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-gray-700">
                <strong>Reason:</strong> {item.reason}
              </p>

              {item.description && (
                <p className="text-gray-600 mt-2">
                  <strong>Details:</strong> {item.description}
                </p>
              )}

              {item.createdAt && (
                <p className="text-gray-500 text-sm mt-3">
                  Submitted: {new Date(item.createdAt).toLocaleString()}
                </p>
              )}

              {item.adminNote && (
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <strong>Shazify Team Note:</strong>
                  <p className="text-gray-700 mt-1">
                    {item.adminNote}
                  </p>
                </div>
              )}

              {item.status === "Approved" && (
                <p className="text-green-700 text-sm mt-4">
                  Your request is approved. Please wait for our return instructions before dispatching the product.
                </p>
              )}

              {item.status === "Pending" && (
                <p className="text-yellow-700 text-sm mt-4">
                  Your request is waiting for review by our team.
                </p>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
