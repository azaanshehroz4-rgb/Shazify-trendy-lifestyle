"use client";

import Link from "next/link";

type Props = {
  orders: any[];
};

export default function RecentOrders({ orders }: Props) {
  return (
    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b">

          <tr>
            <th className="text-left py-3">Order ID</th>
            <th className="text-left py-3">Customer</th>
            <th className="text-left py-3">Items</th>
            <th className="text-left py-3">Total</th>
            <th className="text-left py-3">Status</th>
            <th className="text-left py-3">Date</th>
            <th className="text-left py-3">Action</th>
          </tr>

          </thead>

          <tbody>

            {orders.slice(0, 5).map((order: any) => (

             <tr
  key={order.id}
  className="border-b hover:bg-gray-50"
>
  <td className="py-4 font-semibold">
    {order.id.slice(0, 8)}
  </td>

  <td>
    {order.email}
  </td>

  <td>
    {order.totalItems}
  </td>

  <td className="text-pink-600 font-bold">
    ${order.totalPrice.toFixed(2)}
  </td>

  <td>
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
  </td>

  <td>
    {order.createdAt
      ? order.createdAt.toDate().toLocaleDateString()
      : "-"}
  </td>
  <td>
  <Link
    href={`/admin/orders/${order.id}`}
    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
  >
    View
  </Link>
</td>
</tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}