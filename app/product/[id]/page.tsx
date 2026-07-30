
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProductDetails from "./ProductDetailsClient";

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