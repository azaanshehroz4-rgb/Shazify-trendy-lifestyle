"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminReviewsPage() {
     const { user, loading } = useAuth();
const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const ADMIN_EMAIL = "azaanshehroz4@gmail.com";
useEffect(() => {
  if (loading) return;

  if (!user) {
    router.push("/login?redirect=/admin/reviews");
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    router.push("/");
  }
}, [user, loading, router]);


 
  const fetchReviews = async () => {
    try {
      const snapshot = await getDocs(collection(db, "reviews"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(data);
    } catch (error) {
      console.error(error);
    }

    setReviewsLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;

    try {
      await deleteDoc(doc(db, "reviews", id));

      setReviews(reviews.filter((review) => review.id !== id));
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

      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        Manage Reviews
      </h1>

        {reviewsLoading ? (
          <p>Loading Reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No Reviews Found.</p>
        ) : (
          <div className="space-y-6">

            {reviews.map((review: any) => (

              <div
                key={review.id}
                className="border rounded-xl p-6 shadow"
              >

                <h2 className="font-bold text-xl">
                  {review.name}
                </h2>

                <p className="text-yellow-500 mt-2">
                  {"⭐".repeat(review.rating)}
                </p>

                <p className="text-gray-600 mt-3">
                  {review.comment}
                </p>

                <button
                  onClick={() => deleteReview(review.id)}
                  className="mt-5 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete Review
                </button>

              </div>

            ))}

          </div>
        )}
       </div>
      </div>
    </div>
      <Footer />
    </>
  );
}