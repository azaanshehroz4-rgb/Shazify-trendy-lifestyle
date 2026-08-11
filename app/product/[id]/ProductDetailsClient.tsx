"use client";


import Image from "next/image";
import { Minus, Plus, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../context/WishlistContext";
import Link from "next/link";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
   query,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext";
import { useAuth } from "../../context/AuthContext";

export default function ProductDetails({
  product,
}: {
  product: any;
}) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} = useWishlist();
  const { user } = useAuth();
  const {
  recentlyViewed,
  addRecentlyViewed,
} = useRecentlyViewed();
  const router = useRouter();
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState(product.rating);
  const totalReviews = reviews.length;




  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [sortOption, setSortOption] = useState("Newest");
  const [searchReview, setSearchReview] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionName, setQuestionName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionsLoading, setQuestionsLoading] = useState(true);

  const fiveStar = reviews.filter(
  (review: any) => review.rating === 5
).length;

const fourStar = reviews.filter(
  (review: any) => review.rating === 4
).length;

const threeStar = reviews.filter(
  (review: any) => review.rating === 3
).length;

const twoStar = reviews.filter(
  (review: any) => review.rating === 2
).length;

const oneStar = reviews.filter(
  (review: any) => review.rating === 1
).length;

const getPercentage = (count: number) => {
  if (totalReviews === 0) return 0;

  return (count / totalReviews) * 100;
};

