
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProductDetails from "./ProductDetailsClient";
import type { Metadata } from "next";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      title: "Product Not Found | Shazify",
    };
  }

  const product = docSnap.data();

  return {
  title: `${product.name} | Shazify`,
  description:
    product.pinterestDescription ||
    product.description ||
    "Shop the latest trendy products on Shazify.",

  openGraph: {
    title: `${product.name} | Shazify`,
    description:
      product.pinterestDescription ||
      product.description ||
      "Shop the latest trendy products on Shazify.",
   images: [
  {
    url: `${SITE_URL}${product.image}`,
  },
],
  },

twitter: {
  card: "summary_large_image",
  title: `${product.name} | Shazify`,
  description:
    product.pinterestDescription ||
    product.description ||
    "Shop the latest trendy products on Shazify.",
  images: [`${SITE_URL}${product.image}`],
},

};
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

 const docRef = doc(db, "products", id);

const docSnap = await getDoc(docRef);

if (!docSnap.exists()) {
  return <div>Product not found.</div>;
}

const product = {
  id: docSnap.id,
  ...docSnap.data(),
};

  return <ProductDetails product={product} />;
}