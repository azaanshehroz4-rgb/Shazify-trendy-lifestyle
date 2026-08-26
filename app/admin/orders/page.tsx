"use client";


import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/AdminSidebar";
import { logActivity } from "../../lib/activityLogger";
import { formatPrice } from "../../lib/currency";

export default function AdminOrdersPage() {

  const { user, loading: authLoading } = useAuth();

const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
const [ordersLoading, setOrdersLoading] = useState(true);
const ADMIN_EMAIL = "azaanshehroz4@gmail.com";

useEffect(() => {
  if (authLoading) return;

  if (!user) {
    router.push("/login?redirect=/admin/products");
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    router.push("/");
  }
}, [user, authLoading, router]);
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

    setOrdersLoading(false);
  };

  fetchOrders();
}, []);
const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  try {
    await updateDoc(doc(db, "orders", orderId), {
      status,
    });
    await logActivity(
  `Order ${orderId.slice(0, 8)} status changed to ${status}`
);

    setOrders((prev: any[]) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );

    alert("Order status updated successfully!");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

  <div className="flex gap-8">

    <AdminSidebar />

    <div className="flex-1">
        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Manage Orders
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
         {ordersLoading ? (
  <p className="text-gray-500">Loading Orders...</p>
) : (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">

      <thead className="bg-pink-600 text-white">

        <tr>
          <th className="p-4 text-left">Order ID</th>
          <th className="p-4 text-left">Customer</th>
          <th className="p-4 text-left">Items</th>
          <th className="p-4 text-left">Products</th>
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

           <td className="p-4 font-semibold">
               {order.orderId || order.id.slice(0, 8)}
           </td>

           
           <td className="p-4">
  {order.email}
</td>

<td className="p-4">
  {order.products?.length || 0} items
</td>
<td className="p-4">
  <div className="flex -space-x-2">
    {order.products?.slice(0, 3).map((product: any) => (
      <img
        key={product.id}
        src={product.image}
        alt={product.name}
        className="w-12 h-12 rounded-lg object-cover border-2 border-white"
      />
    ))}
  </div>
</td>

<td className="p-4 font-semibold">
  {formatPrice(order.totalPrice)}
</td>

<td className="p-4">
  <select
    
    value={order.status}
    onChange={(e) =>
      updateOrderStatus(order.id, e.target.value)
    }
    className="border rounded-lg px-3 py-2"
  >
    <option value="Pending">Pending</option>
    <option value="Processing">Processing</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
  </select>
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
     </div>
   </div>
      <Footer />
    </>
  );
}