"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function MyReviewsPage() {
    const { user } = useAuth();

const [reviews, setReviews] = useState<any[]>([]);

useEffect(() => {
  const fetchReviews = async () => {
    if (!user) return;

    const snapshot = await getDocs(collection(db, "reviews"));

    const data = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (review: any) =>
          review.userId === user.uid
      );

    setReviews(data);
  };

  fetchReviews();
}, [user]);
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          My Reviews
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {reviews.length === 0 ? (
  <p className="text-gray-500">
    You haven't submitted any reviews yet.
  </p>
) : (
  <div className="space-y-6">
    {reviews.map((review: any) => (
      <div
        key={review.id}
        className="border rounded-xl p-6 shadow-sm"
      >
        <h2 className="font-bold text-lg">
          {review.productName}
        </h2>

        <p className="mt-2">
          {"⭐".repeat(review.rating)}
        </p>

        <p className="mt-3 text-gray-700">
          {review.comment}
        </p>
      </div>
    ))}
  </div>
)}
        </div>
      </div>

      <Footer />
    </>
  );
}