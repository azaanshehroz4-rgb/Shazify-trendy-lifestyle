"use client";

type Props = {
  products: any[];
};

export default function LowStockAlert({ products }: Props) {
  const lowStockProducts = products.filter(
    (product) => product.stock <= 5
  );

  if (lowStockProducts.length === 0) {
    return (
      <div className="bg-green-100 border border-green-300 rounded-xl p-6 mt-8">
        <h2 className="text-xl font-bold text-green-700">
          ✅ All Products Are In Stock
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-300 rounded-xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-red-600 mb-4">
        ⚠ Low Stock Alert
      </h2>

      <div className="space-y-3">

        {lowStockProducts.map((product) => (

          <div
            key={product.id}
            className="flex justify-between border-b pb-2"
          >

            <span className="font-semibold">
              {product.name}
            </span>

            <span className="text-red-600 font-bold">
              {product.stock === 0
                ? "Out of Stock"
                : `${product.stock} Left`}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}