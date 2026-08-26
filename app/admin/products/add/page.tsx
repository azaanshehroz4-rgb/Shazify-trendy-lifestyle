"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { db } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { logActivity } from "../../../lib/activityLogger";



export default function AddProductPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Product fields
  const [stock, setStock] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  // Pinterest
  const [pinterestTitle, setPinterestTitle] = useState("");
  const [pinterestDescription, setPinterestDescription] = useState("");

  // Affiliate
  const [affiliateLink, setAffiliateLink] = useState("");

  // Deals
  const [isDeal, setIsDeal] = useState(false);

  // Images
 const [images, setImages] = useState<string[]>([
  "",
  "",
  "",
  "",
]);

  const [uploading, setUploading] = useState(false);
  const submittingRef = useRef(false);

  const ADMIN_EMAIL = "azaanshehroz4@gmail.com";

  // --------------------------------
  // Authentication
  // --------------------------------

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

  // --------------------------------
  // Image Selection
  // --------------------------------

 const handleImageChange = (
  index: number,
  value: string
) => {
  setImages((prev) => {
    const updated = [...prev];
    updated[index] = value;
    return updated;
  });
};

  // --------------------------------
  // Add Product
  // --------------------------------

  const handleAddProduct = async () => {
     if (submittingRef.current) {
    return;
  }

  submittingRef.current = true;
    // Basic validation
    if (!name.trim()) {
      alert("Please enter product name.");
      return;
    }

    if (!category.trim()) {
      alert("Please enter product category.");
      return;
    }

    if (!price) {
      alert("Please enter product price.");
      return;
    }

    if (!oldPrice) {
      alert("Please enter old price.");
      return;
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }

    // Remove empty image slots
   const cleanImages = images
  .map((img) => img.trim())
  .filter((img) => img !== "");

if (cleanImages.length === 0) {
  alert("Please enter at least one product image path.");
  return;
}

    try {
      setUploading(true);

      // --------------------------------
      // Upload Images
      // --------------------------------

     await addDoc(collection(db, "products"), {
  name: name.trim(),
  category: category.trim(),

  // Main image
  image: cleanImages[0],

  // All product images
  images: cleanImages,

  price: Number(price),
  oldPrice: Number(oldPrice),
  rating: Number(rating),
  stock: Number(stock),

  description: description.trim(),

  pinterestTitle: pinterestTitle.trim(),
  pinterestDescription: pinterestDescription.trim(),

  affiliateLink: affiliateLink.trim(),

  isDeal,

  createdAt: new Date(),
});

      // --------------------------------
      // Save Product
      // --------------------------------

      await addDoc(collection(db, "products"), {
  name: name.trim(),
  category: category.trim(),

  // Main image
  image: cleanImages[0],

  // All product images
  images: cleanImages,

  price: Number(price),
  oldPrice: Number(oldPrice),
  rating: Number(rating),
  stock: Number(stock),

  description: description.trim(),

  pinterestTitle: pinterestTitle.trim(),
  pinterestDescription: pinterestDescription.trim(),

  affiliateLink: affiliateLink.trim(),

  // Deals
  isDeal,

  createdAt: new Date(),
});

      await logActivity(`Product Added: ${name}`);

      alert("Product Added Successfully!");

      router.push("/admin/products");
    } catch (error) {
      console.error("Add product error:", error);

      alert("Failed to add product.");
    } finally {
      setUploading(false);
       submittingRef.current = false;
    }
  };

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          Add New Product
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="space-y-5">

            {/* Product Name */}

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            {/* Category */}

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            {/* -------------------------------- */}
            {/* Product Images */}
            {/* -------------------------------- */}

           {/* Product Images */}

<div className="border rounded-xl p-5">

  <h2 className="font-bold text-xl mb-2">
    Product Images
  </h2>

  <p className="text-gray-500 text-sm mb-5">
    Enter up to 4 images from public/images folder.
    The first image will be the main product image.
  </p>

  {images.map((img, index) => (
    <div key={index} className="mb-5">

      <label className="block font-semibold mb-2">
        {index === 0
          ? "Main Product Image"
          : `Product Image ${index + 1}`}
      </label>

      <input
        type="text"
        value={img}
        onChange={(e) =>
          handleImageChange(index, e.target.value)
        }
        placeholder="/images/product4.jpg"
        className="w-full border p-3 rounded-lg"
      />

      {img && (
        <div className="mt-3">

          <img
            src={img}
            alt={`Product image ${index + 1}`}
            className="w-32 h-32 object-cover rounded-lg border"
          />

        </div>
      )}

    </div>
  ))}

</div>
            {/* Price */}

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            {/* Old Price */}

            <input
              type="number"
              placeholder="Old Price"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            {/* Rating */}

            <input
              type="number"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            {/* Stock */}

            <input
              type="number"
              placeholder="Stock"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            {/* Description */}

            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded-lg h-32"
            />

            {/* Pinterest Title */}

            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Pinterest Title
              </label>

              <input
                type="text"
                value={pinterestTitle}
                onChange={(e) =>
                  setPinterestTitle(e.target.value)
                }
                placeholder="Best Wireless Headphones Under $100 | Shazify"
                className="w-full border rounded-xl p-3"
              />

            </div>

            {/* Pinterest Description */}

            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Pinterest Description
              </label>

              <textarea
                value={pinterestDescription}
                onChange={(e) =>
                  setPinterestDescription(e.target.value)
                }
                placeholder="Write SEO-friendly Pinterest description..."
                className="w-full border rounded-xl p-3 h-32"
              />

            </div>

            {/* Affiliate Link */}

            <div className="mb-6">

              <label className="block font-semibold mb-2">
                AliExpress Affiliate Link
              </label>

              <input
                type="text"
                value={affiliateLink}
                onChange={(e) =>
                  setAffiliateLink(e.target.value)
                }
                placeholder="https://s.click.aliexpress.com/..."
                className="w-full border rounded-xl p-3"
              />

            </div>

            {/* Deals Checkbox */}

            <div className="border rounded-xl p-4">

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  checked={isDeal}
                  onChange={(e) =>
                    setIsDeal(e.target.checked)
                  }
                  className="w-5 h-5"
                />

                <span className="font-semibold">
                  🔥 Add this product to Deals
                </span>

              </label>

              <p className="text-sm text-gray-500 mt-2 ml-8">
                Only products selected here will appear on the Deals page.
              </p>

            </div>

            {/* Save Button */}

            <button
              onClick={handleAddProduct}
              disabled={uploading}
              className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 disabled:opacity-50"
            >
              {uploading
                ? "Uploading Images..."
                : "Save Product"}
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}