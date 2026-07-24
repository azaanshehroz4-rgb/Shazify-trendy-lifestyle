
"use client";
import { Heart } from "lucide-react";
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
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-5">

          <h1 className="text-3xl font-extrabold text-pink-600">
            SHAZIFY
          </h1>

         <input
           type="text"
           placeholder="Search Products..."
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="w-96 border rounded-lg px-4 py-2 focus:outline-none"
        />
            
            
            
            
            
        
            <Link
             href="/cart"
             className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition"
            >
             Cart ({totalItems})
            </Link>
            <Link
             href="/wishlist"
             className="bg-white border border-pink-600 text-pink-600 px-6 py-3 rounded-lg hover:bg-pink-600 hover:text-white transition flex items-center gap-2"
            >
          <Heart size={20} />
         ({wishlist.length})
     </Link>

        </div>
      </header>

      <nav className="bg-pink-600 text-white">
        <div className="max-w-7xl mx-auto flex gap-10 p-4 font-semibold">
          <Link href="/">
  Home
</Link>
          <Link href="/categories">
          

  Categories
</Link>
          <Link href="/deals">
  Deals
</Link>
          <Link href="/about">
  About
</Link>
          <Link href="/contact">
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

    <button
      onClick={async () => {
        await logout();
        router.push("/");
      }}
      className="hover:text-yellow-300 transition"
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link href="/login">Login</Link>

    <Link href="/signup">Sign Up</Link>
  </>
)
}
        </div>
      </nav>
    </>
  );
}