"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "🏠",
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: "📦",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: "📋",
    },
    {
      name: "Reviews",
      href: "/admin/reviews",
      icon: "⭐",
    },
      {
      name: "Questions",
      href: "/admin/questions",
      icon: "❓",
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-xl rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-8">
        Admin Panel
      </h2>

      <div className="space-y-3">

        {menu.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 p-4 rounded-xl transition
            ${
              pathname === item.href ||
              (pathname.startsWith(`${item.href}/`) && item.href !== "/admin")
                ? "bg-pink-600 text-white"
                : "hover:bg-pink-100"
            }`}
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-semibold">
              {item.name}
            </span>

          </Link>

        ))}

      </div>

    </aside>
  );
}