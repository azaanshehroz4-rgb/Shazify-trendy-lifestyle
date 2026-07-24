import Link from "next/link";
import Image from "next/image";
import products from "../../data/products";
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const filteredProducts = products.filter(
  (product) =>
    product.category.toLowerCase() === category.toLowerCase()
);
 return (
  <div className="max-w-7xl mx-auto p-10">

    <h1 className="text-4xl font-bold capitalize mb-8">
      {category}
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {filteredProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="border rounded-xl p-4 hover:shadow-lg transition"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-lg"
          />

          <h2 className="text-xl font-bold mt-4">
            {product.name}
          </h2>

          <p className="text-pink-600 font-bold mt-2">
            ${product.price}
          </p>

        </Link>
      ))}

    </div>

  </div>
);
}