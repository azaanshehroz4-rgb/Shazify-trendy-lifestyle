"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminSidebar from "../../components/AdminSidebar";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

export default function AdminQuestionsPage() {
    const { user, loading } = useAuth();

const router = useRouter();
const [questions, setQuestions] = useState<any[]>([]);
const [questionsLoading, setQuestionsLoading] = useState(true);
const [answers, setAnswers] = useState<{ [key: string]: string }>({});

const ADMIN_EMAIL = "azaanshehroz4@gmail.com";
const fetchQuestions = async () => {
  try {
    const snapshot = await getDocs(collection(db, "questions"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setQuestions(data);
  } catch (error) {
    console.error(error);
  }

  setQuestionsLoading(false);
};

useEffect(() => {
  if (loading) return;

  if (!user) {
    router.push("/login?redirect=/admin/questions");
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    router.push("/");
  }
}, [user, loading, router]);
useEffect(() => {
  if (loading) return;

  if (!user) return;

  if (user.email !== ADMIN_EMAIL) return;

  fetchQuestions();
}, [loading, user]);
const saveAnswer = async (
  questionId: string,
  answer: string
) => {
  if (!answer.trim()) {
    alert("Please enter an answer.");
    return;
  }

  try {
    await updateDoc(doc(db, "questions", questionId), {
      answer,
      answered: true,
    });

    alert("Answer saved successfully!");

    fetchQuestions();
  } catch (error) {
    console.error(error);
    alert("Failed to save answer.");
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
              Manage Questions
            </h1>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              {questionsLoading ? (
  <p className="text-gray-500">
    Loading Questions...
  </p>
) : questions.length === 0 ? (
  <p className="text-gray-500">
    No Questions Found.
  </p>
) : (
  <div className="space-y-6">

    {questions.map((question: any) => (

      <div
        key={question.id}
        className="border rounded-xl p-6 shadow"
      >
        <h2 className="font-bold text-xl">
          {question.name}
        </h2>

        <p className="text-gray-600 mt-3">
          {question.question}
        </p>

        <p className="text-sm text-gray-500 mt-3">
          Product ID: {question.productId}
        </p>

        <p className="mt-3">
          Status:{" "}
          {question.answered ? (
            <span className="text-green-600 font-semibold">
              Answered
            </span>
          ) : (
            <span className="text-yellow-600 font-semibold">
              Pending
            </span>
          )}
        </p>
        <div className="mt-6">
 <textarea
  placeholder="Write your answer..."
  value={answers[question.id] ?? question.answer ?? ""}
  onChange={(e) =>
    setAnswers((prev) => ({
      ...prev,
      [question.id]: e.target.value,
    }))
  }
  className="w-full border rounded-lg p-3 h-28"
/>

 <button
  onClick={() =>
    saveAnswer(
      question.id,
      answers[question.id] ?? question.answer ?? ""
    )
  }
  className="mt-4 bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700"
>
  Save Answer
</button>
</div>

      </div>

    ))}

  </div>
)}
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}