const sortedReviews = [...reviews].sort((a: any, b: any) => {
  switch (sortOption) {
    case "Newest":
      return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);

    case "Oldest":
      return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);

    case "Highest":
      return b.rating - a.rating;

    case "Lowest":
      return a.rating - b.rating;

    default:
      return 0;
  }
});
const filteredReviews = sortedReviews.filter((review: any) => {
  return (
    review.name
      ?.toLowerCase()
      .includes(searchReview.toLowerCase()) ||
    review.comment
      ?.toLowerCase()
      .includes(searchReview.toLowerCase())
  );
});



  useEffect(() => {
  const fetchRelatedProducts = async () => {

    const questionSnapshot = await getDocs(collection(db, "questions"));

const questionData = questionSnapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .filter((question: any) => question.productId === product.id);

setQuestions(questionData);
setQuestionsLoading(false);
    const reviewSnapshot = await getDocs(collection(db, "reviews"));

const reviewData = reviewSnapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .filter((review: any) => review.productId === product.id);

setReviews(reviewData);
if (reviewData.length > 0) {
  const total = reviewData.reduce(
    (sum: number, review: any) => sum + review.rating,
    0
  );

  setAverageRating(total / reviewData.length);
} else {
  setAverageRating(product.rating);
}
    const snapshot = await getDocs(collection(db, "products"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filtered = data.filter((item: any) => {
   
  return (
    item.category === product.category &&
    item.id !== product.id &&
    item.stock > 0
  );
});

    setRelatedProducts(filtered);
  };

  fetchRelatedProducts();
}, [product]);
useEffect(() => {
  addRecentlyViewed(product);
}, [product]);
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };
const handlePinterestShare = () => {
  const pageUrl = window.location.href;

  const imageUrl = product.image;

  const description = `${product.name} - ${product.description || ""}`;

  const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
    pageUrl
  )}&media=${encodeURIComponent(
    imageUrl
  )}&description=${encodeURIComponent(description)}`;

  window.open(pinterestUrl, "_blank");
};

const handleSubmitReview = async () => {
  if (!reviewName || !reviewComment) {
    alert("Please fill all fields.");
    return;
  }

let verifiedPurchase = false;

if (user?.email) {
  const ordersQuery = query(
    collection(db, "orders"),
    where("email", "==", user.email)
  );

  const orderSnapshot = await getDocs(ordersQuery);

  verifiedPurchase = orderSnapshot.docs.some((orderDoc: any) => {
    const order = orderDoc.data();

    return order.products?.some(
  (item: any) => item.id === product.id
);
  });
console.log("Logged in email:", user?.email);

orderSnapshot.docs.forEach((doc) => {
  console.log("Order:", doc.data());
});

console.log("Verified Purchase:", verifiedPurchase);
}



  try {
    await addDoc(collection(db, "reviews"), {
      productId: product.id,
      productName: product.name,
      userId: user?.uid,
      email: user?.email,
      name: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      createdAt: serverTimestamp(),
      verifiedPurchase,
    });

    alert("Review submitted successfully!");

    setReviewName("");
    setReviewRating(5);
    setReviewComment("");

    // Refresh reviews
    const reviewSnapshot = await getDocs(collection(db, "reviews"));

    const reviewData = reviewSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((review: any) => review.productId === product.id);

    setReviews(reviewData);

  } catch (error) {
    console.error(error);
  }
};
const handleSubmitQuestion = async () => {
  if (!questionName || !questionText) {
    alert("Please fill all fields.");
    return;
  }

  try {
    await addDoc(collection(db, "questions"), {
      productId: product.id,
      userId: user?.uid,
      email: user?.email,
      name: questionName,
      question: questionText,
      answer: "",
      answered: false,
      createdAt: serverTimestamp(),
    });

    alert("Question submitted successfully!");

    setQuestionName("");
    setQuestionText("");

    const questionSnapshot = await getDocs(collection(db, "questions"));

    const questionData = questionSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((question: any) => question.productId === product.id);

    setQuestions(questionData);

  } catch (error) {
    console.error(error);
    alert("Failed to submit question.");
  }
};

  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-xl border"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-2">
            {product.category}
          </p>

          <p className="text-yellow-500 text-xl mt-3">
            {"⭐".repeat(Math.round(averageRating))}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-3xl font-bold text-pink-600">
              ${product.price.toFixed(2)}
            </span>

            <span className="text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          </div>

          <p className="mt-6 text-gray-600">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-8">

            <button
              onClick={() =>
                quantity > 1 && setQuantity(quantity - 1)
              }
              className="border p-2 rounded-lg"
            >
              <Minus size={18} />
            </button>

            <span className="text-xl font-bold">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="border p-2 rounded-lg"
            >
              <Plus size={18} />
            </button>

          </div>

          <div className="flex flex-col gap-4 mt-8">

            <button
              onClick={handleAddToCart}
              className="bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
            >
              Add {quantity} To Cart
            </button>

            <button
             onClick={() => {
               if (isInWishlist(product.id)) {
                removeFromWishlist(product.id);
                } else {
                addToWishlist(product);
                  }
               }}
              className={`border py-3 rounded-lg ${
                isInWishlist(product.id)
                  ? "bg-red-500 text-white"
                  : "border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Heart size={18} />
                {isInWishlist(product.id)
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
              </div>
            </button>

            <button
              onClick={() => router.push("/checkout")}
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Buy Now
            </button>
            <button
               onClick={handlePinterestShare}
                className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
            >
                 📌 Share on Pinterest
            </button>
            

              <div className="mt-8 space-y-3 border-t pt-6">

  {product.stock === 0 ? (
    <p className="text-red-600 font-semibold">
      ❌ Out of Stock
    </p>
  ) : product.stock <= 5 ? (
    <p className="text-yellow-600 font-semibold">
      ⚠️ {product.stock} Low Stock
    </p>
  ) : (
    <p className="text-green-600 font-semibold">
      ✅ {product.stock} In Stock
    </p>
  )}

  <p className="text-gray-600">
    🚚 Free Shipping on orders over $50
  </p>

  <p className="text-gray-600">
    🔒 100% Secure Checkout
  </p>

  <p className="text-gray-600">
    ↩️ Easy 3-Day Returns
  </p>

</div>
               
{/* Review Form */}
<div className="mt-16 border-t pt-10">
  <h2 className="text-3xl font-bold mb-6">
    Write a Review
  </h2>

  <div className="space-y-4">

    <input
      type="text"
      placeholder="Your Name"
      value={reviewName}
      onChange={(e) => setReviewName(e.target.value)}
      className="w-full border p-3 rounded-lg"
    />

    <select
      value={reviewRating}
      onChange={(e) => setReviewRating(Number(e.target.value))}
      className="w-full border p-3 rounded-lg"
    >
      <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
      <option value={4}>⭐⭐⭐⭐ (4)</option>
      <option value={3}>⭐⭐⭐ (3)</option>
      <option value={2}>⭐⭐ (2)</option>
      <option value={1}>⭐ (1)</option>
    </select>

    <textarea
      placeholder="Write your review..."
      value={reviewComment}
      onChange={(e) => setReviewComment(e.target.value)}
      className="w-full border p-3 rounded-lg h-32"
    />

    <button
      onClick={handleSubmitReview}
      className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
    >
      Submit Review
    </button>

  </div>
</div>

{/* Reviews Summary */}
<div className="mt-16 border rounded-2xl p-6 shadow-sm bg-white">

  <div className="flex items-center gap-4">

    <div>
      <h2 className="text-5xl font-bold text-pink-600">
        {averageRating.toFixed(1)}
      </h2>

      <p className="text-yellow-500 text-xl mt-2">
        {"⭐".repeat(Math.round(averageRating))}
      </p>

      <p className="text-gray-500 mt-2">
        Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
      </p>
    </div>

    <div className="flex-1 ml-10 space-y-2">

      <div className="flex items-center gap-3">
  <span className="w-20">⭐⭐⭐⭐⭐</span>

  <div className="flex-1 bg-gray-200 rounded-full h-2">
    <div
      className="bg-pink-600 h-2 rounded-full"
      style={{
        width: `${getPercentage(fiveStar)}%`,
      }}
    />
  </div>

  <span className="w-8 text-right">
    {fiveStar}
  </span>
</div>

<div className="flex items-center gap-3">
  <span className="w-20">⭐⭐⭐⭐</span>

  <div className="flex-1 bg-gray-200 rounded-full h-2">
    <div
      className="bg-pink-600 h-2 rounded-full"
      style={{
        width: `${getPercentage(fourStar)}%`,
      }}
    />
  </div>

  <span className="w-8 text-right">
    {fourStar}
  </span>
</div>

<div className="flex items-center gap-3">
  <span className="w-20">⭐⭐⭐</span>

  <div className="flex-1 bg-gray-200 rounded-full h-2">
    <div
      className="bg-pink-600 h-2 rounded-full"
      style={{
        width: `${getPercentage(threeStar)}%`,
      }}
    />
  </div>

  <span className="w-8 text-right">
    {threeStar}
  </span>
</div>

<div className="flex items-center gap-3">
  <span className="w-20">⭐⭐</span>

  <div className="flex-1 bg-gray-200 rounded-full h-2">
    <div
      className="bg-pink-600 h-2 rounded-full"
      style={{
        width: `${getPercentage(twoStar)}%`,
      }}
    />
  </div>

  <span className="w-8 text-right">
    {twoStar}
  </span>
</div>

<div className="flex items-center gap-3">
  <span className="w-20">⭐</span>

  <div className="flex-1 bg-gray-200 rounded-full h-2">
    <div
      className="bg-pink-600 h-2 rounded-full"
      style={{
        width: `${getPercentage(oneStar)}%`,
      }}
    />
  </div>

  <span className="w-8 text-right">
    {oneStar}
  </span>
</div>

    </div>

  </div>

</div>

{/* Reviews List */}
<div className="mt-16">

 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

  <h2 className="text-3xl font-bold">
    Customer Reviews
  </h2>

  <div className="flex gap-3">

    <input
      type="text"
      placeholder="Search reviews..."
      value={searchReview}
      onChange={(e) => setSearchReview(e.target.value)}
      className="border rounded-lg px-4 py-2"
    />

    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="Newest">Newest</option>
      <option value="Oldest">Oldest</option>
      <option value="Highest">Highest Rating</option>
      <option value="Lowest">Lowest Rating</option>
    </select>

  </div>

</div>

 {filteredReviews.length > 0 ? (

    <div className="space-y-6">

        {filteredReviews.map((review: any) => (

        <div
          key={review.id}
          className="border rounded-xl p-6 shadow-sm"
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

  <h3 className="font-bold text-lg">
    {review.name}
  </h3>

  {review.verifiedPurchase && (
    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
      ✅ Verified Purchase
    </span>
  )}

</div>
              
            

            <span className="text-yellow-500">
              {"⭐".repeat(review.rating)}
            </span>

          </div>

          <p className="text-gray-600 mt-3">
            {review.comment}
          </p>

        </div>

      ))}

    </div>

  ) : (

    <p className="text-gray-500">
      No reviews yet.
    </p>

  )}

</div>
<div className="mt-16 border-t pt-10">
  <h2 className="text-3xl font-bold mb-6">
    Ask a Question
  </h2>

  <div className="space-y-4">

    <input
      type="text"
      placeholder="Your Name"
      value={questionName}
      onChange={(e) => setQuestionName(e.target.value)}
      className="w-full border p-3 rounded-lg"
    />

    <textarea
      placeholder="Ask your question..."
      value={questionText}
      onChange={(e) => setQuestionText(e.target.value)}
      className="w-full border p-3 rounded-lg h-32"
    />

    <button
      onClick={handleSubmitQuestion}
      className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
    >
      Submit Question
    </button>

  </div>
</div>

<div className="mt-12">
  <h2 className="text-3xl font-bold mb-6">
    Questions & Answers
  </h2>

  {questionsLoading ? (
    <p className="text-gray-500">Loading questions...</p>
  ) : questions.length === 0 ? (
    <p className="text-gray-500">
      No questions yet. Be the first to ask!
    </p>
  ) : (
    <div className="space-y-6">

      {questions.map((question: any) => (

        <div
          key={question.id}
          className="border rounded-xl p-6 shadow-sm"
        >

          <p className="font-semibold">
            ❓ {question.question}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Asked by {question.name}
          </p>

          {question.answered ? (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-semibold text-green-700">
                ✅ Admin Answer
              </p>

              <p className="mt-2">
                {question.answer}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-yellow-600">
              ⏳ Waiting for admin reply
            </p>
          )}

        </div>

      ))}

    </div>
  )}
</div>

{/* Related Products */}
<div className="mt-16">
  <h2 className="text-3xl font-bold mb-8">
    Related Products
  </h2>

  {relatedProducts.length > 0 ? (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {relatedProducts.map((item) => (
      <Link
        key={item.id}
        href={`/product/${item.id}`}
        className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
      >
        <Image
          src={item.image}
          alt={item.name}
          width={300}
          height={250}
          className="w-full h-56 object-cover"
        />

        <div className="p-4">
          <h3 className="font-bold">{item.name}</h3>

          <p className="text-pink-600 font-bold mt-2">
            ${item.price}

          </p>
        </div>
      </Link>
    ))}
  </div>
   ) : (
    <p className="text-gray-500">
      No related products found.
    </p>
  )}

</div>
<div className="mt-16">
  <h2 className="text-3xl font-bold mb-8">
    Recently Viewed
  </h2>

  {recentlyViewed.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {recentlyViewed
        .filter((item: any) => item.id !== product.id)
        .map((item: any) => (

          <Link
            key={item.id}
            href={`/product/${item.id}`}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >

            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={250}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold">
                {item.name}
              </h3>

              <p className="text-pink-600 font-bold mt-2">
                ${item.price}
              </p>

            </div>

          </Link>

      ))}

    </div>
  ) : (
    <p className="text-gray-500">
      No recently viewed products.
    </p>
  )}
</div>
  
            </div>

          </div>

        </div>

      </div>
        
    
  );
}