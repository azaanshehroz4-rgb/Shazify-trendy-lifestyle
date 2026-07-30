"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  
    const { user, loading } = useAuth();
const router = useRouter();
const ADMIN_EMAIL = "azaanshehroz4@gmail.com";
console.log("Logged in user:", user);
console.log("Logged in email:", user?.email);
console.log("Admin email:", ADMIN_EMAIL);
useEffect(() => {
  if (loading) return;

  if (!user) {
    router.push("/login?redirect=/admin");
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    router.push("/");
  }
}, [user, loading, router]);
    const [orders, setOrders] = useState<any[]>([]);
const [ordersLoading, setOrdersLoading] = useState(true);
const [pendingOrders, setPendingOrders] = useState(0);
const [totalProducts, setTotalProducts] = useState(0);
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));

      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(ordersData);
      const revenue = ordersData.reduce(
  (sum: number, order: any) => sum + order.totalPrice,
  0
);

setTotalRevenue(revenue);
const uniqueCustomers = new Set(
  ordersData.map((order: any) => order.userId)
);

setCustomers(uniqueCustomers.size);
const pending = ordersData.filter(
  (order: any) => order.status === "Pending"
);

setPendingOrders(pending.length);

const productsSnapshot = await getDocs(collection(db, "products"));

setTotalProducts(productsSnapshot.size);
    } catch (error) {
      console.error(error);
    }

    setOrdersLoading(false);
  };

  fetchOrders();
}, []);
 const [totalRevenue, setTotalRevenue] = useState(0);
 const [customers, setCustomers] = useState(0);
return (
    <div className="min-h-screen bg-gray-100">
    
    
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-pink-600 text-white rounded-xl p-6 shadow">
            <h2 className="text-lg">Total Orders</h2>
            <p className="text-4xl font-bold mt-4"> {loading ? "..." : orders.length}</p>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-6 shadow">
            <h2 className="text-lg">Total Revenue</h2>
            <p className="text-4xl font-bold mt-4">
  ${totalRevenue.toFixed(2)}
</p>
          </div>

          <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
            <h2 className="text-lg">Customers</h2>
            <p className="text-4xl font-bold mt-4">
  {customers}
</p>
          </div>

          <div className="bg-yellow-500 text-white rounded-xl p-6 shadow">
            <h2 className="text-lg">Pending Orders</h2>
            <p className="text-4xl font-bold mt-4">
  {pendingOrders}
</p>

          </div>
          <div className="bg-purple-600 text-white rounded-xl p-6 shadow">
  <h2 className="text-lg">Total Products</h2>

  <p className="text-4xl font-bold mt-4">
    {totalProducts}
  </p>
</div>
<div className="mt-12 bg-white rounded-2xl shadow-lg p-8">

  <h2 className="text-2xl font-bold mb-6">
    Recent Orders
  </h2>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="border-b">

        <tr>
          <th className="text-left py-3">Customer</th>
          <th className="text-left py-3">Items</th>
          <th className="text-left py-3">Total</th>
          <th className="text-left py-3">Status</th>
        </tr>

      </thead>

      <tbody>

        {orders.slice(0, 5).map((order: any) => (

          <tr
            key={order.id}
            className="border-b hover:bg-gray-50"
          >

            <td className="py-4">
              {order.email}
            </td>

            <td>
              {order.totalItems}
            </td>

            <td className="text-pink-600 font-bold">
              ${order.totalPrice.toFixed(2)}
            </td>

            <td>
              {order.status}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>
<div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

  <h2 className="text-2xl font-bold mb-6">
    Quick Actions
  </h2>

  <div className="grid md:grid-cols-4 gap-6">

    <a
      href="/admin/products"
      className="bg-pink-600 text-white rounded-xl p-6 text-center hover:bg-pink-700 transition"
    >
      📦
      <p className="mt-3 font-bold">Manage Products</p>
    </a>

    <a
      href="/admin/orders"
      className="bg-blue-600 text-white rounded-xl p-6 text-center hover:bg-blue-700 transition"
    >
      📋
      <p className="mt-3 font-bold">Manage Orders</p>
    </a>

    <a
      href="/admin/reviews"
      className="bg-green-600 text-white rounded-xl p-6 text-center hover:bg-green-700 transition"
    >
      ⭐
      <p className="mt-3 font-bold">Manage Reviews</p>
    </a>

    <a
      href="/"
      className="bg-purple-600 text-white rounded-xl p-6 text-center hover:bg-purple-700 transition"
    >
      🌐
      <p className="mt-3 font-bold">Visit Store</p>
    </a>

  </div>

</div>

        </div>

      </div>

      <Footer />
    </div>
  );
}