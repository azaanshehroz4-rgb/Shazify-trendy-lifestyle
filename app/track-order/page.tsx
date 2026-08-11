"use client";

"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
const [order, setOrder] = useState<any>(null);
const [loading, setLoading] = useState(false);
const handleTrackOrder = async () => {

  if (!orderId) {
    alert("Please enter Order ID");
    return;
  }

  try {

    setLoading(true);

    const q = query(
      collection(db, "orders"),
      where("orderId", "==", orderId)
    );

    const snapshot = await getDocs(q);


    if (snapshot.empty) {
      alert("Order not found");
      setOrder(null);
      return;
    }


    const orderData = snapshot.docs[0].data();

    setOrder(orderData);


  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

};
  return (
    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        Track Your Order
      </h1>

      <input
        type="text"
        placeholder="Enter Order ID (Example: SHZ-1754012345678)"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="w-full border p-4 rounded-xl mb-6"
      />

     <button
       onClick={handleTrackOrder}
       className="bg-pink-600 text-white px-8 py-3 rounded-xl hover:bg-pink-700"
     >
         {loading ? "Searching..." : "Track Order"}
     </button>

    </div>
  );
}