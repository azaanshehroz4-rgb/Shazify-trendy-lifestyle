import Link from "next/link";
import Image from "next/image";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { Metadata } from "next";
import { formatPrice } from "../../lib/currency";

const SITE_URL = "https://www.shazify.com";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1);

const title = `${categoryName} Products`;

  const description = `Explore ${categoryName.toLowerCase()} products on Shazify. Discover trendy products, stylish finds and popular items for your shopping needs.`;

  return {
    title,
    description,

    keywords: [
      categoryName,
      `${categoryName} products`,
      `shop ${categoryName}`,
      "Shazify",
      "online shopping",
      "trendy products",
    ],

    alternates: {
      canonical: `${SITE_URL}/category/${category}`,
    },

    openGraph: {
  title,
  description,
  url: `${SITE_URL}/category/${category}`,
  siteName: "Shazify",
  type: "website",

 images: [
  {
    url: "https://www.shazify.com/images/shazify-og.jpg",
    width: 1200,
    height: 630,
    alt: `${categoryName} Products | Shazify`,
  },
],
},

   twitter: {
  card: "summary_large_image",
  title,
  description,
  images: ["https://www.shazify.com/images/shazify-og.jpg"],
},
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const snapshot = await getDocs(collection(db, "products"));

  const products: any[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const filteredProducts = products.filter(
    (product: any) =>
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
               {formatPrice(product.price)}
           </p>
          </Link>
        ))}

      </div>

    </div>
  );
}