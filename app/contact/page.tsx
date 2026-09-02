"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [sending, setSending] = useState(false);
const [success, setSuccess] = useState("");
const [error, setError] = useState("");
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setSending(true);
  setSuccess("");
  setError("");

  try {
    const response = await fetch("/api/send-contact-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send message.");
    }

    setSuccess("Your message has been sent successfully! 💙");

    setName("");
    setEmail("");
    setMessage("");

  } catch (error) {
    console.error("Contact form error:", error);

    setError(
      "Sorry, your message could not be sent. Please try again."
    );

  } finally {
    setSending(false);
  }
};
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-center mb-10">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-2xl font-bold mb-6">
              Get In Touch
            </h2>

            <p className="mb-4">
              📧  Email: azaanshehroz4@gmail.com
            </p>

            <p className="mb-4">
              📞 Phone: +92 3394454531
            </p>

            <p>
              📍 Address: Lahore, Pakistan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
               type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded-lg p-3"
            />

            <input
               type="email"
               placeholder="Your Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
               className="w-full border rounded-lg p-3"
             />

            <textarea
              placeholder="Your Message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
             />

            <button
              type="submit"
              disabled={sending}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
            >
               {sending ? "Sending..." : "Send Message"}
            </button>

            {success && (
                <p className="text-green-600 font-semibold">
                    {success}
             </p>
            )}

             {error && (
                 <p className="text-red-600 font-semibold">
                   {error}
              </p>
            )}
          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}