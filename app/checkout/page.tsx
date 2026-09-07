"use client";

import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../hooks/useCart";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { formatPrice } from "../lib/currency";
import { useCurrency } from "../context/CurrencyContext";

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const { currency } = useCurrency();

  const [checkoutMode, setCheckoutMode] = useState<
    "account" | "guest"
  >(user ? "account" : "guest");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );

  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setCheckoutMode("account");
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    if (placingOrder) return;

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (checkoutMode === "account" && !user) {
      router.push("/login?redirect=/checkout");
      return;
    }

    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!city.trim()) {
      alert("Please enter your city.");
      return;
    }

    if (!country.trim()) {
      alert("Please enter your country.");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your shipping address.");
      return;
    }

    try {
      setPlacingOrder(true);

      const orderId = `SHZ-${Date.now()}`;

      const orderData: any = {
        email: email.trim(),
        fullName: fullName.trim(),
        phone: phone.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
        address: address.trim(),

        paymentMethod,

        products: cart,

        totalItems,
        totalPrice,
        currency,

        orderId,
        status: "Pending",
        paymentStatus: "Pending",
        trackingNumber: "",

        checkoutType:
          checkoutMode === "guest"
            ? "guest"
            : "account",

        isGuestOrder:
          checkoutMode === "guest",

        createdAt: serverTimestamp(),
      };

      if (checkoutMode === "account" && user) {
        orderData.userId = user.uid;
      }

      // Create order
      await addDoc(
        collection(db, "orders"),
        orderData
      );

      /*
       * Get Firebase ID token for account customers.
       * Guest customers do not have a token.
       */
      let idToken = "";

      if (user && checkoutMode === "account") {
        try {
          idToken = await user.getIdToken();
        } catch (tokenError) {
          console.error(
            "Could not get Firebase ID token:",
            tokenError
          );
        }
      }

      /*
       * Send order confirmation email.
       */
      try {
        const emailHeaders: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (idToken) {
          emailHeaders.Authorization = `Bearer ${idToken}`;
        }

        const emailResponse = await fetch(
          "/api/send-order-email",
          {
            method: "POST",
            headers: emailHeaders,
            body: JSON.stringify({
              orderId,
            }),
          }
        );

        const emailResult =
          await emailResponse.json();

        if (!emailResponse.ok) {
          console.error(
            "Order email failed:",
            emailResult
          );
        } else {
          console.log(
            "Order email sent:",
            emailResult
          );
        }
      } catch (emailError) {
        console.error(
          "Order email request failed:",
          emailError
        );
      }

      /*
       * Send admin push notification.
       */
      try {
        const notificationHeaders: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (idToken) {
          notificationHeaders.Authorization =
            `Bearer ${idToken}`;
        }

        const notificationResponse =
          await fetch(
            "/api/send-order-notification",
            {
              method: "POST",
              headers: notificationHeaders,
              body: JSON.stringify({
                orderId,
              }),
            }
          );

        const notificationResult =
          await notificationResponse.json();

        if (!notificationResponse.ok) {
          console.error(
            "Admin notification failed:",
            notificationResult
          );
        } else {
          console.log(
            "Admin notification sent:",
            notificationResult
          );
        }
      } catch (notificationError) {
        console.error(
          "Admin notification request failed:",
          notificationError
        );
      }

      clearCart();

      router.push(
        `/success?orderId=${encodeURIComponent(
          orderId
        )}`
      );
    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      alert(
        "Order Failed! Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      {/* Checkout Options */}

      <div className="mb-8 border rounded-xl p-6 shadow bg-white">

        <h2 className="text-2xl font-bold mb-5">
          How would you like to checkout?
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <button
            type="button"
            onClick={() =>
              setCheckoutMode("account")
            }
            className={`border rounded-xl p-5 text-left transition ${
              checkoutMode === "account"
                ? "border-pink-600 bg-pink-50"
                : "hover:border-pink-400"
            }`}
          >
            <p className="font-bold text-lg">
              👤 Login / Create Account
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Checkout with your Shazify account
              and keep your order history.
            </p>

            {!user && (
              <span className="inline-block mt-3 text-pink-600 font-semibold">
                Login or create account
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setCheckoutMode("guest")
            }
            className={`border rounded-xl p-5 text-left transition ${
              checkoutMode === "guest"
                ? "border-pink-600 bg-pink-50"
                : "hover:border-pink-400"
            }`}
          >
            <p className="font-bold text-lg">
              🚶 Continue as Guest
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Buy without creating a Shazify account.
            </p>

            <span className="inline-block mt-3 text-pink-600 font-semibold">
              No account required
            </span>
          </button>

        </div>

        {!user &&
          checkoutMode === "account" && (
            <button
              type="button"
              onClick={() =>
                router.push(
                  "/login?redirect=/checkout"
                )
              }
              className="mt-5 bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700"
            >
              Login / Create Account
            </button>
          )}

      </div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Billing Details */}

        <div className="border rounded-xl p-6 shadow">

          <h2 className="text-2xl font-bold mb-5">
            {checkoutMode === "guest"
              ? "Guest Checkout"
              : "Billing Details"}
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) =>
              setPostalCode(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) =>
              setCountry(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            placeholder="Shipping Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className="w-full border p-3 rounded"
            rows={4}
          />

          {/* Payment */}

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
                  checked={
                    paymentMethod ===
                    "Cash on Delivery"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
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

        <div>

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
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-bold text-pink-600">
                  {formatPrice(
                    item.price *
                      item.quantity,
                    currency
                  )}
                </p>

              </div>
            ))}

            <div className="border-t mt-5 pt-5">

              <p className="mb-3">
                Total Items:
                <strong>
                  {" "}
                  {totalItems}
                </strong>
              </p>

              <p className="mb-6">
                Total Price:
                <strong>
                  {" "}
                  {formatPrice(
                    totalPrice,
                    currency
                  )}
                </strong>
              </p>

              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="w-full bg-pink-600 text-white py-4 rounded-xl hover:bg-pink-700 transition disabled:opacity-50"
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}