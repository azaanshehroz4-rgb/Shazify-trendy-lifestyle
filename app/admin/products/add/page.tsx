"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
    const router = useRouter();
const [stock, setStock] = useState("");
const [name, setName] = useState("");
const [category, setCategory] = useState("");
const [image, setImage] = useState("");
const [price, setPrice] = useState("");
const [oldPrice, setOldPrice] = useState("");
const [rating, setRating] = useState("");
const [description, setDescription] = useState("");
const handleAddProduct = async () => {
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
      
    });
    
    <input
  type="number"
  placeholder="Stock"
  value={stock}
  onChange={(e) => setStock(e.target.value)}
  className="w-full border p-3 rounded-lg"
/>


    alert("Product Added Successfully!");

    router.push("/admin/products");

  } catch (error) {
    console.error(error);
  }
};

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
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />
  <textarea
  placeholder="Product Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full border p-3 rounded-lg h-32"
/>

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