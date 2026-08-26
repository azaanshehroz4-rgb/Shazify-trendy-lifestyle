"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation"
import AdminSidebar from "../../components/AdminSidebar";
import { logActivity } from "../../lib/activityLogger";
import { formatPrice } from "../../lib/currency";

export default function AdminProductsPage() {
  const { user, loading } = useAuth();
const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
const [productsLoading, setProductsLoading] = useState(true);
const [search, setSearch] = useState("");
const [categoryFilter, setCategoryFilter] = useState("All");
const [stockFilter, setStockFilter] = useState("All");
const [sortOption, setSortOption] = useState("Default");
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 10;

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

const deletedProduct = products.find(
  (product) => product.id === id
);

await logActivity(
  `Product Deleted: ${deletedProduct?.name || "Unknown Product"}`
);

setProducts(products.filter((product) => product.id !== id));

alert("Product Deleted Successfully!");
  } catch (error) {
    console.error(error);
  }
};
const filteredProducts = useMemo(() => {
  return products
    .filter((product: any) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      const matchesStock =
        stockFilter === "All" ||
        (stockFilter === "In Stock" && product.stock > 10) ||
        (stockFilter === "Low Stock" &&
          product.stock > 0 &&
          product.stock <= 10) ||
        (stockFilter === "Out of Stock" &&
          product.stock <= 0);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    })
    .sort((a: any, b: any) => {
      if (sortOption === "priceLow") {
        return a.price - b.price;
      }

      if (sortOption === "priceHigh") {
        return b.price - a.price;
      }

      if (sortOption === "stockLow") {
        return a.stock - b.stock;
      }

      if (sortOption === "ratingHigh") {
        return b.rating - a.rating;
      }

      return 0;
    });
}, [
  products,
  search,
  categoryFilter,
  stockFilter,
  sortOption,
]);

const indexOfLastProduct =
  currentPage * productsPerPage;

const indexOfFirstProduct =
  indexOfLastProduct - productsPerPage;

const currentProducts =
  filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);
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
        <div className="mb-6">
  <input
    
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:w-96 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
  />
</div>
    <div className="mt-4">
  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="border rounded-xl px-4 py-3"
  >
    <option value="All">All Categories</option>
    <option value="Fashion">Fashion</option>
    <option value="Electronics">Electronics</option>
    <option value="Beauty">Beauty</option>
    <option value="Home">Home</option>
    <option value="Sports">Sports</option>
  </select>
</div>

<div className="mt-4">
  <select
    value={stockFilter}
    onChange={(e) => setStockFilter(e.target.value)}
    className="border rounded-xl px-4 py-3"
  >
    <option value="All">All Stock</option>
    <option value="In Stock">In Stock</option>
    <option value="Low Stock">Low Stock</option>
    <option value="Out of Stock">Out of Stock</option>
  </select>
</div>
<div className="mt-4">
  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="border rounded-xl px-4 py-3"
  >
    <option value="Default">Default Sort</option>
    <option value="priceLow">Price Low → High</option>
    <option value="priceHigh">Price High → Low</option>
    <option value="stockLow">Stock Low → High</option>
    <option value="ratingHigh">Rating High → Low</option>
  </select>
</div>


        <div className="bg-white rounded-2xl shadow-lg p-8">

         {productsLoading ? (
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
  {currentProducts.map((product: any) => (
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
           {formatPrice(product.price)}
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
      <div className="flex justify-center items-center gap-2 mt-6">

  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-4 py-2 rounded-lg ${
        currentPage === index + 1
          ? "bg-pink-600 text-white"
          : "bg-gray-200"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, totalPages)
      )
    }
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
  >
    Next
  </button>

</div>

        </div>

      </div>
</div>
</div>
      <Footer />
    </>
  );
}