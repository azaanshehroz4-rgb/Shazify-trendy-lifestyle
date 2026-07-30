"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";
import AdminStats from "../components/AdminStats";
import RecentOrders from "../components/RecentOrders";
import QuickActions from "../components/QuickActions";

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

  <div className="flex gap-8">

    <AdminSidebar />

    <div className="flex-1">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Admin Dashboard
        </h1>

       <AdminStats
  totalOrders={orders.length}
  totalRevenue={totalRevenue}
  customers={customers}
  pendingOrders={pendingOrders}
  totalProducts={totalProducts}
/>

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

<RecentOrders orders={orders} />
<QuickActions />

        </div>
        </div>

      </div>
 
      <Footer />
 
     </div>
  );
}