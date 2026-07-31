"use client";

type Props = {
  products: {
    name: string;
    sold: number;
  }[];
};

export default function TopProducts({ products }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Top Selling Products
      </h2>

      <div className="space-y-4">
        {products.length === 0 ? (
          <p className="text-gray-500">
            No sales yet.
          </p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3"
            >
              <span className="font-semibold">
                {product.name}
              </span>

              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                {product.sold} Sold
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}