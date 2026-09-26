import type { MetadataRoute } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

const SITE_URL = "https://www.shazify.shop";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/refund`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/affiliate-disclosure`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const snapshot = await getDocs(collection(db, "products"));

  const products = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      category: data.category,
      createdAt: data.createdAt,
    };
  });

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.id}`,
    lastModified: product.createdAt?.toDate?.() ?? undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const uniqueCategories = [
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
        .map((category) => String(category).trim().toLowerCase())
    ),
  ];

  const categoryPages: MetadataRoute.Sitemap = uniqueCategories.map(
    (category) => ({
      url: `${SITE_URL}/category/${category}`,
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