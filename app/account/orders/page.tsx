"use client";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function MyOrdersPage() {
  const { user } = useAuth();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          My Orders
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">
            You have no orders yet.
          </p>
        ) : (
          <div className="space-y-6">

            {orders.map((order: any) => (
              <div
                key={order.id}
                className="border rounded-xl p-6 shadow"
              >

                <h2 className="font-bold text-xl">
                  Order #{order.id.slice(0, 8)}
                </h2>

                <p className="mt-2">
                  Total Items: {order.totalItems}
                </p>

                <p>
                  Total Price: ${order.totalPrice.toFixed(2)}
                </p>
                <p className="mt-2 text-gray-500">
  Order Date:
  {order.createdAt?.seconds
    ? " " +
      new Date(order.createdAt.seconds * 1000).toLocaleDateString()
    : " N/A"}
</p>

               <p className="mt-2">
  Status:
  <span
    className={`ml-2 px-3 py-1 rounded-full text-sm ${
      order.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : order.status === "Processing"
        ? "bg-blue-100 text-blue-700"
        : order.status === "Shipped"
        ? "bg-purple-100 text-purple-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {order.status}
  </span>
</p>

<div className="mt-5 border-t pt-4">
  <h3 className="font-bold mb-3">
    Ordered Products
  </h3>

  {order.products?.map((product: any) => (
    <div
      key={product.id}
      className="flex justify-between py-2 border-b"
    >
      <div>
        <p className="font-semibold">
          {product.name}
        </p>

        <p className="text-gray-500 text-sm">
          Quantity: {product.quantity}
        </p>
      </div>

      <p className="font-bold text-pink-600">
        ${product.price}
      </p>
    </div>
  ))}
</div>

<Link
  href={`/account/orders/${order.id}`}
  className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
>
  View Details
</Link>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}