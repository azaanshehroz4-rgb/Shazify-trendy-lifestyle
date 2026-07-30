"use client";

import { createContext, useContext, useEffect, useState } from "react";

const RecentlyViewedContext = createContext<any>(null);

export function RecentlyViewedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("recentlyViewed");

    if (data) {
      setRecentlyViewed(JSON.parse(data));
    }
  }, []);

  const addRecentlyViewed = (product: any) => {
    const updated = [
      product,
      ...recentlyViewed.filter((item) => item.id !== product.id),
    ].slice(0, 6);

    setRecentlyViewed(updated);

    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(updated)
    );
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext);
}