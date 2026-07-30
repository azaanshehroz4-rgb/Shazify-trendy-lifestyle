"use client";

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
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Items</th>
              <th className="text-left py-3">Total</th>
              <th className="text-left py-3">Status</th>
            </tr>

          </thead>

          <tbody>

            {orders.slice(0, 5).map((order: any) => (

              <tr
                key={order.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">
                  {order.email}
                </td>

                <td>
                  {order.totalItems}
                </td>

                <td className="text-pink-600 font-bold">
                  ${order.totalPrice.toFixed(2)}
                </td>

                <td>
                  {order.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}