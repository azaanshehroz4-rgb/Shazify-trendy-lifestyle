"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "../../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditProductPage() {
    const params = useParams();
const router = useRouter();

const [name, setName] = useState("");
const [category, setCategory] = useState("");
const [image, setImage] = useState("");
const [price, setPrice] = useState("");
const [oldPrice, setOldPrice] = useState("");
const [rating, setRating] = useState("");
const [description, setDescription] = useState("");
useEffect(() => {
  const fetchProduct = async () => {
    try {
      const docRef = doc(db, "products", params.id as string);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
console.log(data);
        setName(data.name);
        setCategory(data.category);
        setImage(data.image);
        setPrice(data.price.toString());
        setOldPrice(data.oldPrice.toString());
        setRating(data.rating.toString());
        setDescription(data.description || "");
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchProduct();
}, [params.id]);
const handleUpdateProduct = async () => {
  try {
    await updateDoc(doc(db, "products", params.id as string), {
      name,
      category,
      image,
      price: Number(price),
      oldPrice: Number(oldPrice),
      rating: Number(rating),
      description,
    });

    alert("Product Updated Successfully!");

    router.push("/admin/products");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
      <Navbar />

     <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

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
      placeholder="Image Path"
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
      placeholder="Rating"
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
      onClick={handleUpdateProduct}
      className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700"
    >
      Update Product
    </button>

  </div>

</div>

      <Footer />
    </>
  );
}