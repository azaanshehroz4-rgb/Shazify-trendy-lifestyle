"use client";

type Props = {
  totalOrders: number;
  totalRevenue: number;
  customers: number;
  pendingOrders: number;
  totalProducts: number;
   averageOrderValue: number;
     processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
};

export default function AdminStats({
  totalOrders,
  totalRevenue,
  customers,
  pendingOrders,
  totalProducts,
    averageOrderValue,
    processingOrders,
shippedOrders,
deliveredOrders,
}: Props) {
  return (
   <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-6">

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
      <div className="bg-blue-500 text-white rounded-xl p-6 shadow">
  <h2 className="text-lg">Processing</h2>
  <p className="text-4xl font-bold mt-4">
    {processingOrders}
  </p>
</div>

<div className="bg-indigo-600 text-white rounded-xl p-6 shadow">
  <h2 className="text-lg">Shipped</h2>
  <p className="text-4xl font-bold mt-4">
    {shippedOrders}
  </p>
</div>

<div className="bg-green-700 text-white rounded-xl p-6 shadow">
  <h2 className="text-lg">Delivered</h2>
  <p className="text-4xl font-bold mt-4">
    {deliveredOrders}
  </p>
</div>
      <div className="bg-orange-600 text-white rounded-xl p-6 shadow">
  <h2 className="text-lg">Average Order</h2>

  <p className="text-4xl font-bold mt-4">
    ${averageOrderValue.toFixed(2)}
  </p>
</div>

    </div>
  );
}