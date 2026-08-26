"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "../../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { logActivity } from "../../../lib/activityLogger";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  // Main image
  const [image, setImage] = useState("");

  // Additional images
  const [images, setImages] = useState<string[]>([]);

  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  const [pinterestTitle, setPinterestTitle] = useState("");
  const [pinterestDescription, setPinterestDescription] = useState("");

  const [affiliateLink, setAffiliateLink] = useState("");
  const [stock, setStock] = useState("");

  // Deals
  const [isDeal, setIsDeal] = useState(false);

  // --------------------------------
  // Fetch Product
  // --------------------------------

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(
          db,
          "products",
          params.id as string
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          console.log(data);

          setName(data.name || "");
          setCategory(data.category || "");

          setImage(data.image || "");

          /*
            New products:
            data.images = ["image1", "image2", ...]

            Old products:
            data.images doesn't exist
            so we use the old image field.
          */
          if (
            Array.isArray(data.images) &&
            data.images.length > 0
          ) {
            setImages(data.images);
          } else if (data.image) {
            setImages([data.image]);
          } else {
            setImages([]);
          }

          setPrice(
            data.price?.toString() || ""
          );

          setOldPrice(
            data.oldPrice?.toString() || ""
          );

          setRating(
            data.rating?.toString() || ""
          );

          setDescription(
            data.description || ""
          );

          setPinterestTitle(
            data.pinterestTitle || ""
          );

          setPinterestDescription(
            data.pinterestDescription || ""
          );

          setAffiliateLink(
            data.affiliateLink || ""
          );

          setStock(
            data.stock?.toString() || ""
          );

          setIsDeal(
            data.isDeal || false
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [params.id]);

  // --------------------------------
  // Update Image
  // --------------------------------

  const handleImageChange = (
    index: number,
    value: string
  ) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];

      updatedImages[index] = value;

      return updatedImages;
    });
  };

  // --------------------------------
  // Add Image Field
  // --------------------------------

  const handleAddImage = () => {
    if (images.length >= 4) {
      alert("You can add maximum 4 images.");
      return;
    }

    setImages((prevImages) => [
      ...prevImages,
      "",
    ]);
  };

  // --------------------------------
  // Remove Image
  // --------------------------------

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) =>
      prevImages.filter(
        (_, imageIndex) => imageIndex !== index
      )
    );
  };

  // --------------------------------
  // Update Product
  // --------------------------------

  const handleUpdateProduct = async () => {
    if (!name.trim()) {
      alert("Please enter product name.");
      return;
    }

    if (!category.trim()) {
      alert("Please enter product category.");
      return;
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }

    try {
      /*
        Remove empty image fields.
      */
      const cleanImages = images.filter(
        (img) => img.trim() !== ""
      );

      /*
        First image remains the main image.
        If no gallery image exists, keep old image.
      */
      const mainImage =
        cleanImages.length > 0
          ? cleanImages[0]
          : image;

      await updateDoc(
        doc(
          db,
          "products",
          params.id as string
        ),
        {
          name: name.trim(),
          category: category.trim(),

          // Main image
          image: mainImage,

          // Gallery images
          images: cleanImages,

          price: Number(price),
          oldPrice: Number(oldPrice),
          rating: Number(rating),

          description: description.trim(),

          pinterestTitle:
            pinterestTitle.trim(),

          pinterestDescription:
            pinterestDescription.trim(),

          affiliateLink:
            affiliateLink.trim(),

          stock: Number(stock),

          // Deals
          isDeal,
        }
      );

      await logActivity(
        `Product Updated: ${name}`
      );

      alert(
        "Product Updated Successfully!"
      );

      router.push("/admin/products");

    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      alert(
        "Failed to update product."
      );
    }
  };

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-10">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-pink-600 mb-8">
            Edit Product
          </h1>

          <div className="space-y-5">

            {/* Product Name */}

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border p-3 rounded-lg"
            />

            {/* Category */}

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full border p-3 rounded-lg"
            />

            {/* -------------------------------- */}
            {/* Product Images */}
            {/* -------------------------------- */}

            <div className="border rounded-xl p-5">

              <h2 className="font-bold text-xl mb-2">
                Product Images
              </h2>

              <p className="text-gray-500 text-sm mb-5">
                You can keep up to 4 product images.
                The first image is the main product image.
              </p>

              {images.map(
                (img, index) => (

                  <div
                    key={index}
                    className="mb-5"
                  >

                    <label className="block font-semibold mb-2">
                      {index === 0
                        ? "Main Product Image"
                        : `Product Image ${index + 1}`}
                    </label>

                    <div className="flex gap-3">

                      <input
                        type="text"
                        value={img}
                        onChange={(e) =>
                          handleImageChange(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Image URL"
                        className="flex-1 border p-3 rounded-lg"
                      />

                      {images.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveImage(
                              index
                            )
                          }
                          className="bg-red-500 text-white px-4 rounded-lg hover:bg-red-600"
                        >
                          Remove
                        </button>
                      )}

                    </div>

                    {img && (
                      <div className="mt-3">

                        <img
                          src={img}
                          alt={`Product image ${
                            index + 1
                          }`}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />

                      </div>
                    )}

                  </div>

                )
              )}

              {images.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="w-full border-2 border-dashed border-pink-400 text-pink-600 py-3 rounded-lg hover:bg-pink-50"
                >
                  + Add Another Image
                </button>
              )}

            </div>

            {/* Price */}

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="w-full border p-3 rounded-lg"
            />

            {/* Old Price */}

            <input
              type="number"
              placeholder="Old Price"
              value={oldPrice}
              onChange={(e) =>
                setOldPrice(e.target.value)
              }
              className="w-full border p-3 rounded-lg"
            />

            {/* Rating */}

            <input
              type="number"
              placeholder="Rating"
              min="1"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) =>
                setRating(e.target.value)
              }
              className="w-full border p-3 rounded-lg"
            />

            {/* Stock */}

            <input
              type="number"
              placeholder="Stock"
              min="0"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              className="w-full border p-3 rounded-lg"
            />

            {/* Description */}

            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border p-3 rounded-lg h-32"
            />

            {/* Pinterest Title */}

            <div>

              <label className="block font-semibold mb-2">
                Pinterest Title
              </label>

              <input
                type="text"
                value={pinterestTitle}
                onChange={(e) =>
                  setPinterestTitle(
                    e.target.value
                  )
                }
                placeholder="Best Wireless Headphones Under $100 | Shazify"
                className="w-full border rounded-xl p-3"
              />

            </div>

            {/* Pinterest Description */}

            <div>

              <label className="block font-semibold mb-2">
                Pinterest Description
              </label>

              <textarea
                value={pinterestDescription}
                onChange={(e) =>
                  setPinterestDescription(
                    e.target.value
                  )
                }
                placeholder="Write SEO-friendly Pinterest description..."
                className="w-full border rounded-xl p-3 h-32"
              />

            </div>

            {/* Affiliate Link */}

            <div>

              <label className="block font-semibold mb-2">
                AliExpress Affiliate Link
              </label>

              <input
                type="text"
                value={affiliateLink}
                onChange={(e) =>
                  setAffiliateLink(
                    e.target.value
                  )
                }
                placeholder="https://s.click.aliexpress.com/..."
                className="w-full border rounded-xl p-3"
              />

            </div>

            {/* Deals */}

            <div className="border rounded-xl p-4">

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  checked={isDeal}
                  onChange={(e) =>
                    setIsDeal(
                      e.target.checked
                    )
                  }
                  className="w-5 h-5"
                />

                <span className="font-semibold">
                  🔥 Add this product to Deals
                </span>

              </label>

              <p className="text-sm text-gray-500 mt-2 ml-8">
                Checked = product appears on
                the Deals page.
              </p>

            </div>

            {/* Update */}

            <button
              onClick={
                handleUpdateProduct
              }
              className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700"
            >
              Update Product
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}