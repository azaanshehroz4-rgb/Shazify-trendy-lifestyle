"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { formatPrice } from "../lib/currency";

export default function TrackOrderPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!authLoading && !user) {
    router.push("/login?redirect=/track-order");
  }
}, [user, authLoading, router]);
if (authLoading) {
  return <p className="p-10">Loading...</p>;
}

if (!user) {
  return null;
}

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      alert("Please enter Order ID");
      return;
    }
    if (!user) {
  alert("Please login to track your order.");
  return;
}

    try {
      setLoading(true);
      setOrder(null);

      const q = query(
  collection(db, "orders"),
  where("orderId", "==", orderId.trim()),
  where("userId", "==", user.uid)
);

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("Order not found");
        return;
      }

      const orderData = snapshot.docs[0].data();

      setOrder(orderData);
    } catch (error) {
      console.error("Tracking error:", error);
      alert("Something went wrong while tracking your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">

      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        Track Your Order
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <input
          type="text"
          placeholder="Enter Order ID (Example: SHZ-1754012345678)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full border p-4 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          onClick={handleTrackOrder}
          disabled={loading}
          className="bg-pink-600 text-white px-8 py-3 rounded-xl hover:bg-pink-700 transition disabled:opacity-50"
        >
          {loading ? "Searching..." : "Track Order"}
        </button>

        {order && (
          <div className="mt-8 border rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Order {order.orderId}
            </h2>

            <p className="mb-3">
              Status:
              <span className="ml-2 font-semibold text-pink-600">
                {order.status || "Pending"}
              </span>
            </p>

            <p className="mb-3">
              Total Items: {order.totalItems}
            </p>

           <p>
            Total Price: {formatPrice(order.totalPrice)}
            </p>

            <div className="mt-8 border-t pt-8">

  <h3 className="text-2xl font-bold mb-6">
    Order Tracking
  </h3>

  {(() => {
    const statuses = [
      {
        name: "Pending",
        icon: "📦",
      },
      {
        name: "Processing",
        icon: "⚙️",
      },
      {
        name: "Shipped",
        icon: "🚚",
      },
      {
        name: "Delivered",
        icon: "✅",
      },
    ];

    const statusOrder = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
    ];

    const currentStatus = order.status || "Pending";

    const currentIndex =
      statusOrder.indexOf(currentStatus);

    return (
      <div className="space-y-6">

        {statuses.map((status, index) => {

          const completed =
            index <= currentIndex;

          return (
            <div
              key={status.name}
              className="flex items-center gap-4"
            >

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  completed
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {status.icon}
              </div>

              <div>
                <p
                  className={`font-bold ${
                    completed
                      ? "text-pink-600"
                      : "text-gray-400"
                  }`}
                >
                  {status.name}
                </p>

                <p className="text-sm text-gray-500">
                  {completed
                    ? "Completed"
                    : "Pending"}
                </p>
              </div>

            </div>
          );
        })}

      </div>
    );
  })()}

</div>

          </div>
        )}

      </div>

    </div>
  );
}