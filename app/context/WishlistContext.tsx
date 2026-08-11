"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../lib/firebase";
import { useAuth } from "./AuthContext";

export interface WishlistItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  
  const { user, loading } = useAuth();

useEffect(() => {
  console.log("Auth Loading:", loading);
  console.log("Auth User:", user);
}, [loading, user]);
  console.log("Current User:", user);
  useEffect(() => {
  const loadWishlist = async () => {
    if (!user) {
      setWishlist([]);
      return;
    }

    try {
      const q = query(
        collection(db, "wishlists"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        ...(doc.data() as WishlistItem),
      }));

      setWishlist(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadWishlist();
}, [user]);
 const addToWishlist = async (product: WishlistItem) => {
  if (!user) {
    alert("Please login to use Wishlist.");
    return;
  }

  if (wishlist.find((item) => item.id === product.id)) {
    return;
  }

  try {
    await addDoc(collection(db, "wishlists"), {
      userId: user.uid,
      ...product,
    });

    setWishlist((prev) => [...prev, product]);
  } catch (error) {
    console.error(error);
    alert("Failed to add to wishlist.");
  }
};

const removeFromWishlist = async (id: string) => {
  if (!user) return;

  try {
    const q = query(
      collection(db, "wishlists"),
      where("userId", "==", user.uid),
      where("id", "==", id)
    );

    const snapshot = await getDocs(q);

    for (const document of snapshot.docs) {
      await deleteDoc(document.ref);
    }

    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};
const isInWishlist = (id: string) => {
  return wishlist.some((item) => item.id === id);
};

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}