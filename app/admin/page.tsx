"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const { user } = useAuth();
const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  fetchOrders();
}, []);
 const [totalRevenue, setTotalRevenue] = useState(0);
 const [customers, setCustomers] = useState(0);
return (
    
    <>
    
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
            <p className="text-4xl font-bold mt-4">0</p>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}