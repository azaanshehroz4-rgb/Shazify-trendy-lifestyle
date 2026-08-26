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
import { formatPrice } from "../../../lib/currency";

export default function AdminOrderDetailsPage() {
  const { user } = useAuth();
const router = useRouter();
    const { id } = useParams();

const [order, setOrder] = useState<any>(null);
const [loading, setLoading] = useState(true);
const ADMIN_EMAIL = "azaanshehroz4@gmail.com";
const [trackingNumber, setTrackingNumber] = useState("");
const [courier, setCourier] = useState("");

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
        setTrackingNumber(docSnap.data().trackingNumber || "");
        setCourier(docSnap.data().courier || "");
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
const saveTrackingInfo = async () => {
  if (!order) return;

  try {
    await updateDoc(doc(db, "orders", order.id), {
      trackingNumber,
      courier,
    });

    await logActivity(
      `Tracking updated for ${order.orderId || order.id}`
    );

    alert("Tracking information saved!");
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
         Total: {formatPrice(order.totalPrice)}
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
        className="flex items-center justify-between border rounded-xl p-4"
     >

       <div className="flex items-center gap-4">

  <img
    src={item.image}
    alt={item.name}
    className="w-20 h-20 rounded-lg object-cover border"
  />

  <div>
    <h3 className="font-bold">
      {item.name}
    </h3>

    <p className="text-gray-500">
      Quantity: {item.quantity}
    </p>
  </div>

</div>

       <p className="font-bold text-pink-600">
             {formatPrice(item.price)}
       </p>
      </div>

    ))}

  </div>

</div> 
  
  <div className="mt-10 border-t pt-8">

  <h2 className="text-2xl font-bold mb-6">
    Tracking Information
  </h2>

  <div className="space-y-5">

    <input
      type="text"
      placeholder="Tracking Number"
      value={trackingNumber}
      onChange={(e) => setTrackingNumber(e.target.value)}
      className="w-full border rounded-xl p-3"
    />

    <select
      value={courier}
      onChange={(e) => setCourier(e.target.value)}
      className="w-full border rounded-xl p-3"
    >
      <option value="">Select Courier</option>
      <option value="Leopards">Leopards</option>
      <option value="TCS">TCS</option>
      <option value="M&P">M&P</option>
      <option value="Pakistan Post">Pakistan Post</option>
      <option value="DHL">DHL</option>
    </select>

    <button
      onClick={saveTrackingInfo}
      className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700"
    >
      Save Tracking
    </button>

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