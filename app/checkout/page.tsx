"use client";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../hooks/useCart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { cart, totalItems, totalPrice,clearCart } = useCart();
  const [fullName, setFullName] = useState("");
const [email, setEmail] = useState(user?.email || "");
const [phone, setPhone] = useState("");
const [city, setCity] = useState("");
const [postalCode, setPostalCode] = useState("");
const [country, setCountry] = useState("");
const [address, setAddress] = useState("");
const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
const handlePlaceOrder = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("User is not logged in.");
    }

    const orderId = `SHZ-${Date.now()}`;

    const idTokenResult = await currentUser.getIdTokenResult(true);

    const idToken = idTokenResult.token;


    console.log("TOKEN CHECK:", {
      issuedAt: idTokenResult.issuedAtTime,
      expiration: idTokenResult.expirationTime,
      now: new Date().toISOString(),
    });

 if (!idToken) {
      throw new Error("Fresh authentication token not found.");
    }
    await addDoc(collection(db, "orders"), {
      userId: currentUser.uid,
      email,

      fullName,
      phone,
      city,
      postalCode,
      country,
      address,

      paymentMethod,

      products: cart,

      totalItems,
      totalPrice,

      orderId,
      status: "Pending",
      paymentStatus: "Pending",
      trackingNumber: "",

      createdAt: serverTimestamp(),
    });

    const emailResponse = await fetch("/api/send-order-email", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },

      body: JSON.stringify({
        orderId,
      }),
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(
        emailData.error || "Order email failed."
      );
    }

    clearCart();

    router.push("/success");

  } catch (error) {
    console.error(error);

    alert("Order Failed!");
  }
};
  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Billing Details */}
        <div className="border rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-5">
            Billing Details
          </h2>

          <input
            type="text"
            placeholder="Full Name"
             value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="email"
            placeholder="Email Address"
              value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Phone Number"
             value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Country"
             value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />
          <textarea
            placeholder="Shipping Address"
             value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-3 rounded"
            rows={4}
          />
         
            

        <div className="mt-8">
  <h3 className="text-xl font-bold mb-5">
    Payment Method
  </h3>

  <div className="space-y-4">

    <label className="border rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-pink-500">

      <div>
        <p className="font-bold">
          💵 Cash on Delivery
        </p>

        <p className="text-sm text-gray-500">
          Pay when your order arrives.
        </p>
      </div>

      <input
        type="radio"
        name="payment"
        value="Cash on Delivery"
        checked={paymentMethod === "Cash on Delivery"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />

    </label>

    <label className="border rounded-xl p-4 flex items-center justify-between opacity-60">

      <div>
        <p className="font-bold">
          💳 Stripe Card
        </p>

        <p className="text-sm text-gray-500">
          Coming Soon
        </p>
      </div>

      <input
        type="radio"
        disabled
      />

    </label>

    <label className="border rounded-xl p-4 flex items-center justify-between opacity-60">

      <div>
        <p className="font-bold">
          🅿️ PayPal
        </p>

        <p className="text-sm text-gray-500">
          Coming Soon
        </p>
      </div>

      <input
        type="radio"
        disabled
      />

    </label>

  </div>
</div>
</div>
        {/* Order Summary */}
        <div className="border rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-5">
            Order Summary
          </h2>
{cart.map((item) => (
    <div
      key={item.id}
      className="flex items-center gap-4 border-b py-4"
    >
      <img
        src={item.image}
        alt={item.name}
        width={80}
        height={80}
        className="rounded-lg object-cover"
        
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-500">
          Quantity: {item.quantity}
        </p>
      </div>

      <p className="font-bold text-pink-600">
        ${item.price * item.quantity}
      </p>
    </div>
  ))}
</div>
          <p className="mb-3">
            Total Items:
            <strong> {totalItems}</strong>
          </p>

          <p className="mb-6">
            Total Price:
            <strong> ${totalPrice.toFixed(2)}</strong>
          </p>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-pink-600 text-white py-4 rounded-xl hover:bg-pink-700 transition"
          >
            
          
            Place Order
          </button>
        </div>
      </div>
    
  );
}