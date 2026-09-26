import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import FeaturedProductsClient from "./FeaturedProductsClient";

export default async function FeaturedProducts() {
  try {
    const snapshot = await getDocs(collection(db, "products"));

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return <FeaturedProductsClient initialProducts={products} />;
  } catch (error) {
    console.error("Featured products error:", error);

    return <FeaturedProductsClient initialProducts={[]} />;
  }
}