
"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminSidebar from "../../components/AdminSidebar";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

type ReturnRequest = {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  reason: string;
  description?: string;
  status: string;
  createdAt?: string | null;
  deliveredAt?: string | null;
  adminNote?: string;
};

export default function AdminReturnRequestsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const ADMIN_EMAIL = "shazifyofficial@gmail.com";

  const [requests, setRequests] = useState<ReturnRequest[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login?redirect=/admin/return-requests");
      return;
    }

    if (user.email !== ADMIN_EMAIL) {
      router.push("/");
    }
  }, [user, loading, router]);

  const fetchRequests = async () => {
    if (!user || user.email !== ADMIN_EMAIL) return;

    try {
      setPageLoading(true);

      const token = await user.getIdToken();

      const response = await fetch("/api/admin/return-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to load requests.");
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error("Fetch return requests error:", error);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to load return requests."
      );
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && user?.email === ADMIN_EMAIL) {
      fetchRequests();
    }
  }, [loading, user]);

  const reviewRequest = async (
    requestId: string,
    action: "Approved" | "Rejected"
  ) => {
    const confirmation = window.confirm(
      `Are you sure you want to ${action.toLowerCase()} this return request?`
    );

    if (!confirmation) return;

    try {
      setProcessingId(requestId);
      setMessage("");

      const token = await user!.getIdToken();

      const response = await fetch("/api/admin/return-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requestId,
          action,
          adminNote: notes[requestId] || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to update request.");
      }

      setMessage(
        `${data.message} ${
          data.emailSent
            ? "Customer email sent successfully."
            : "Customer email could not be sent."
        }`
      );

      await fetchRequests();
    } catch (error) {
      console.error("Review request error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setProcessingId("");
    }
  };

  if (loading || !user || user.email !== ADMIN_EMAIL) {
    return <p className="p-10">Checking admin access...</p>;
  }

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-5 md:p-10">
        <div className="flex flex-col md:flex-row gap-8">
          <AdminSidebar />

          <main className="flex-1 min-w-0">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-pink-600">
                  Return Requests
                </h1>

                <p className="text-gray-600 mt-2">
                  Review and manage customer return requests.
                </p>
              </div>

              <button
                onClick={fetchRequests}
                disabled={pageLoading}
                className="bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white px-5 py-3 rounded-lg font-semibold"
              >
                {pageLoading ? "Loading..." : "Refresh"}
              </button>
            </div>

            <div className="bg-white rounded-xl shadow p-5 mb-6">
              <p className="text-gray-500">Pending Requests</p>
              <p className="text-3xl font-bold text-pink-600 mt-1">
                {pendingCount}
              </p>
            </div>

            {message && (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 mb-6">
                {message}
              </div>
            )}

            {pageLoading ? (
              <p className="text-gray-600 p-6">
                Loading return requests...
              </p>
            ) : requests.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                No return requests found.
              </div>
            ) : (
              <div className="space-y-6">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-xl shadow border p-5 md:p-6"
                  >
                    <div className="flex flex-wrap justify-between gap-3 mb-5">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          Order: {request.orderId}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          Submitted:{" "}
                          {request.createdAt
                            ? new Date(request.createdAt).toLocaleString()
                            : "Unavailable"}
                        </p>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          request.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Customer Name</p>
                        <p className="font-semibold text-gray-800">
                          {request.customerName}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Customer Email</p>
                        <p className="font-semibold text-gray-800 break-all">
                          {request.customerEmail}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Return Reason</p>
                        <p className="font-semibold text-gray-800">
                          {request.reason}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Delivery Date</p>
                        <p className="font-semibold text-gray-800">
                          {request.deliveredAt
                            ? new Date(request.deliveredAt).toLocaleString()
                            : "Unavailable"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-gray-500 text-sm mb-1">
                        Customer Details
                      </p>

                      <p className="text-gray-800 whitespace-pre-wrap">
                        {request.description || "No additional details provided."}
                      </p>
                    </div>

                    {request.status === "Pending" && (
                      <div className="mt-6 border-t pt-5">
                        <label className="block font-semibold mb-2 text-gray-700">
                          Admin Note (Optional)
                        </label>

                        <textarea
                          value={notes[request.id] || ""}
                          onChange={(e) =>
                            setNotes((prev) => ({
                              ...prev,
                              [request.id]: e.target.value,
                            }))
                          }
                          maxLength={1000}
                          rows={3}
                          placeholder="Write instructions or reason for rejection..."
                          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
                        />

                        <div className="flex flex-wrap gap-3 mt-4">
                          <button
                            onClick={() =>
                              reviewRequest(request.id, "Approved")
                            }
                            disabled={processingId === request.id}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-5 py-3 rounded-lg font-semibold"
                          >
                            {processingId === request.id
                              ? "Processing..."
                              : "Approve Request"}
                          </button>

                          <button
                            onClick={() =>
                              reviewRequest(request.id, "Rejected")
                            }
                            disabled={processingId === request.id}
                            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-5 py-3 rounded-lg font-semibold"
                          >
                            {processingId === request.id
                              ? "Processing..."
                              : "Reject Request"}
                          </button>
                        </div>
                      </div>
                    )}

                    {request.adminNote && (
                      <div className="mt-5 bg-gray-50 rounded-lg p-4">
                        <p className="font-semibold text-gray-700">
                          Admin Note
                        </p>
                        <p className="text-gray-600 mt-1">
                          {request.adminNote}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
