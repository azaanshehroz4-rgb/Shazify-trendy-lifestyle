import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import DealsProducts from "./dealsproducts";

export default async function DealsPage() {
  const snapshot = await getDocs(collection(db, "products"));

const products = snapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .filter((product: any) => product.isDeal === true);
    return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-6">

        <h1 className="text-5xl font-bold text-center mb-3">
          🔥 Today's Deals
        </h1>

        <p className="text-center text-gray-500 mb-12">
          Grab the best discounts before they're gone.
        </p>

       <DealsProducts products={products} />

      </div>

      <Footer />
    </>
  );
}