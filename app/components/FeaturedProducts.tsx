import FeaturedProductsClient from "./FeaturedProductsClient";
import { adminDb } from "../lib/firebaseAdmin";

export default async function FeaturedProducts() {
  try {
    const snapshot = await adminDb.collection("products").get();

   const products = snapshot.docs.map((doc) => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt ?? null,
  };
});

    return <FeaturedProductsClient initialProducts={products} />;
  } catch (error) {
    console.error("Featured products server error:", error);

    return <FeaturedProductsClient initialProducts={[]} />;
  }
}