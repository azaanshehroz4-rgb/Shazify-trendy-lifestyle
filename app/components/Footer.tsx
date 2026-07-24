import {
  Heart,
  ShoppingCart,
} from "lucide-react";
export default function Footer() {
  return (
    
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6 py-12">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-pink-500">
            SHAZIFY
          </h2>

          <p className="text-gray-400 mt-4">
            Premium fashion, beauty and lifestyle products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Deals</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold text-xl mb-4">
            Categories
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>Fashion</li>
            <li>Electronics</li>
            <li>Beauty</li>
            <li>Home</li>
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

          <p className="text-pink-500">
            info@shazify.com
          </p>

          <p className="text-gray-400 mt-4">
            Pakistan
          </p>
        </div>
<div className="flex gap-4 mt-6">
  
   <Heart size={22} />
  <ShoppingCart size={22} />
  
</div>
      </div>

      <div className="border-t border-gray-700 text-center py-6 text-gray-500">
        © 2026 SHAZIFY. All Rights Reserved.
      </div>
    </footer>
  );
}