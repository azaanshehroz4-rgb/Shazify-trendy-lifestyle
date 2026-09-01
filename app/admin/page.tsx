"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";
import AdminStats from "../components/AdminStats";
import RecentOrders from "../components/RecentOrders";
import QuickActions from "../components/QuickActions";
import SalesChart from "../components/SalesChart";
import TopProducts from "../components/TopProducts";
import LowStockAlert from "../components/LowStockAlert";
import LatestActivity from "../components/LatestActivity";
import ExportButtons from "../components/ExportButtons";
import AdminNotifications from "../components/AdminNotifications";
import AdminActivity from "../components/AdminActivity";
import HeroSettings from "../components/HeroSettings";
import { requestNotificationPermission } from "../lib/firebase-messaging";

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
useEffect(() => {
  if (loading) return;
  if (!user) return;
  if (user.email !== ADMIN_EMAIL) return;

  const setupNotifications = async () => {
    try {
      const token = await requestNotificationPermission();

      await setDoc(
        doc(db, "adminNotificationTokens", token),
        {
          token,
          adminEmail: user.email,
          userId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      console.log("Admin notification token saved successfully.");
    } catch (error) {
      console.error("Notification setup failed:", error);
    }
  };

  setupNotifications();
}, [loading, user]);
    const [orders, setOrders] = useState<any[]>([]);
const [ordersLoading, setOrdersLoading] = useState(true);
const [pendingOrders, setPendingOrders] = useState(0);
const [totalProducts, setTotalProducts] = useState(0);
const [averageOrderValue, setAverageOrderValue] = useState(0);
const [processingOrders, setProcessingOrders] = useState(0);
const [shippedOrders, setShippedOrders] = useState(0);
const [deliveredOrders, setDeliveredOrders] = useState(0);
const [salesData, setSalesData] = useState<
  { name: string; revenue: number }[]
>([]);
const [topProducts, setTopProducts] = useState<
  { name: string; sold: number }[]
>([]);
const [products, setProducts] = useState<any[]>([]);
const [lowStockProducts, setLowStockProducts] = useState(0);
const [activities, setActivities] = useState([
  {
    title: "Admin Dashboard Started",
    time: "",
  },
]);

useEffect(() => {
  setActivities([
    {
      title: "Admin Dashboard Started",
      time: new Date().toLocaleString(),
    },
  ]);
}, []);

useEffect(() => {

  if (loading) return;

  if (!user) return;

  if (user.email !== ADMIN_EMAIL) return;
  
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
const average =
  ordersData.length > 0
    ? revenue / ordersData.length
    : 0;

setAverageOrderValue(average);
const pending = ordersData.filter(
  (order: any) => order.status === "Pending"
);

setPendingOrders(pending.length);
const processing = ordersData.filter(
  (order: any) => order.status === "Processing"
);

setProcessingOrders(processing.length);

const shipped = ordersData.filter(
  (order: any) => order.status === "Shipped"
);

setShippedOrders(shipped.length);

const delivered = ordersData.filter(
  (order: any) => order.status === "Delivered"
);

setDeliveredOrders(delivered.length);

const productsSnapshot = await getDocs(collection(db, "products"));

setTotalProducts(productsSnapshot.size);
const productsData = productsSnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

const lowStock = productsData.filter(
  (product: any) => product.stock <= 5
);

setLowStockProducts(lowStock.length);


setProducts(productsData);
const monthlyData: { [key: string]: number } = {};

ordersData.forEach((order: any) => {
  if (!order.createdAt) return;

  const date = order.createdAt.toDate();
  const month = date.toLocaleString("default", {
    month: "short",
  });

  monthlyData[month] =
    (monthlyData[month] || 0) + order.totalPrice;
});

const chartData = Object.keys(monthlyData).map((month) => ({
  name: month,
  revenue: monthlyData[month],
}));

setSalesData(chartData);
const productSales: { [key: string]: number } = {};

ordersData.forEach((order: any) => {
  if (!order.products) return;

  order.products.forEach((item: any) => {
    productSales[item.name] =
      (productSales[item.name] || 0) + item.quantity;
  });
});

const topSelling = Object.keys(productSales)
  .map((name) => ({
    name,
    sold: productSales[name],
  }))
  .sort((a, b) => b.sold - a.sold)
  .slice(0, 5);

setTopProducts(topSelling);
    } catch (error) {
      console.error(error);
    }

    setOrdersLoading(false);
  };

  fetchOrders();
}, [loading, user]);
 const [totalRevenue, setTotalRevenue] = useState(0);
 const [customers, setCustomers] = useState(0);
 if (loading) {
  return <p className="p-10">Checking access...</p>;
}

if (!user) {
  return null;
}

if (user.email !== ADMIN_EMAIL) {
  return null;
}
 
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
  averageOrderValue={averageOrderValue}
  processingOrders={processingOrders}
shippedOrders={shippedOrders}
deliveredOrders={deliveredOrders}
/>
<AdminNotifications
  pendingOrders={pendingOrders}
  lowStockProducts={lowStockProducts}
/>


<div className="mt-8">
  <SalesChart data={salesData} />
</div>
<AdminActivity activities={activities} />
<RecentOrders orders={orders} />
<LowStockAlert products={products} />
<TopProducts products={topProducts} />
<LatestActivity orders={orders} />
<ExportButtons orders={orders} />
<QuickActions />
<HeroSettings />






        </div>
        </div>

      </div>
 
      <Footer />
 
     </div>
  );
}