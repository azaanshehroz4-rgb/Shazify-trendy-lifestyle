"use client";

import Link from "next/link";
import {
  Heart,
  ShoppingCart,
} from "lucide-react";

import {
  FaPinterest,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6 py-12">

        {/* Logo */}
        <div>
          <Link href="/" className="inline-block">
            <h2 className="text-3xl font-bold text-pink-500">
              SHAZIFY
            </h2>
          </Link>

          <p className="text-gray-400 mt-4">
            Premium fashion, beauty and lifestyle products.
          </p>

          {/* Social Media */}
          <div className="flex gap-4 mt-6">

            {/* Pinterest */}
            <a
              href="https://www.pinterest.com/shazifyofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition"
              aria-label="Pinterest"
            >
              <FaPinterest size={22} />
            </a>

            {/* Instagram */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <FaInstagram size={22} />
            </a>

            {/* TikTok */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition"
              aria-label="TikTok"
            >
              <FaTiktok size={22} />
            </a>

            {/* Facebook */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition"
              aria-label="Facebook"
            >
              <FaFacebook size={22} />
            </a>

            {/* YouTube */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition"
              aria-label="YouTube"
            >
              <FaYoutube size={22} />
            </a>

          </div>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">

            <li>
              <Link
                href="/"
                className="hover:text-pink-500 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                 href="/"
                 className="hover:text-pink-500 transition"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/categories"
                className="hover:text-pink-500 transition"
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                href="/deals"
                className="hover:text-pink-500 transition"
              >
                Deals
              </Link>
            </li>

            <li>
            <Link href="/privacy" className="hover:text-pink-500 transition">
               Privacy Policy
            </Link>
            </li>

            <li>
            <Link href="/terms" className="hover:text-pink-500 transition">
               Terms & Conditions
            </Link>
            </li>

            <li>
            <Link href="/refund" className="hover:text-pink-500 transition">
               Refund & Return Policy
            </Link>
            </li>

            <li>
          <Link
            href="/affiliate-disclosure"
            className="hover:text-pink-500 transition"
          >
               Affiliate Disclosure
          </Link>
          </li>

          </ul>
        </div>


        {/* Categories */}
        <div>
          <h3 className="font-bold text-xl mb-4">
            Categories
          </h3>

          <ul className="space-y-2 text-gray-400">

            <li>
              <Link
                href="/category/fashion"
                className="hover:text-pink-500 transition"
              >
                Fashion
              </Link>
            </li>

            <li>
              <Link
                href="/category/electronics"
                className="hover:text-pink-500 transition"
              >
                Electronics
              </Link>
            </li>

            <li>
              <Link
                href="/category/beauty"
                className="hover:text-pink-500 transition"
              >
                Beauty
              </Link>
            </li>

            <li>
              <Link
                href="/category/home"
                className="hover:text-pink-500 transition"
              >
                Home
              </Link>
            </li>

          </ul>
        </div>


        {/* Contact */}
        <div>
          <h3 className="font-bold text-xl mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            Email:
          </p>

          <a
             href="mailto: azaanshehroz4@gmail.com"
            className="text-pink-500 hover:text-pink-400 transition"
          >
            azaanshehroz4@gmail.com
          </a>

          <p className="text-gray-400 mt-4">
            Pakistan
          </p>

          <Link
            href="/contact"
            className="inline-block mt-4 text-pink-500 hover:text-pink-400 transition"
          >
            Contact Us →
          </Link>
        </div>


        {/* Wishlist + Cart */}
        <div className="md:col-span-4 flex gap-5 mt-2">

          <Link
            href="/wishlist"
            className="text-gray-400 hover:text-pink-500 transition"
            aria-label="Wishlist"
          >
            <Heart size={22} />
          </Link>

          <Link
            href="/cart"
            className="text-gray-400 hover:text-pink-500 transition"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={22} />
          </Link>

        </div>

      </div>


      {/* Copyright */}
      <div className="border-t border-gray-700 text-center py-6 text-gray-500">
        © 2026 SHAZIFY. All Rights Reserved.
      </div>

    </footer>
  );
}