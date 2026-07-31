"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { updateDoc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { logActivity } from "../../../lib/activityLogger";

export default function AdminOrderDetailsPage() {
  const { user } = useAuth();
const router = useRouter();
    const { id } = useParams();

const [order, setOrder] = useState<any>(null);
const [loading, setLoading] = useState(true);
const ADMIN_EMAIL = "azaanshehroz4@gmail.com";

useEffect(() => {
  if (!user) {
    router.push("/login");
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    router.push("/");
  }
}, [user, router]);
useEffect(() => {
  const fetchOrder = async () => {
    try {
      const docRef = doc(db, "orders", id as string);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrder({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  fetchOrder();
}, [id]);
const updateStatus = async (status: string) => {
  if (!order) return;

  try {
    const orderRef = doc(db, "orders", order.id);

    await updateDoc(orderRef, {
      status,
    });
    await logActivity(
  `Order ${order.id.slice(0, 8)} status changed to ${status}`
);

    setOrder({
      ...order,
      status,
    });

  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Order Details
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {loading ? (
  <p className="text-gray-500">Loading Order...</p>
) : order ? (
  <div className="space-y-6">

    <div>
      <h2 className="text-2xl font-bold">
        Order #{order.id.slice(0, 8)}
      </h2>

     <div className="mt-4 space-y-2">

  <p>
    <strong>Name:</strong> {order.fullName}
  </p>

  <p>
    <strong>Email:</strong> {order.email}
  </p>

  <p>
    <strong>Phone:</strong> {order.phone}
  </p>

  <p>
    <strong>City:</strong> {order.city}
  </p>

  <p>
    <strong>Postal Code:</strong> {order.postalCode}
  </p>

  <p>
    <strong>Country:</strong> {order.country}
  </p>

  <p>
    <strong>Address:</strong> {order.address}
  </p>

  <p>
    <strong>Payment:</strong> {order.paymentMethod}
  </p>

</div>

      <p className="text-pink-600 font-bold mt-2">
        Total: ${order.totalPrice.toFixed(2)}
      </p>

      <p className="text-gray-600">
        Total Items: {order.totalItems}
      </p>

      <p className="mt-2">
        Status:
        <span className="ml-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          {order.status}
        </span>
        </p>
        <div className="flex gap-3 mt-6">

  <button
    onClick={() => updateStatus("Processing")}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
      Processing
  </button>
  <button
    onClick={() => updateStatus("Shipped")}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    Shipped
  </button>

  <button
    onClick={() => updateStatus("Delivered")}
    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
  >
    Delivered
  </button>

</div>

    <div className="mt-10">

  <h2 className="text-2xl font-bold mb-6">
    Ordered Products
  </h2>

  <div className="space-y-4">

    {order.products.map((item: any) => (

      <div
        key={item.id}
        className="flex justify-between border rounded-xl p-4"
      >

        <div>

          <h3 className="font-bold">
            {item.name}
          </h3>


          <p className="text-gray-500">
            Quantity: {item.quantity}
          </p>

        </div>

        <p className="font-bold text-pink-600">
          ${item.price}
        </p>

      </div>

    ))}

  </div>

</div>
  
  

  
      
      <div className="mt-8 border-t pt-6">

  <h2 className="text-2xl font-bold mb-6">
    Billing Information
  </h2>

  <div className="space-y-3">

    <p>
      <strong>Full Name:</strong> {order.fullName}
    </p>

    <p>
      <strong>Email:</strong> {order.email}
    </p>

    <p>
      <strong>Phone:</strong> {order.phone}
    </p>

    <p>
      <strong>City:</strong> {order.city}
    </p>

    <p>
      <strong>Postal Code:</strong> {order.postalCode}
    </p>

    <p>
      <strong>Country:</strong> {order.country}
    </p>

    <p>
      <strong>Address:</strong> {order.address}
    </p>

    <p>
      <strong>Payment Method:</strong> {order.paymentMethod}
    </p>

  </div>

</div>
    </div>

  </div>
) : (
  <p>Order not found.</p>
)}

        </div>

      </div>

      <Footer />
    </>
  );
}