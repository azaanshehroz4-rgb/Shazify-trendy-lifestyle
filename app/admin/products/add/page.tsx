"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { db } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { logActivity } from "../../../lib/activityLogger";

export default function AddProductPage() {
    
    const router = useRouter();
     const { user, loading } = useAuth();
const [stock, setStock] = useState("");
const [name, setName] = useState("");
const [category, setCategory] = useState("");
const [image, setImage] = useState("");
const [price, setPrice] = useState("");
const [oldPrice, setOldPrice] = useState("");
const [rating, setRating] = useState("");
const [description, setDescription] = useState("");
const [pinterestTitle, setPinterestTitle] = useState("");
const [pinterestDescription, setPinterestDescription] = useState("");
const [affiliateLink, setAffiliateLink] = useState("");
const handleAddProduct = async () => {
  
  



  
  if (Number(rating) < 1 || Number(rating) > 5) {
    alert("Rating must be between 1 and 5.");
    return;
  }

  try {
  
    await addDoc(collection(db, "products"), {
      name,
      category,
      image,
      price: Number(price),
      oldPrice: Number(oldPrice),
      rating: Number(rating),
      stock: Number(stock),
      description,
      pinterestTitle,
      pinterestDescription,
      affiliateLink,
    });
    await logActivity(`Product Added: ${name}`);
   

    alert("Product Added Successfully!");

    router.push("/admin/products");

  } catch (error) {
    console.error(error);
  }
};
 
const ADMIN_EMAIL = "azaanshehroz4@gmail.com";

useEffect(() => {
  if (loading) return;

  if (!user) {
    router.push("/login?redirect=/admin/products/add");
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    router.push("/");
  }

}, [user, loading, router]);
  

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Add New Product
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <p className="text-gray-500"></p>
            <div className="space-y-5">
   
  <input
    type="text"
    placeholder="Product Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <input
    type="text"
    placeholder="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <input
    type="text"
    placeholder="Image Path (Example: /images/product1.jpg)"
    value={image}
    onChange={(e) => setImage(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <input
    type="number"
    placeholder="Old Price"
    value={oldPrice}
    onChange={(e) => setOldPrice(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <input
    type="number"
    placeholder="Rating (1-5)"
    min="1"
    max="5"
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <input
  type="number"
  placeholder="Stock"
  value={stock}
  onChange={(e) => setStock(e.target.value)}
  className="w-full border p-3 rounded-lg"
/>

  <textarea
  placeholder="Product Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full border p-3 rounded-lg h-32"
/>
<div className="mb-6">
  <label className="block font-semibold mb-2">
    Pinterest Title
  </label>

  <input
    type="text"
    value={pinterestTitle}
    onChange={(e) => setPinterestTitle(e.target.value)}
    placeholder="Best Wireless Headphones Under $100 | Shazify"
    className="w-full border rounded-xl p-3"
  />
</div>

<div className="mb-6">
  <label className="block font-semibold mb-2">
    Pinterest Description
  </label>

  <textarea
    value={pinterestDescription}
    onChange={(e) => setPinterestDescription(e.target.value)}
    placeholder="Write SEO-friendly Pinterest description..."
    className="w-full border rounded-xl p-3 h-32"
  />
</div>
<div className="mb-6">
  <label className="block font-semibold mb-2">
    AliExpress Affiliate Link
  </label>

  <input
    type="text"
    value={affiliateLink}
    onChange={(e) => setAffiliateLink(e.target.value)}
    placeholder="https://s.click.aliexpress.com/..."
    className="w-full border rounded-xl p-3"
  />
</div>

  <button
    onClick={handleAddProduct}
    className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700"
  >
    Save Product
  </button>

</div>
          

        </div>

      </div>

      <Footer />
    </>
  );
}