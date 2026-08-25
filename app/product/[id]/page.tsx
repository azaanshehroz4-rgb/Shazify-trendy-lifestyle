import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProductDetails from "./ProductDetailsClient";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.shazify.com";
function getImageUrl(image: string) {
  if (!image) return `${SITE_URL}/images/default-product.jpg`;

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      title: "Product Not Found | Shazify",
      description: "The requested product could not be found on Shazify.",
    };
  }

  const product = docSnap.data();

  const title = product.name;

  const description =
    product.pinterestDescription ||
    product.description ||
    `Discover ${product.name} on Shazify. Explore trendy fashion, beauty, electronics and lifestyle products.`;

  const imageUrl = getImageUrl(product.image);

  return {
    title,
    description,

    keywords: [
      product.name,
      product.category,
      "Shazify",
      "online shopping",
      "trendy products",
      "lifestyle products",
    ],

    alternates: {
      canonical: `${SITE_URL}/product/${id}`,
    },

    openGraph: {
      title,
      description,
      url: `${SITE_URL}/product/${id}`,
      siteName: "Shazify",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const docRef = doc(db, "products", id);

  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div>Product not found.</div>;
  }

  const product: any  = {
    id: docSnap.id,
    ...docSnap.data(),
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,

    description:
      product.pinterestDescription ||
      product.description ||
      `Discover ${product.name} on Shazify.`,

    image: product.image
      ? [
          product.image.startsWith("http")
            ? product.image
            : `${SITE_URL}${
                product.image.startsWith("/")
                  ? product.image
                  : `/${product.image}`
              }`,
        ]
      : [],

    brand: {
      "@type": "Brand",
      name: "Shazify",
    },

    sku: product.id,

    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${id}`,
      priceCurrency: "USD",
      price: String(product.price),
      availability: "https://schema.org/InStock",

      seller: {
        "@type": "Organization",
        name: "Shazify",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />

      <ProductDetails product={product} />
    </>
  );
}