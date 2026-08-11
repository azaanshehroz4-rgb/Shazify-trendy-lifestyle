"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import Link from "next/link";
export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(
  user?.displayName || ""
);
  const handleUpdateProfile = async () => {
  
  if (!user) return;

  try {
   await updateProfile(user, {
  displayName,
});

await user.reload();

router.refresh();
      
    

    alert("Profile Updated Successfully!");
  } catch (error) {
    alert("Something went wrong.");
  }
};
  useEffect(() => {
  if (!user) {
    router.push("/login");
  }
}, [user, router]);
if (!user) {
  return null;
}
    
    
  

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-pink-600 mb-8">
          My Account
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold">
            Welcome 👋
            <div className="mt-8 space-y-3">

  <div className="border rounded-xl p-4">
    <h3 className="font-bold text-gray-700">
      Full Name
    </h3>

    <p className="text-gray-500">
  {user.displayName || "No Name"}
</p>
    
    
  </div>

  <div className="border rounded-xl p-4">
    <h3 className="font-bold text-gray-700">
      Email
    </h3>

    <p className="text-gray-500">
      {user.email}
    </p>
  </div>

</div>
          </h2>
     <div className="mt-6">
  <input
    type="text"
    value={displayName}
    onChange={(e) => setDisplayName(e.target.value)}
    placeholder="Update your name"
    className="w-full border rounded-lg p-3"
  />

  <button
    onClick={handleUpdateProfile}
    className="mt-4 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
  >
    Save Changes
  </button>
</div>
          <p className="text-gray-600 mt-3">
            {user.email}
          </p>

         <div className="grid md:grid-cols-2 gap-6 mt-10">
<Link href="/wishlist">
  <div className="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
    ❤️
    <h3 className="text-xl font-bold mt-4">
      My Wishlist
    </h3>

    <p className="text-gray-500 mt-2">
      View your saved products.
    </p>
  </div>
</Link>

 <Link href="/account/orders">
  <div className="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
    📦
    <h3 className="text-xl font-bold mt-4">
      My Orders
    </h3>

    <p className="text-gray-500 mt-2">
      Track all your orders.
    </p>
  </div>
</Link>

<Link href="/account/reviews">
  <div className="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
    ⭐
    <h3 className="text-xl font-bold mt-4">
      My Reviews
    </h3>

    <p className="text-gray-500 mt-2">
      View all your reviews.
    </p>
  </div>
</Link>

<Link href="/account/questions">
  <div className="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
    ❓
    <h3 className="text-xl font-bold mt-4">
      My Questions
    </h3>

    <p className="text-gray-500 mt-2">
      View your questions and answers.
    </p>
  </div>
</Link>

 <Link href="/account/settings">
  <div className="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
    ⚙️

    <h3 className="text-xl font-bold mt-4">
      Account Settings
    </h3>

    <p className="text-gray-500 mt-2">
      Manage your account.
    </p>
  </div>
</Link>

  <button
    onClick={async () => {
      await logout();
      router.push("/");
    }}
    className="bg-red-500 text-white rounded-xl p-6 hover:bg-red-600 transition"
  >
    Logout
  </button>

</div>

        </div>

      </div>

      <Footer />
    </>
  );
}