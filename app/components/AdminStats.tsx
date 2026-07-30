"use client";

type Props = {
  totalOrders: number;
  totalRevenue: number;
  customers: number;
  pendingOrders: number;
  totalProducts: number;
};

export default function AdminStats({
  totalOrders,
  totalRevenue,
  customers,
  pendingOrders,
  totalProducts,
}: Props) {
  return (
    <div className="grid md:grid-cols-5 gap-6">

      <div className="bg-pink-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-lg">Total Orders</h2>
        <p className="text-4xl font-bold mt-4">
          {totalOrders}
        </p>
      </div>

      <div className="bg-green-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-lg">Total Revenue</h2>
        <p className="text-4xl font-bold mt-4">
          ${totalRevenue.toFixed(2)}
        </p>
      </div>

      <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-lg">Customers</h2>
        <p className="text-4xl font-bold mt-4">
          {customers}
        </p>
      </div>

      <div className="bg-yellow-500 text-white rounded-xl p-6 shadow">
        <h2 className="text-lg">Pending Orders</h2>
        <p className="text-4xl font-bold mt-4">
          {pendingOrders}
        </p>
      </div>

      <div className="bg-purple-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-lg">Total Products</h2>
        <p className="text-4xl font-bold mt-4">
          {totalProducts}
        </p>
      </div>

    </div>
  );
}