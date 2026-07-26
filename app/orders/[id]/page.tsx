"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";

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

  if (loading) {
    return <p className="p-10">Loading Order...</p>;
  }

  if (!order) {
    return <p className="p-10">Order Not Found.</p>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Order Details
        </h1>

        <div className="border rounded-xl p-6 shadow">

          <h2 className="text-2xl font-bold">
            Order #{order.id.slice(0,8)}
          </h2>

          <p className="mt-2">
            Email: {order.email}
          </p>

          <p>
            Total Items: {order.totalItems}
          </p>

          <p className="text-pink-600 font-bold">
            Total Price: ${order.totalPrice.toFixed(2)}
          </p>

          <p className="text-green-600 font-semibold mt-2">
            Status: Pending
          </p>

          <div className="mt-8 space-y-6">

            {order.products?.map((product:any)=>(
              <div
                key={product.id}
                className="flex gap-5 border rounded-xl p-4"
              >

                <Image
                  src={product.image}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="rounded-lg"
                />

                <div>

                  <h3 className="text-xl font-bold">
                    {product.name}
                  </h3>

                  <p>
                    Category: {product.category}
                  </p>

                  <p>
                    Quantity: {product.quantity}
                  </p>

                  <p className="text-pink-600 font-bold">
                    ${product.price}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}