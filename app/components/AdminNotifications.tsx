"use client";

type Props = {
  pendingOrders: number;
  lowStockProducts: number;
};

export default function AdminNotifications({
  pendingOrders,
  lowStockProducts,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        🔔 Notifications
      </h2>

      <div className="space-y-4">

        {pendingOrders > 0 && (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl">
            🛒 You have {pendingOrders} pending order(s)
          </div>
        )}

        {lowStockProducts > 0 && (
          <div className="bg-red-100 text-red-800 p-4 rounded-xl">
            ⚠️ {lowStockProducts} product(s) are low in stock
          </div>
        )}

        {pendingOrders === 0 && lowStockProducts === 0 && (
          <div className="bg-green-100 text-green-800 p-4 rounded-xl">
            ✅ Everything is running smoothly
          </div>
        )}

      </div>

    </div>
  );
}