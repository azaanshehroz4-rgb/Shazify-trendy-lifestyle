"use client";

import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useSearch } from "../context/SearchContext";
import Link from "next/link";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { search, setSearch } = useSearch();
  const { user, logout } = useAuth();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
    closeMenu();
  };

  return (
    <>
      {/* TOP HEADER */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

          {/* Desktop + Mobile Top Row */}
          <div className="flex items-center justify-between gap-3">

            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              className="text-2xl sm:text-3xl font-extrabold text-pink-600 shrink-0"
            >
              SHAZIFY
            </Link>

            {/* Search - Desktop */}
            <div className="hidden md:block flex-1 max-w-md mx-4">
              <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Desktop Cart + Wishlist */}
            <div className="hidden md:flex items-center gap-3 shrink-0">

              <Link
                href="/cart"
                className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition whitespace-nowrap"
              >
                Cart ({totalItems})
              </Link>

              <Link
                href="/wishlist"
                className="bg-white border border-pink-600 text-pink-600 px-5 py-3 rounded-lg hover:bg-pink-600 hover:text-white transition flex items-center gap-2 whitespace-nowrap"
              >
                <Heart size={20} />
                ({wishlist.length})
              </Link>

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-pink-600 p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="bg-pink-600 text-white">

        {/* Desktop Navigation */}
        <div className="hidden md:flex max-w-7xl mx-auto items-center gap-8 px-6 py-4 font-semibold">

          <Link href="/" className="hover:text-yellow-300 transition">
            Home
          </Link>

          <Link
            href="/categories"
            className="hover:text-yellow-300 transition"
          >
            Categories
          </Link>

          <Link
            href="/deals"
            className="hover:text-yellow-300 transition"
          >
            Deals
          </Link>

          <Link
            href="/about"
            className="hover:text-yellow-300 transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="hover:text-yellow-300 transition"
          >
            Contact
          </Link>

          {user ? (
            <>
              <Link
                href="/account"
                className="hover:text-yellow-300 transition"
              >
                My Account
              </Link>

              {user.email === "azaanshehroz4@gmail.com" && (
                <Link
                  href="/admin"
                  className="hover:text-yellow-300 transition"
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="hover:text-yellow-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-yellow-300 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="hover:text-yellow-300 transition"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden px-5 pb-5 pt-3 space-y-3 font-semibold">

            <Link
              href="/"
              onClick={closeMenu}
              className="block py-2 hover:text-yellow-300"
            >
              Home
            </Link>

            <Link
              href="/categories"
              onClick={closeMenu}
              className="block py-2 hover:text-yellow-300"
            >
              Categories
            </Link>

            <Link
              href="/deals"
              onClick={closeMenu}
              className="block py-2 hover:text-yellow-300"
            >
              Deals
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="block py-2 hover:text-yellow-300"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="block py-2 hover:text-yellow-300"
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={closeMenu}
                  className="block py-2 hover:text-yellow-300"
                >
                  My Account
                </Link>

                {user.email === "azaanshehroz4@gmail.com" && (
                  <Link
                    href="/admin"
                    onClick={closeMenu}
                    className="block py-2 hover:text-yellow-300"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="block py-2 hover:text-yellow-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block py-2 hover:text-yellow-300"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="block py-2 hover:text-yellow-300"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Cart + Wishlist */}
            <div className="flex gap-3 pt-3 border-t border-pink-400">

              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex-1 text-center bg-white text-pink-600 px-4 py-3 rounded-lg"
              >
                🛒 Cart ({totalItems})
              </Link>

              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex-1 text-center bg-white text-pink-600 px-4 py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <Heart size={18} />
                ({wishlist.length})
              </Link>

            </div>

          </div>
        )}

      </nav>
    </>
  );
}