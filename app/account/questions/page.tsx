"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function MyQuestionsPage() {
    const { user } = useAuth();

const [questions, setQuestions] = useState<any[]>([]);

useEffect(() => {

  const fetchQuestions = async () => {

    if (!user) return;

    const snapshot = await getDocs(
      collection(db, "questions")
    );

    const data = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (question: any) =>
          question.userId === user.uid
      );

    setQuestions(data);

  };

  fetchQuestions();

}, [user]);
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          My Questions
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
        {questions.length === 0 ? (
  <p className="text-gray-500">
    You haven't asked any questions yet.
  </p>
) : (
  <div className="space-y-6">

    {questions.map((question: any) => (

      <div
        key={question.id}
        className="border rounded-xl p-6 shadow-sm"
      >

        <p className="font-semibold text-lg">
          ❓ {question.question}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Product ID: {question.productId}
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
          <p className="mt-4 text-yellow-600 font-semibold">
            ⏳ Waiting for admin answer
          </p>
        )}

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