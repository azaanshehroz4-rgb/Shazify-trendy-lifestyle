"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Order Details
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : !order ? (
          <p>Order not found.</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold">
              Order #{order.id.slice(0, 8)}
            </h2>

            <p className="mt-4">
              Email: {order.email}
            </p>

            <p>
              Total Items: {order.totalItems}
            </p>

            <p className="text-pink-600 font-bold">
              Total Price: ${order.totalPrice.toFixed(2)}
            </p>

            <p className="mt-2">
              Status:
              <span
                className={`ml-2 px-3 py-1 rounded-full ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "Processing"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "Shipped"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
            </p>

            <div className="mt-8 border-t pt-6">

              <h3 className="text-xl font-bold mb-5">
                Products
              </h3>

              {order.products?.map((product: any) => (
                <div
                  key={product.id}
                  className="flex justify-between border-b py-4"
                >
                  <div>
                    <h4 className="font-bold">
                      {product.name}
                    </h4>

                    <p className="text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-pink-600">
                    ${product.price}
                  </p>
                </div>
              ))}
              <div className="mt-8 border-t pt-6">
  <h3 className="text-xl font-bold mb-6">
    Order Tracking
  </h3>

  <div className="flex justify-between items-center">

    <div className="text-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
        ["Pending","Processing","Shipped","Delivered"].includes(order.status)
          ? "bg-pink-600 text-white"
          : "bg-gray-200"
      }`}>
        📦
      </div>
      <p className="mt-2">Pending</p>
    </div>

    <div className="flex-1 h-1 bg-gray-300 mx-2"></div>

    <div className="text-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
        ["Processing","Shipped","Delivered"].includes(order.status)
          ? "bg-pink-600 text-white"
          : "bg-gray-200"
      }`}>
        ⚙️
      </div>
      <p className="mt-2">Processing</p>
    </div>

    <div className="flex-1 h-1 bg-gray-300 mx-2"></div>

    <div className="text-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
        ["Shipped","Delivered"].includes(order.status)
          ? "bg-pink-600 text-white"
          : "bg-gray-200"
      }`}>
        🚚
      </div>
      <p className="mt-2">Shipped</p>
    </div>

    <div className="flex-1 h-1 bg-gray-300 mx-2"></div>

    <div className="text-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
        order.status === "Delivered"
          ? "bg-green-600 text-white"
          : "bg-gray-200"
      }`}>
        ✅
      </div>
      <p className="mt-2">Delivered</p>
    </div>

  </div>
</div>

            </div>

          </div>
        )}
       

  


      </div>

      <Footer />
    </>
  );
}