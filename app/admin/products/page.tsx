"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminProductsPage() {
  const { user, loading } = useAuth();
const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
const [productsLoading, setProductsLoading] = useState(true);

const ADMIN_EMAIL = "azaanshehroz4@gmail.com";

useEffect(() => {
  if (loading) return;

  if (!user) {
    router.push("/login?redirect=/admin/products");
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    router.push("/");
  }
}, [user, loading, router]);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);
    } catch (error) {
      console.error(error);
    }

     setProductsLoading(false);
  };

  fetchProducts();
}, []);
  const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "products", id));

    setProducts(products.filter((product) => product.id !== id));

    alert("Product Deleted Successfully!");

  } catch (error) {
    console.error(error);
  }
};
return (
    <>
      <Navbar />

       <div className="max-w-7xl mx-auto p-10">

  <div className="flex gap-8">

    <AdminSidebar />

    <div className="flex-1">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-pink-600">
            Manage Products
          </h1>

          
          <Link
  href="/admin/products/add"
  className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700"
>
  + Add Product
</Link>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

         {loading ? (
  <p className="text-gray-500">Loading Products...</p>
) : (
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-pink-100">
        <th className="p-3 text-left">Image</th>
        <th className="p-3 text-left">Product</th>
        <th className="p-3 text-left">Category</th>
        <th className="p-3 text-left">Price</th>
        <th className="p-3 text-left">Rating</th>
        <th className="p-3 text-left">Stock</th>
        <th className="p-3 text-left">Action</th>
      </tr>
    </thead>

    <tbody>
      {products.map((product: any) => (
        <tr key={product.id} className="border-b">

          <td className="p-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </td>

          <td className="p-3 font-semibold">
            {product.name}
          </td>

          <td className="p-3">
            {product.category}
          </td>

          <td className="p-3 text-pink-600 font-bold">
            ${product.price}
          </td>

          <td className="p-3">
            ⭐ {product.rating}
          </td>

         <td className="p-3">
  {product.stock > 10 ? (
    <span className="text-green-600 font-bold">
      {product.stock} In Stock
    </span>
  ) : product.stock > 0 ? (
    <span className="text-yellow-600 font-bold">
      {product.stock} Low Stock
    </span>
  ) : (
    <span className="text-red-600 font-bold">
      Out of Stock
    </span>
  )}
</td>
         
         <td className="p-3 flex gap-2">

  <Link
    href={`/admin/products/${product.id}`}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
  >
    Edit
  </Link>

  <button
    onClick={() => handleDelete(product.id)}
    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
  >
    Delete
  </button>

</td>

        </tr>
      ))}
    </tbody>
  </table>
)}
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-6">
    Quick Actions
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <Link
      href="/admin/products"
      className="bg-pink-600 text-white p-6 rounded-xl shadow hover:bg-pink-700 transition"
    >
      <h3 className="text-xl font-bold">
        📦 Manage Products
      </h3>

      <p className="mt-2 text-pink-100">
        Add, Edit & Delete Products
      </p>
    </Link>

    <Link
      href="/admin/orders"
      className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700 transition"
    >
      <h3 className="text-xl font-bold">
        📋 Manage Orders
      </h3>

      <p className="mt-2 text-blue-100">
        View & Update Orders
      </p>
    </Link>

    <Link
      href="/admin/reviews"
      className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700 transition"
    >
      <h3 className="text-xl font-bold">
        ⭐ Manage Reviews
      </h3>

      <p className="mt-2 text-green-100">
        Approve & Delete Reviews
      </p>
    </Link>

  </div>
</div>

        </div>

      </div>
</div>
</div>
      <Footer />
    </>
  );
}