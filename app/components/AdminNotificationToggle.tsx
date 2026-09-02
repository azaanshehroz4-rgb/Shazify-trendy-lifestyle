"use client";

import { useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { requestNotificationPermission } from "../lib/firebase-messaging";

export default function AdminNotificationToggle() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("shazify_admin_notifications");

    setEnabled(saved === "true");
  }, []);

  const handleToggle = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // =========================
      // TURN OFF
      // =========================
      if (enabled) {
        const token = localStorage.getItem(
          "shazify_admin_notification_token"
        );

        if (token) {
          await deleteDoc(
            doc(db, "adminNotificationTokens", token)
          );

          localStorage.removeItem(
            "shazify_admin_notification_token"
          );
        }

        localStorage.setItem(
          "shazify_admin_notifications",
          "false"
        );

        setEnabled(false);

        alert("🔕 Notifications turned OFF.");
        return;
      }

      // =========================
      // TURN ON
      // =========================
      const token = await requestNotificationPermission();

      if (!token) {
        alert(
          "Notification permission nahi mili. Browser mein Allow karna zaroori hai."
        );
        return;
      }

      localStorage.setItem(
        "shazify_admin_notification_token",
        token
      );

      localStorage.setItem(
        "shazify_admin_notifications",
        "true"
      );

      setEnabled(true);

      alert("🔔 Notifications enabled successfully!");
    } catch (error) {
      console.error("Notification toggle error:", error);

      alert("Notification setting change nahi ho saki.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-5 bg-white shadow">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            {enabled
              ? "🔔 Order Notifications"
              : "🔕 Order Notifications"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {enabled
              ? "You will receive admin notifications on this device."
              : "Notifications are currently off."}
          </p>
        </div>

        <button
          onClick={handleToggle}
          disabled={loading}
          className={`px-5 py-2 rounded-lg text-white font-semibold ${
            enabled
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-600 hover:bg-gray-700"
          } disabled:opacity-50`}
        >
          {loading
            ? "Please wait..."
            : enabled
            ? "ON"
            : "OFF"}
        </button>
      </div>
    </div>
  );
}