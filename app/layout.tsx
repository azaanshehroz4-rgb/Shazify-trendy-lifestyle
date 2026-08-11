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
  metadataBase: new URL("https://www.shazify.com"),

  title: {
    default: "Shazify Trendy Lifestyle",
    template: "%s | Shazify",
  },

  description:
    "Discover trending lifestyle products, fashion, gadgets and exclusive AliExpress deals on Shazify.",

  keywords: [
    "Shazify",
    "AliExpress",
    "Affiliate",
    "Lifestyle",
    "Fashion",
    "Electronics",
    "Home Decor",
    "Pinterest",
    "Online Shopping",
  ],

  openGraph: {
    title: "Shazify Trendy Lifestyle",
    description:
      "Discover trending lifestyle products with exclusive AliExpress deals.",
    type: "website",
    locale: "en_US",
    siteName: "Shazify",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shazify Trendy Lifestyle",
    description:
      "Discover trending lifestyle products with exclusive AliExpress deals.",
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
