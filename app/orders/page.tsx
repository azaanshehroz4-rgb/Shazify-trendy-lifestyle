"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
export default function OrdersPage() {
const { user } = useAuth();

const [orders, setOrders] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchOrders = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
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
}, [user]);

  return (
    <>

      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          My Orders
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {loading ? (
  <p className="text-gray-500">Loading Orders...</p>
) : orders.length === 0 ? (
  <p className="text-gray-500">No Orders Found.</p>
) : (
  <div className="space-y-6">
   
      {orders.map((order: any) => (
  <Link
    key={order.id}
    href={`/orders/${order.id}`}
    className="block border rounded-xl p-6 shadow hover:shadow-xl transition"
  >
    <h2 className="text-xl font-bold">
      Order #{order.id.slice(0, 8)}
    </h2>

    <p className="text-gray-500 mt-2">
      Email: {order.email}
    </p>

    <p className="text-gray-500">
      Total Items: {order.totalItems}
    </p>

    <p className="text-pink-600 font-bold mt-2">
      Total: ${order.totalPrice.toFixed(2)}
    </p>

    <p className="text-green-600 mt-3 font-semibold">
      Status: Pending
    </p>

    {order.products?.map((product: any) => (
      <div
        key={product.id}
        className="flex items-center gap-4 border-t mt-4 pt-4"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={80}
          height={80}
          className="rounded-lg object-cover"
        />

        <div>
          <h3 className="font-bold">{product.name}</h3>

          <p className="text-gray-500">
            Quantity: {product.quantity}
          </p>

          <p className="text-pink-600 font-semibold">
            ${product.price}
          </p>
        </div>
      </div>
    ))}
  </Link>
))}
    
  </div>
)}
            
          
        </div>
      </div>

      <Footer />
    </>
  );
}