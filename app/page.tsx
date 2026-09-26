import type { Metadata } from "next";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Shazify | Trendy Fashion, Beauty & Lifestyle Products",
  description:
    "Discover trendy fashion, beauty, electronics, home and lifestyle products at Shazify. Explore popular products, deals and stylish finds.",
  keywords: [
    "Shazify",
    "trendy products",
    "fashion products",
    "beauty products",
    "lifestyle products",
    "electronics",
    "home products",
    "online shopping",
  ],
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Footer />
    </main>
  );
}