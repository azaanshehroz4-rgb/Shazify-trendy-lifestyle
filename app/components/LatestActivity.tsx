"use client";

import { formatPrice } from "../lib/currency";

type Props = {
  orders: any[];
};

export default function LatestActivity({ orders }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Latest Activity
      </h2>

      <div className="space-y-4">

        {orders.slice(0, 5).map((order: any) => (

          <div
            key={order.id}
            className="border-b pb-3"
          >

            <p className="font-semibold">
              🛒 New Order Received
            </p>

            <p className="text-gray-500 text-sm">
              {order.email}
            </p>

            <p className="text-pink-600 font-bold">
              {formatPrice(order.totalPrice)}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}