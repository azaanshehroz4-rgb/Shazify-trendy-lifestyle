import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shazify.shop"),

  title: {
    default: "Shazify Trendy Lifestyle",
    template: "%s | Shazify",
  },

  description:
    "Discover trendy fashion, beauty, electronics, home and lifestyle products at Shazify.",

  keywords: [
    "Shazify",
    "trendy products",
    "fashion",
    "beauty",
    "electronics",
    "home decor",
    "lifestyle products",
    "online shopping",
    "Pinterest shopping",
  ],

  openGraph: {
    title: "Shazify Trendy Lifestyle",
    description:
      "Discover trendy fashion, beauty, electronics, home and lifestyle products at Shazify.",
    type: "website",
    locale: "en_US",
    siteName: "Shazify",
    images: [
      {
        url: "/images/shazify-og.jpg",
        width: 1200,
        height: 630,
        alt: "Shazify Trendy Lifestyle",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Shazify Trendy Lifestyle",
    description:
      "Discover trendy fashion, beauty, electronics, home and lifestyle products at Shazify.",
    images: ["/images/shazify-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <SearchProvider>
            <AuthProvider>
              <WishlistProvider>
                <RecentlyViewedProvider>
                  {children}
                </RecentlyViewedProvider>
              </WishlistProvider>
            </AuthProvider>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}