"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function HeroSettings() {
  const [smallTitle, setSmallTitle] = useState("NEW COLLECTION 2026");
  const [headingLine1, setHeadingLine1] = useState("Discover Your");
  const [headingLine2, setHeadingLine2] = useState("Perfect Style");
  const [description, setDescription] = useState(
    "Shop premium fashion, beauty and lifestyle products."
  );

  const [shopNowText, setShopNowText] = useState("Shop Now");
  const [shopNowLink, setShopNowLink] = useState("/deals");

  const [exploreText, setExploreText] = useState("Explore");
  const [exploreLink, setExploreLink] = useState("/categories");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadHeroSettings = async () => {
      try {
        const heroRef = doc(db, "settings", "hero");
        const heroSnap = await getDoc(heroRef);

        if (heroSnap.exists()) {
          const data = heroSnap.data();

          setSmallTitle(data.smallTitle || "NEW COLLECTION 2026");
          setHeadingLine1(data.headingLine1 || "Discover Your");
          setHeadingLine2(data.headingLine2 || "Perfect Style");
          setDescription(
            data.description ||
              "Shop premium fashion, beauty and lifestyle products."
          );

          setShopNowText(data.shopNowText || "Shop Now");
          setShopNowLink(data.shopNowLink || "/deals");

          setExploreText(data.exploreText || "Explore");
          setExploreLink(data.exploreLink || "/categories");
        }
      } catch (error) {
        console.error("Error loading hero settings:", error);
      }
    };

    loadHeroSettings();
  }, []);

  const saveHeroSettings = async () => {
    setSaving(true);
    setMessage("");

    try {
      await setDoc(doc(db, "settings", "hero"), {
        smallTitle,
        headingLine1,
        headingLine2,
        description,
        shopNowText,
        shopNowLink,
        exploreText,
        exploreLink,
      });

      setMessage("Hero banner settings saved successfully!");
    } catch (error) {
      console.error("Error saving hero settings:", error);
      setMessage("Failed to save hero settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        Hero Banner Settings
      </h2>

      <div className="space-y-5">

        {/* Small Title */}
        <div>
          <label className="block font-semibold mb-2">
            Small Title
          </label>

          <input
            type="text"
            value={smallTitle}
            onChange={(e) => setSmallTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="NEW COLLECTION 2026"
          />
        </div>

        {/* Heading Line 1 */}
        <div>
          <label className="block font-semibold mb-2">
            Heading Line 1
          </label>

          <input
            type="text"
            value={headingLine1}
            onChange={(e) => setHeadingLine1(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Discover Your"
          />
        </div>

        {/* Heading Line 2 */}
        <div>
          <label className="block font-semibold mb-2">
            Heading Line 2
          </label>

          <input
            type="text"
            value={headingLine2}
            onChange={(e) => setHeadingLine2(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Perfect Style"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Shop premium fashion, beauty and lifestyle products."
          />
        </div>

        {/* Shop Now */}
        <div className="border-t pt-5">
          <h3 className="text-lg font-bold mb-4">
            Shop Now Button
          </h3>

          <div className="space-y-4">

            <input
              type="text"
              value={shopNowText}
              onChange={(e) => setShopNowText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Shop Now"
            />

            <input
              type="text"
              value={shopNowLink}
              onChange={(e) => setShopNowLink(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="/deals"
            />

          </div>
        </div>

        {/* Explore */}
        <div className="border-t pt-5">
          <h3 className="text-lg font-bold mb-4">
            Explore Button
          </h3>

          <div className="space-y-4">

            <input
              type="text"
              value={exploreText}
              onChange={(e) => setExploreText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Explore"
            />

            <input
              type="text"
              value={exploreLink}
              onChange={(e) => setExploreLink(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="/categories"
            />

          </div>
        </div>

        {/* Save Button */}
        <div className="border-t pt-5">

          <button
            onClick={saveHeroSettings}
            disabled={saving}
            className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Hero Settings"}
          </button>

        </div>

        {/* Message */}
        {message && (
          <p
            className={`font-semibold ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

      </div>
    </div>
  );
}