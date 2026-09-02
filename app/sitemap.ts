import type { MetadataRoute } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

const SITE_URL = "https://www.shazify.shop";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/refund`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const snapshot = await getDocs(collection(db, "products"));

  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    category: doc.data().category,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const uniqueCategories = [
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
        .map((category) => category.toLowerCase())
    ),
  ];

  const categoryPages: MetadataRoute.Sitemap = uniqueCategories.map(
    (category) => ({
      url: `${SITE_URL}/category/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [
    ...staticPages,
    ...productPages,
    ...categoryPages,
  ];
}