"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import Link from "next/link";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(ordersData);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  fetchOrders();
}, []);
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Manage Orders
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
         {loading ? (
  <p className="text-gray-500">Loading Orders...</p>
) : (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">

      <thead className="bg-pink-600 text-white">

        <tr>
          <th className="p-4 text-left">Order ID</th>
          <th className="p-4 text-left">Customer</th>
          <th className="p-4 text-left">Items</th>
          <th className="p-4 text-left">Total</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left">Action</th>
        </tr>

      </thead>

      <tbody>

        {orders.map((order: any) => (

          <tr
            key={order.id}
            className="border-b hover:bg-gray-50"
          >

            <td className="p-4">
              {order.id.slice(0, 8)}
            </td>

            <td className="p-4">
              {order.email}
            </td>

            <td className="p-4">
              {order.totalItems}
            </td>

            <td className="p-4 text-pink-600 font-bold">
              ${order.totalPrice.toFixed(2)}
            </td>

            <td className="p-4">

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                {order.status}
              </span>

            </td>
            <td className="p-4">
  <Link
    href={`/admin/orders/${order.id}`}
    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
  >
    View
  </Link>
</td>

          </tr>

        ))}

      </tbody>

    </table>
  </div>
)}
        </div>
      </div>

      <Footer />
    </>
  );
}